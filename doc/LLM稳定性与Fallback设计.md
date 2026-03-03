## Agent Team v3 的 LLM 稳定性设计（Retry / Fallback / Timeout / 熔断）

本文档汇总「GLM 主模型 + OpenAI 备用模型」在本项目中的稳定性方案，并与现有结构一一对应，便于后续实现与排错。

---

## 1. 能力清单与现有项目的落点

### 1.1 Retry（重试）

- **落点**：`Agent Team version3/backend/core/llm_client.py` 中的统一 `LLMClient.chat()`。  
- **目标**：只在「可恢复错误」上做有限次数重试，避免业务层（`CoreAgent` / `work_executor`）散落重复 try/except。  
- **建议实现要点**：  
  - 仅对以下错误重试：`APITimeoutError`、`APIConnectionError`、`RateLimitError`。  
  - 默认 `max_retries=2`，退避间隔可按指数或预设序列实现，如 \[0.5s, 1.5s\]，通过 `.env` 配置：  
    - `LLM_MAX_RETRIES=2`  
    - 可选 `LLM_RETRY_BACKOFF=0.5,1.5`（留给后续实现）。  
  - 每次重试写结构化日志，例如：`{"phase": "llm", "model": primary_model, "attempt": n, "error_type": "APITimeoutError"}`，便于排查。

### 1.2 Fallback（备用模型）

- **落点**：同样在 `LLMClient.chat()` 内部收敛逻辑，对业务层只暴露「请求一次，返回结果 + used_model」。  
- **与现状关系**：当前已有配置级 fallback：`Config.FALLBACK_BASE_URL` / `FALLBACK_API_KEY` / `FALLBACK_MODEL`，且 `CoreAgent` 与 `work_executor` 在捕获超时时会手动切到 `gpt-4o-mini`。后续应将这部分逻辑迁移到 `LLMClient.chat()` 内部。  
- **建议实现要点**：  
  - `LLMClient` 在初始化时分别构建 **主模型 client** 与 **fallback client**（若配置存在）。  
  - 在 `chat()` 中：  
    - 仅在「网络/超时/限流」类错误且达到最大重试次数后，才尝试 fallback。  
    - 对 Auth / Key 失效（如 `AuthenticationError`）等错误**不做 fallback**，直接报错，避免掩盖配置问题。  
  - 日志/trace 中统一打一个结构化字段，例如：  
    - `{"type": "fallback", "from": primary_model, "to": fallback_model, "reason": "NetworkTimeout"}`。  
  - 对外返回时附带 `used_model` 字段，前端可据此显示「本次由备用模型完成」。

### 1.3 Timeout（超时）

- **落点**：仍在 `LLMClient` 内部，由其创建 OpenAI/GLM client 时统一指定 timeout。  
- **建议实现要点**：  
  - 在 `get_openai_client()` / `LLMClient.__init__` 中显式传入请求超时时间，例如 20–30 秒，可通过 `.env` 配置：  
    - `LLM_REQUEST_TIMEOUT=25`（秒）。  
  - Chat 与 Work 共用同一套超时设置，避免行为不一致。  
  - 若后续增加 embedding 能力，可单独给出一个轻量配置：`EMBED_REQUEST_TIMEOUT`。

### 1.4 Circuit Breaker（熔断）

- **落点**：`LLMClient` 内部，按 `"(base_url, model)"` 维度维护熔断状态。  
- **状态机**：  
  - **closed**：正常状态。  
  - **open**：在一定时间窗口内连续失败超过阈值后，暂时停止调用该模型。  
  - **half-open**（可选，后续再细化）：短时试探性放行少量请求，成功则关闭熔断，失败则再次打开。  
- **建议第一阶段的简化规则**：  
  - 维护一个字典：`{ (base_url, model): {"fail_count": int, "opened_until": datetime | None} }`。  
  - 每次发生「可恢复错误」时 `fail_count += 1`；在 30 秒内连续 5 次失败则：  
    - 设置 `opened_until = now + 60s`，视为 open 状态。  
  - 在 `opened_until` 之前：  
    - 若有 fallback → 直接跳过主模型，使用 fallback。  
    - 若无 fallback → 立即抛出「当前模型已暂时熔断，请稍后重试」类错误，不再等待长时间 http 超时。  
  - 熔断打开/关闭时写 WARN 日志，例如：  
    - `"[LLM Circuit] glm-4.7@(https://open.bigmodel.cn) opened 60s"`。  
- **意义**：当智谱整段时间不稳定时，系统能**很快全部走 fallback 或直接报错**，避免 Work / Chat 一次次卡在同一个主模型上。

### 1.5 连接预热（warmup）

- **落点**：`Agent Team version3/start.py` 或后端 startup 事件中（如 FastAPI `startup_event`），调用 `LLMClient` 提供的 `warmup()` 方法。  
- **建议实现要点**：  
  - 在服务启动时，对主模型发送一个极小请求：  
    - `messages=[{"role": "user", "content": "ping"}], max_tokens=1`。  
  - 若配置了 fallback，同样对 fallback 模型各发一条 `ping`。  
  - 日志中明确标记：  
    - 成功：`[LLM Warmup] primary glm-4.7 OK / fallback gpt-4o-mini OK`。  
    - 失败：`[LLM Warmup] primary failed: timeout`，方便开局就发现 GLM 是否稳定。

### 1.6 错误分类与结构化日志

- **落点**：`LLMClient.chat()` 统一捕获并映射 OpenAI/GLM SDK 抛出的异常。  
- **建议错误类别映射**：  
  - `APITimeoutError` / `APIConnectionError` → `NetworkTimeout`。  
  - `AuthenticationError` → `AuthError`。  
  - `RateLimitError` → `RateLimit`。  
  - 其他未识别错误 → `UnknownLLMError`。  
