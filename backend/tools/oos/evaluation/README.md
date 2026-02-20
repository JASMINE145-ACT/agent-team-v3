# Golden Recall Evaluation

## 1) Build or update golden template

```bash
python -m evaluation.build_golden_template --dataset-root "D:/Projects/agent-jk/Agent Team/报价单"
```

Then manually fill each `ground_truth` item:

- `row_index` (1-based)
- `product_name`
- `specification`
- `unit`
- `quantity`

## 2) Run recall evaluation

```bash
python -m evaluation.evaluate_recall --manifest evaluation/golden_samples.json
```

Optional report output:

```bash
python -m evaluation.evaluate_recall --manifest evaluation/golden_samples.json --output evaluation/reports/latest.json
```

## 3) Metrics

Current script reports:

- `recall = matched_total / ground_truth_total`
- per-sheet `gt/predicted/matched/recall`
- missing items list (`row_index + fields`)

This is intentionally recall-first. Precision can be added later.
