# Neon 数据源迁移 & 前端精简设计

**日期：** 2026-04-16  
**状态：** 已确认

---

## 背景

报价查询（price_library_matcher + mapping_table_matcher）目前依赖两个本地 Excel 文件：

- `data/万鼎价格库_管材与国标管件_标准格式.xlsx`
- `data/整理产品(2).xlsx`

用户已通过自定义库功能将两个文件导入 Neon，在 `data_libraries` 注册，数据分别存储在 `dl_{id}_{slug}` 表中，列名与 Excel 原始表头一致。目标是让匹配器优先查 Neon，Excel 降级为 fallback，同时精简前端管理界面。

---

## 目标

1. 匹配器查询依赖 Neon 自定义库表（主路径）
2. 自定义库导入严格复刻 Excel 结构（过滤空列）
3. 删去前端"万鼎价格库"和"产品映射表"两个 tab，只保留"自定义库"
4. 保留 Excel 文件作为 fallback（DB 不可用或数据为空时）

---

## 架构

### 数据流

```
用户上传 Excel（自定义库）
       ↓
data_libraries 注册 + dl_{id}_{slug} 表（原始列名）
       ↓
匹配器 load() 入口
  ┌── Step 1: load_from_db()
  │     查 data_libraries WHERE name ILIKE '%万鼎%' OR '%价格库%'
  │     → 找到 table_name + columns JSON
  │     → _find_col() 按关键词定位各业务列
  │     → 全量拉数据到内存 → 成功
  │
  ├── Fallback 1: fetch_all_price_library()
  │     查固定表 price_library（有数据则用）
  │
  └── Fallback 2: 现有 openpyxl Excel 读取（原代码不动）
```

### 库名自动识别规则

| 匹配器 | 查询条件 |
|--------|---------|
| price_library_matcher | `name ILIKE '%万鼎%' OR name ILIKE '%价格库%'` |
| mapping_table_matcher | `name ILIKE '%整理产品%' OR name ILIKE '%映射%'` |

多个命中时取 `id` 最大（最新上传）的库。

---

## 组件变更

### 1. `price_library_matcher.py`

**新增方法 `load_from_db() -> bool`：**

```python
def load_from_db(self) -> bool:
    # 1. 查 data_libraries 找万鼎库（最新）
    # 2. 调 _find_col() 定位 material/description/price_a-d 列
    # 3. 全量拉 dl_{id}_{slug} 表数据
    # 4. 转换为与现有 _row_data 格式一致的列表
    # 5. 成功返回 True；任何异常返回 False
```

**修改 `load()` 入口：**

```python
def load(self, path: str | Path) -> bool:
    if self.load_from_db():
        return True
    # 尝试固定表 price_library
    rows = fetch_all_price_library()
    if rows:
        self._load_from_rows(rows)
        return True
    # Excel fallback（原有逻辑）
    return self._load_from_excel(path)
```

### 2. `mapping_table_matcher.py`

**扩展 `_try_load_mapping_from_db()：`**

```python
def _try_load_mapping_from_db() -> Optional[pd.DataFrame]:
    # 现有：查固定 product_mapping 表
    rows = fetch_all_product_mapping()
    if rows:
        return _build_df_from_fixed_rows(rows)  # 原有逻辑

    # 新增：查自定义库
    lib = _find_library_by_name(['%整理产品%', '%映射%'])
    if lib:
        rows = _fetch_custom_lib_rows(lib)
        return _build_df_from_custom_rows(rows, lib['columns'])

    return None
```

### 3. `inventory/config.py`

新增列名关键词常量（均可通过环境变量覆盖）：

