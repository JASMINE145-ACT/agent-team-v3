# 报价单规格显示为 NULL 问题诊断与修复

## 当前问题

从 Neon 数据库截图看到，`quotation_draft_lines` 表的 **`quote_spec` 列全部为 NULL**。

这说明虽然列已经添加，但**数据写入时规格没有被正确计算和保存**。

## 立即诊断步骤

### 1. 确认环境变量生效

```bash
# 在后端环境检查
echo $QUOTATION_SPEC_LLM
# 应该输出: true

# 或在 Python 中检查
python -c "import os; print(os.getenv('QUOTATION_SPEC_LLM'))"
```

### 2. 测试规则提取逻辑

运行测试脚本：

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
python test_spec_full.py
```

**预期输出**：
```
Row 2:
  quote_name: 直通(管箍)PVC-U排水配件白色 dn50
  specification: 50
  quote_spec: PVC-U排水 dn50
```

**如果 quote_spec 为空**，说明规则提取有问题。

### 3. 检查后端日志

重启后端并运行一次报价流程，查看日志：

```bash
# Windows PowerShell
Get-Content -Path "logs\backend.log" -Tail 100 | Select-String "quote_spec|extract_spec|LLM spec"
```

**关键日志**：
- `Running LLM spec extraction for N lines` - LLM 是否被调用
- `quote_name='...' -> quote_spec='...'` - 规则提取结果
- `LLM updated quote_spec from '...' to '...'` - LLM 覆盖结果

## 可能的问题和修复

### 问题 1：环境变量没有加载

**症状**：日志显示 "QUOTATION_SPEC_LLM is False"

**检查**：
```python
# 在后端启动脚本中
from backend.config import Config
print(f"QUOTATION_SPEC_LLM = {Config.QUOTATION_SPEC_LLM}")
```

**修复**：
1. 确认 `.env` 文件在正确位置（Agent Team version3 根目录）
2. 确认 `.env` 包含 `QUOTATION_SPEC_LLM=true`
3. 重启后端（重新加载环境变量）

### 问题 2：`quote_name` 为空

**症状**：数据库里 `quote_name` 列也是 NULL

**原因**：匹配流程没有返回 `quote_name`

**修复**：
检查 `work_quotation_match` 的返回值：
```python
# 在匹配后添加日志
logger.info(f"Match result: {fill_items_merged[0] if fill_items_merged else 'empty'}")
```

### 问题 3：规则提取返回空字符串

**症状**：日志显示 `quote_spec=''`

**原因**：
- `quote_name` 格式不匹配任何正则模式
- 正则模式有 bug

**修复**：
在 `spec_extract.py:extract_spec_from_quote_name()` 添加调试：
```python
def extract_spec_from_quote_name(quote_name: str) -> str:
    s = (quote_name or "").strip()
    if not s:
        return ""
    parts: list[str] = []
    seen: set[str] = set()
    for pat in _QUOTE_SPEC_PATTERNS:
        for m in pat.finditer(s):
            p = m.group(0).strip()
            if p and p not in seen:
                seen.add(p)
                parts.append(p)
                logger.debug(f"Pattern matched: '{p}' from '{quote_name[:50]}'")
    if parts:
        result = " ".join(parts)
        logger.debug(f"Final spec: '{result}'")
        return result
    fallback = _last_resort_quote_spec(quote_name)
    logger.debug(f"Fallback spec: '{fallback}'")
    return fallback
```

### 问题 4：LLM 提取失败或返回空

**症状**：日志显示 "LLM spec extraction failed"

**原因**：
- API key 无效
- 网络问题
- LLM 返回的 JSON 格式错误

**修复**：
1. 验证 API key：
   ```bash
   curl -X POST https://open.bigmodel.cn/api/paas/v4/chat/completions \
     -H "Authorization: Bearer $ZHIPU_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model":"glm-4-flash","messages":[{"role":"user","content":"test"}]}'
   ```

2. 暂时禁用 LLM，只用规则：
   ```bash
   # .env
   QUOTATION_SPEC_LLM=false
   ```

3. 检查 LLM 响应格式：
   - 在 `spec_extract.py:extract_specs_batch_llm()` 添加日志
   - 查看 `content` 变量的值

### 问题 5：数据保存时字段丢失

**症状**：
- 日志显示 `quote_spec` 有值
- 但数据库里是 NULL

**检查**：
```sql
-- 在 Neon 控制台执行
SELECT 
    id, 
    quote_name, 
    quote_spec,
    created_at 
