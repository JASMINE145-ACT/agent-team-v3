# quote_spec 为 NULL 问题 - 根本原因与修复

## 问题确认

从 Neon 数据库截图看到，**所有 `quote_spec` 列都是 NULL**。

## 根本原因

找到了！在 `data_service.py:insert_quotation_draft()` 第 929 行：

```python
# 原代码（有 BUG）
quote_spec=str(line.get("quote_spec", ""))[:500] if line.get("quote_spec") else None,
```

**问题**：
- 当 `line.get("quote_spec")` 返回空字符串 `""` 时
- Python 判断 `if ""` 为 False
- 导致 `quote_spec` 被赋值为 `None`
- 数据库里写入 `NULL`

**即使规格提取逻辑正确返回了 "PVC-U排水 dn50"，也会因为这个判断逻辑被丢弃！**

## 已完成的修复

### 1. 修复数据保存逻辑 ✅

`backend/tools/oos/services/data_service.py` 第 929 行：

```python
# 新代码（已修复）
quote_spec=(str(line.get("quote_spec") or "")[:500]) or None,
```

**逻辑**：
- `line.get("quote_spec")` 有值 → 转为字符串并截断 → 保存
- `line.get("quote_spec")` 为 None/空 → 返回空字符串 → `or None` 转为 NULL

### 2. 添加调试日志 ✅

在关键位置添加了日志：

**`canonical_lines.py`**：
- 记录每行的规格提取结果
- 记录 LLM 调用和覆盖情况

**`spec_extract.py`**：
- 记录 LLM 调用状态
- 记录 API 配置
- 记录返回值

### 3. 已启用环境变量 ✅

`.env` 已添加：
```bash
QUOTATION_SPEC_LLM=true
```

### 4. Excel 裁剪已实现 ✅

`quote_tools.py:fill_quotation()` 保存前自动删除 S 列及右侧，解决绿色块问题。

## 验证步骤

### 1. 清空旧数据

```sql
DELETE FROM quotation_draft_lines;
DELETE FROM quotation_drafts;
```

### 2. 重启后端

确保新代码生效。

### 3. 运行报价流程

- 上传询价单或输入文字
- 运行报价匹配
- 保存报价单

### 4. 验证数据库

```sql
SELECT 
    id,
    product_name,
    quote_name,
    specification,
    quote_spec
FROM quotation_draft_lines 
ORDER BY id DESC 
LIMIT 5;
```

**预期结果**：
```
| id | product_name | quote_name                              | specification | quote_spec           |
|----|--------------|------------------------------------------|--------------|--------------------|
| 1  | 直接         | 直通(管箍)PVC-U排水配件白色 dn50          | 50           | PVC-U排水 dn50      |
| 2  | 三通         | 短型顺水三通...DN50 (2") 联塑            | 50           | PVC-U管件 DN50 (2")|
```

### 5. 验证前端显示

在 Work 页面的"待保存报价草稿"表格里：
- "询价规格型号"列显示 "50"
- **"报价产品规"列显示 "PVC-U排水 dn50"** ✅

## 为什么之前没发现

之前的测试可能：
1. 只检查了代码逻辑，没有端到端测试数据库
2. 只看了日志，日志里规格提取是成功的
3. 但数据保存时被这个 `if` 判断丢弃了

**这是一个经典的"数据丢失 bug"**：
- 中间层（规格提取）工作正常
- 但持久化层（数据库保存）有判断错误
- 导致数据在最后一步丢失

## 其他潜在改进

### 1. 统一字段处理逻辑

目前 `insert_quotation_draft()` 对不同字段的处理不一致：

```python
# product_name: 空字符串 → NULL
product_name=str(line.get("product_name", ""))[:500] if line.get("product_name") else None,

# quote_spec: 空字符串 → NULL（已修复）
quote_spec=(str(line.get("quote_spec") or "")[:500]) or None,
```

**建议**：提取一个辅助函数：

```python
def _str_or_none(value: Any, max_len: int = 500) -> str | None:
    """转为字符串并截断，空值返回 None"""
    if not value:
        return None
    s = str(value)[:max_len]
    return s if s else None
```

然后统一使用：
```python
product_name=_str_or_none(line.get("product_name"), 500),
quote_spec=_str_or_none(line.get("quote_spec"), 500),
```

### 2. 添加数据验证

在保存前验证必要字段：

```python
# 在 insert_quotation_draft() 开始处
for i, line in enumerate(lines):
    if not line.get("quote_name"):
        logger.warning(f"Line {i}: missing quote_name")
    if not line.get("specification") and not line.get("quote_spec"):
        logger.warning(f"Line {i}: missing both specification and quote_spec")
```

### 3. 添加单元测试

```python
def test_insert_quotation_draft_preserves_empty_strings():
    """空字符串应该被正确处理（转为 NULL 或保留）"""
    lines = [
        {"product_name": "测试", "quote_spec": "", ...},  # 空字符串
        {"product_name": "测试", "quote_spec": None, ...},  # None
        {"product_name": "测试", "quote_spec": "PVC-U排水 dn50", ...},  # 有值
    ]
    result = ds.insert_quotation_draft("test", lines=lines)
    draft = ds.get_quotation_draft_by_id(result["draft_id"])
    # 验证空字符串和 None 都被存为 NULL
    assert draft["lines"][0]["quote_spec"] is None
    assert draft["lines"][1]["quote_spec"] is None
    assert draft["lines"][2]["quote_spec"] == "PVC-U排水 dn50"
```

## 总结

**问题**：`quote_spec` 为 NULL

**根本原因**：`insert_quotation_draft()` 里的 `if line.get("quote_spec")` 判断错误，空字符串被当作 False

**修复**：改为 `(str(line.get("quote_spec") or "")[:500]) or None`

**状态**：✅ 已修复，等待验证

**验证方式**：清空旧数据 → 重启后端 → 重新运行报价 → 查询数据库