```python
# 价格库列关键词（用于 _find_col）
PRICE_LIB_COL_MATERIAL_KW: str = os.environ.get("PRICE_LIB_COL_MATERIAL_KW", "Material")
PRICE_LIB_COL_DESC_KW: str = os.environ.get("PRICE_LIB_COL_DESC_KW", "Describrition")
PRICE_LIB_COL_PRICE_A_KW: tuple = ("A级别", "报单价格")
PRICE_LIB_COL_PRICE_B_KW: tuple = ("B级别", "报单价格")
PRICE_LIB_COL_PRICE_C_KW: tuple = ("C级别", "报单价格")
PRICE_LIB_COL_PRICE_D_KW: tuple = ("D级别", "报单价格")

# 映射表列关键词
MAPPING_COL_INQUIRY_KW: str = os.environ.get("MAPPING_COL_INQUIRY_KW", "询价货物名称")
MAPPING_COL_SPEC_KW: str = os.environ.get("MAPPING_COL_SPEC_KW", "询价规格型号")
MAPPING_COL_CODE_KW: str = os.environ.get("MAPPING_COL_CODE_KW", "产品编号")
MAPPING_COL_QUOTATION_KW: str = os.environ.get("MAPPING_COL_QUOTATION_KW", "报价名称")
```

### 4. `_find_col()` 工具函数

新增到两个 matcher 共享的位置（或各自模块内）：

```python
def _find_col(columns: list[dict], *keywords: str) -> str | None:
    """从 columns JSON 里找第一个列名（strip+lower）同时含所有 keyword（lower）的列。"""
    for col in columns:
        name = (col.get("name") or "").strip().lower()
        if all(kw.lower() in name for kw in keywords):
            return col["name"]
    return None
```

### 5. `routes_upload.py`（或解析入口）

过滤空列，确保导入一比一复刻：

```python
# 上传解析后，过滤掉列名为 None/空 或全行均为空值的列
columns = [c for c in raw_columns if c.get("name") and c["name"].strip()]
```

### 6. `admin-data.ts`

- 删除 `万鼎价格库` 和 `产品映射表` 两个 `<button class="admin-subtab">` 及对应点击处理
- 删除 `renderPrice()` 和 `renderMapping()` 函数
- 删除 price/mapping 相关 props：`onPriceUpload`, `onPriceQueryInput`, `onPriceQueryApply`, `onPriceRefresh`, `onPriceAddRow`, `onMappingUpload` 等
- 删除对应 host state 字段：`priceItems`, `priceQuery`, `priceLoading`, `priceError`, `priceUploading`, `mappingItems` 等
- 将内容区域直接渲染 `renderCustomLibraries(props)`，无条件判断
- `activeSubTab` 初始值改为 `"library"` 或直接移除该字段

---

## 数据格式转换

**`_row_data` 格式（price_library_matcher 内存表示）：**

```python
{
    "material": str,     # Material 列
    "description": str,  # Describrition 列
    "price_a": float | None,
    "price_b": float | None,
    "price_c": float | None,
    "price_d": float | None,
}
```

从自定义库行转换时，按 `_find_col()` 找到的列名取值，数值列做 `safe_float()` 转换。

**mapping_table_matcher df 格式（不变）：**

列：`search_text`, `code`, `matched_name`, `norm_text`, `spec_tokens`  
从自定义库列映射：`inquiry_name + spec → search_text`，`product_code → code`，`quotation_name → matched_name`

---

## Fallback 行为

| 场景 | 行为 |
|------|------|
| DATABASE_URL 未配置 | 跳过 DB 路径，直接走 Excel |
| DB 可用但无匹配库名 | 跳到固定表，再到 Excel |
| 库找到但列名关键词未命中 | 返回 False，继续 fallback |
| 库找到但表数据为空 | 继续 fallback |
| DB 连接异常 | 捕获异常，继续 fallback，打 warning log |

---

## 不改动的部分

- `price_library` 和 `product_mapping` 固定表结构（保留作 fallback）
- 向量缓存逻辑（仅改数据加载来源，向量计算不变）
- Excel 文件路径配置（`PRICE_LIBRARY_PATH`, `MAPPING_TABLE_PATH`）
- 匹配算法本体（CONTAINS + 分词 + 向量 fallback）
- Admin 自定义库 UI 其他功能（新增行、删除、查询等）

---

## 文件改动清单

| 文件 | 类型 |
|------|------|
| `backend/tools/inventory/services/price_library_matcher.py` | 修改 |
| `backend/tools/inventory/services/mapping_table_matcher.py` | 修改 |
| `backend/tools/inventory/config.py` | 修改（加列名常量） |
| `backend/server/api/routes_upload.py` | 修改（过滤空列） |
| `control-ui/src/ui/views/admin-data.ts` | 修改（删两个 tab） |
| 对应前端 host state / props 类型文件 | 修改 |