- **日志字段**：结合现有 trace 规范，统一记录：  
  - `{"phase": "llm", "model": used_model, "kind": "NetworkTimeout", "retry": n, "fallback_used": true/false}`。  
  - 前端只需展示一条人话提示，例如：「当前线路到智谱不稳定，已自动改用 gpt‑4o-mini」，不必暴露内部细节。

---

## 2. 建议的下一步实施顺序

### 2.1 收敛成一个真正的 `LLMClient`

- **核心目标**：让 `CoreAgent` 与 `work_executor` 不再关心底层网络错误与模型切换，只处理「业务参数 → LLM 调用 → 业务结果」。  
- **建议落地方式**：  
  - 在 `backend/core/llm_client.py` 中实现一个具备以下接口的类：  
    - `LLMClient.chat(messages, tools=None, **kwargs) -> ChatResult`  
    - `LLMClient.embed(texts, **kwargs) -> EmbeddingResult`（仅预留接口，方便未来扩展向量）。  
  - 由 `get_openai_client()` 或新的工厂函数统一构造 `LLMClient` 实例，并在 `CoreAgent` / `work_executor` 中注入使用。  
  - 将当前散落在 `CoreAgent` / `work_executor` 的 fallback 逻辑迁移到 `LLMClient.chat()` 中，业务层只接收：  
    - `result`（模型输出）  
    - `used_model`（本次真正使用的模型名称）  
    - 可选 `meta`（如是否触发 fallback）。  

### 2.2 先实现「超时 + Retry + Fallback」三件套

- **新增 .env 配置**：  
  - `LLM_REQUEST_TIMEOUT=25`  
  - `LLM_MAX_RETRIES=2`  
  - 复用现有：`LLM_MODEL`、`FALLBACK_BASE_URL`、`FALLBACK_MODEL`、`FALLBACK_API_KEY`。  
- **`LLMClient.chat()` 推荐伪代码轮廓**（只描述结构，具体实现按项目代码风格落地）：  

```python
def chat(self, messages, tools=None, **kwargs):
    for attempt in range(self.max_retries + 1):
        try:
            return self._call_primary(messages, tools, **kwargs)
        except (APITimeoutError, APIConnectionError, RateLimitError) as e:
            self._log_retry(e, attempt)

            # 已到最大重试次数，考虑 fallback 或抛错
            if attempt == self.max_retries:
                if self._fallback_available():
                    return self._call_fallback(messages, tools, **kwargs)
                raise

            time.sleep(self._backoff(attempt))
```

- **说明**：  
  - `_call_primary` / `_call_fallback` 负责实际调用各自 client，并在返回结果中记录 `used_model`。  
  - `_log_retry` 写结构化日志（含 error_type / attempt / model / circuit 状态等）。  
  - `_backoff` 可以根据 attempt 返回不同的等待时间（如 0.5, 1.5）。

### 2.3 增加一个简单的 Circuit Breaker

- **第一阶段的简化实现**（不必立刻支持 half-open）：  
  - 在 `LLMClient` 内保存一个状态字典：  
    - `self._circuit[(base_url, model)] = {"fail_count": 0, "opened_until": None, "window_start": datetime}`。  
  - 每次发生「可恢复错误」时：  
    - 若当前时间 - `window_start` > 30s，则重置 `fail_count=1`、`window_start=now`。  
    - 否则 `fail_count += 1`，当 `fail_count >= 5` 时将 `opened_until = now + 60s`。  
  - 在发送请求前：  
    - 若 `opened_until` 仍在未来，则认为该模型处于熔断状态：  
      - 有 fallback 时直接走 fallback。  
      - 无 fallback 时立刻抛出「当前模型已暂时熔断」错误。  
- **后续可选扩展**：再引入 half-open 逻辑（如在 `opened_until` 之后只允许少量请求探测），当前阶段可以先不实现。

### 2.4 等网络环境稳定后再接 LangSmith

- 当前机器访问 LangSmith 不稳定，会影响 LLM 主调用的稳定性，因此短期内可以继续保持「LangSmith 可选且默认关闭」的策略。  
- 等有一台网络稳定的机器/环境后，再把上述稳定层与 LangSmith 集成，让 LangSmith 只负责「观测与分析」，不参与稳定性决策。

---

## 3. 对本项目的意义

### 3.1 对业务体验

- **GLM 正常时**：继续优先使用 GLM，成本低、速度快。  
- **GLM 不稳时**：自动切换到 `gpt‑4o-mini` 等备用模型，Work / Chat 不会中断，最多是速度稍慢或成本略高。  
- 用户侧看到的是「系统稳定响应」，而不是频繁的超时/报错。

### 3.2 对排错与运维

- 通过统一的结构化日志与 trace，可以清晰看到：  
  - 问题出在「网络 / 智谱接口 / OpenAI / Auth / 限流 / 熔断」的哪一层。  
  - 某次调用是否用了 fallback，具体从哪个模型切换到了哪个模型。  
- 熔断机制可以避免在已知主模型有故障的时间段内，仍反复触发长时间排队超时。

### 3.3 对后续扩展

- 当需要接入新模型（如 DeepSeek、Qwen 等）时，只需要在 `LLMClient` 中增加对应的「主模型 + 备用链」配置与构造逻辑，业务层无需修改。  
- 未来若引入「多级 fallback」（如 GLM → OpenAI → 本地模型），也可以在 `LLMClient` 内部按同一套路扩展；对外接口依然是同一个 `chat()` / `embed()`。