FROM quotation_draft_lines 
WHERE created_at > '2026-03-17 18:00:00'
ORDER BY id DESC 
LIMIT 5;
```

**修复**：
检查 `data_service.py:insert_quotation_draft()` 第 929 行：
```python
quote_spec=str(line.get("quote_spec", ""))[:500] if line.get("quote_spec") else None,
```

**问题**：如果 `line.get("quote_spec")` 返回空字符串 `""`，会被判断为 False，导致写入 NULL。

**修复**：改为：
```python
quote_spec_val = line.get("quote_spec")
quote_spec = str(quote_spec_val)[:500] if quote_spec_val is not None and quote_spec_val != "" else None,
```

或者更简单：
```python
quote_spec = (str(line.get("quote_spec") or ""))[:500] or None,
```

## 强制修复方案

如果上述诊断都显示正常，但数据库里仍然是 NULL，可以：

### 方案 A：手动更新数据库

```sql
-- 为现有数据生成 quote_spec（从 quote_name 提取）
UPDATE quotation_draft_lines 
SET quote_spec = 
    CASE 
        WHEN quote_name LIKE '%PVC-U排水%' AND quote_name LIKE '%dn%' 
        THEN regexp_replace(quote_name, '.*?(PVC-U排水).*?(dn\d+).*', '\1 \2', 'i')
        WHEN quote_name LIKE '%DN%' 
        THEN regexp_replace(quote_name, '.*(DN\s*\d+\s*\([^)]+\)).*', '\1', 'i')
        ELSE substring(quote_name, position('dn' in lower(quote_name)), 10)
    END
WHERE quote_spec IS NULL AND quote_name IS NOT NULL;
```

### 方案 B：强制规则提取（禁用 LLM）

```bash
# .env
QUOTATION_SPEC_LLM=false
```

这样可以排除 LLM 相关问题，只用规则提取。

### 方案 C：直接在代码里硬编码调试

在 `canonical_lines.py` 第 85 行后：
```python
quote_spec = extract_spec_from_quote_name(quote_name_str) if quote_name_str else ""
# 强制测试
if not quote_spec and quote_name_str:
    quote_spec = "DEBUG: " + quote_name_str[:50]
if not quote_spec:
    quote_spec = spec_inquiry
```

这样如果规格提取完全失败，至少会显示调试信息。

## 推荐执行顺序

1. ✅ 运行 `test_spec_full.py` 验证规则提取逻辑
2. ✅ 清空数据库旧数据：`DELETE FROM quotation_draft_lines; DELETE FROM quotation_drafts;`
3. ✅ 修复 `insert_quotation_draft()` 的空字符串判断（见问题 5）
4. ✅ 重启后端
5. ✅ 重新运行报价流程
6. ✅ 查看后端日志确认规格提取成功
7. ✅ 查询数据库验证 `quote_spec` 有值

## 最可能的原因

根据经验，**最可能的原因是问题 5**：

`insert_quotation_draft()` 里判断 `if line.get("quote_spec")` 时，空字符串 `""` 被视为 False，导致写入 NULL。

**立即修复**：

```python
# data_service.py 第 929 行
# 改为
quote_spec=(line.get("quote_spec") or None),
```

这样：
- `None` → `None` (NULL)
- `""` → `None` (NULL)  
- `"PVC-U排水 dn50"` → `"PVC-U排水 dn50"` ✅

但更好的是保留空字符串：
```python
quote_spec=str(line.get("quote_spec") or "")[:500] or None,
```

## 验证修复

修复后，新数据应该：
```sql
SELECT quote_name, quote_spec FROM quotation_draft_lines ORDER BY id DESC LIMIT 3;

-- 预期结果：
-- | quote_name                                      | quote_spec           |
-- |-------------------------------------------------|----------------------|
-- | 直通(管箍)PVC-U排水配件白色 dn50                 | PVC-U排水 dn50       |
-- | 短型顺水三通...DN50 (2") 联塑                   | PVC-U管件 DN50 (2")  |
```

