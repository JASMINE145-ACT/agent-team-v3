# 周报历史数据缺失问题记录

> **日期**: 2026-04-26
> **问题**: 周报 LLM 分析报告提示"暂无上周数据"

---

## 现象

LLM 分析报告输出：
> "本周无上周同期数据，环比分析暂不进行"

---

## 根因分析

### 直接原因

`llm_analyzer.py` 的 `fetch_prev_week_payload()` 依赖 `report_records` 表中 `week_start < 当前周` 的成功记录。

查询验证结果：
```sql
-- 4/13 周报运行时的查询
SELECT COUNT(*) FROM report_records
WHERE task_key = 'sales_weekly_basic'
  AND status = 'success'
  AND week_start < '2026-04-13';  -- 结果: 0

-- 4/20 周报运行时的查询
SELECT COUNT(*) FROM report_records
WHERE task_key = 'sales_weekly_basic'
  AND status = 'success'
  AND week_start < '2026-04-20';  -- 结果: 3 (能找到4/13这批)
```

### 深层原因

1. **周报执行不规律**：没有每周定时运行，导致周报链断裂
2. **早期记录缺少周区间**：4 条历史成功记录 `status='success'` 但 `week_start/week_end = NULL`，无法参与历史比较
3. **首次运行必然缺失**：4/13 是第一个有 `week_start` 的成功报告，之前无任何历史

### 数据现状

| 记录数 | week_start | 说明 |
|--------|------------|------|
| 3 | 非空 | 4/13 之后有周区间 |
| 4 | NULL | 早期成功但无周区间 |

---

## 下周自动修复

4/20 ~ 4/26 周报运行时：
- `week_start < '2026-04-20'` 能找到 4/13 这批 3 条记录
- 环比分析自动恢复，无需人工干预

---

## 待处理

- [ ] 回填 4 条 NULL 记录（可选）：若能从 `started_at` 或 `report_json` 推算周区间，可做修复
- [ ] 建议建立每周定时执行机制，避免周报链再次断裂

---

## 相关文件

- `backend/reports/llm_analyzer.py` — `fetch_prev_week_payload()` 依赖 `week_start` 比较
- `backend/reports/runner.py` — `run_report_task()` 写入 `week_start`/`week_end`
