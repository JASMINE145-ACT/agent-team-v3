# Handler 与工具 Schema 编写规范（Agent Team version3）

本规范约束 backend 工具的参数校验边界，确保 **参数合法性在进入 handler 前统一完成**，handler 专注业务逻辑。

## 1. 职责划分

- **参数解析/校验（必填/类型/枚举）**：统一由 `backend.core.validation.parse_and_validate_args` 完成。
- **业务约束/外部依赖检查**：由各 handler 内实现（如库存是否允许修改、文件是否存在、权限控制等）。

## 2. Schema 编写规范

工具定义应使用 OpenAI function-calling 兼容 JSON Schema：

- `type` 必须为 `"object"`。
- `properties` 为字段定义，至少包含：
  - `type`: `"string" | "number" | "integer" | "boolean" | "array" | "object" | "null"`
  - `description`: 简要说明字段含义，便于 LLM 正确填参。
- `required` 应声明所有 **必填字段**（如 `file_path`、`keywords`、`code` 等）。
- 对有限集合使用 `enum`（如 `customer_level`、操作类型 `action` 等）。

示例（节选）：

```json
{
  "type": "object",
  "properties": {
    "file_path": { "type": "string", "description": "报价单绝对路径" },
    "customer_level": {
      "type": "string",
      "enum": ["A", "B", "C", "D", "D_low", "E", "出厂价_含税", "出厂价_不含税", "采购不含税"]
    }
  },
  "required": ["file_path"]
}
```

## 3. Handler 编写规范

在开启统一校验后，handler 可以假设：

- 所有 `required` 字段在 `args` 中一定存在；
- 字段类型满足 Schema 要求（例如 `price` 已是 number、`quantity` 已是 integer）；
- 若 Schema 使用了 `enum`，字段值已在合法集合内。

因此 handler 不应再重复做：

- `if "file_path" not in args` 之类的存在性检查；
- `isinstance(args["price"], (int, float))` 之类的基础类型检查；
- 简单枚举校验（例如 `if customer_level not in VALID_LEVELS`）。

handler 只需要实现：

- 业务约束（例如：数量必须大于 0 才允许下单、禁止在锁定状态下再次锁定等）；
- 外部依赖检查（例如：文件是否真实存在、数据库连接是否可用）；
- 业务错误返回（例如：库存不足、报价单结构不符合预期）。

## 4. 错误返回约定

- 参数非法时，由校验层统一返回：

```json
{
  "error": {
    "type": "validation_error",
    "message": "工具参数校验失败",
    "details": {
      "field": "quantity",
      "message": "...",
      "schema": { "...": "..." }
    }
  }
}
```

- 业务错误或外部依赖错误，仍由 handler 自行返回，例如：

```json
{"success": false, "error": "库存不足：需求 10、可用 3"}
```

## 5. 渐进迁移建议

- 新增工具时必须按照本规范编写 Schema 与 handler。
- 现有工具可以分批次逐步删除冗余参数校验逻辑，但不必一次性完成；统一校验层会先作为“前置防线”生效。***
