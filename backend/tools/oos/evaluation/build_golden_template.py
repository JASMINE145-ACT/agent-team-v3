"""
Build a starter golden sample template from real quotation files.
"""
import argparse
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List

import pandas as pd


KEYWORDS = ["无货", "out of stock", "缺货", "无库存", "n/a"]


def _find_candidate_rows(df: pd.DataFrame, max_preview_len: int = 200) -> List[Dict[str, object]]:
    candidates: List[Dict[str, object]] = []
    fill_df = df.fillna("")
    for idx, row in fill_df.iterrows():
        values = [str(v).strip() for v in row.tolist() if str(v).strip()]
        text = " | ".join(values)
        text_lower = text.lower()
        if any(keyword in text_lower for keyword in KEYWORDS):
            candidates.append(
                {
                    "row_index": int(idx + 1),  # 1-based row index for easier manual labeling
                    "row_preview": text[:max_preview_len],
                }
            )
    return candidates


def build_template(dataset_root: Path, max_files: int) -> Dict[str, object]:
    files = sorted(dataset_root.glob("*.xls*"))
    if max_files > 0:
        files = files[:max_files]

    samples = []
    for file_path in files:
        workbook = pd.ExcelFile(file_path)
        sheets = []
        for sheet_name in workbook.sheet_names:
            df = pd.read_excel(file_path, sheet_name=sheet_name, header=None)
            candidates = _find_candidate_rows(df)
            sheets.append(
                {
                    "sheet_name": sheet_name,
                    "candidate_rows": candidates,
                    "ground_truth": [],
                }
            )
        samples.append(
            {
                "file": file_path.name,
                "sheets": sheets,
            }
        )

    return {
        "dataset_root": str(dataset_root),
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "instructions": [
            "Fill each sheet.ground_truth manually.",
            "Each ground_truth item must include row_index, product_name, specification, unit, quantity.",
            "Use row_index as 1-based Excel row number.",
        ],
        "samples": samples,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate golden sample template for recall evaluation.")
    parser.add_argument("--dataset-root", required=True, help="Directory containing quotation Excel files.")
    parser.add_argument(
        "--output",
        default=str(Path(__file__).resolve().parent / "golden_samples.template.json"),
        help="Output JSON path.",
    )
    parser.add_argument("--max-files", type=int, default=0, help="Max number of files to include. 0 means all.")
    args = parser.parse_args()

    dataset_root = Path(args.dataset_root).resolve()
    if not dataset_root.exists() or not dataset_root.is_dir():
        raise ValueError(f"dataset root not found: {dataset_root}")

    data = build_template(dataset_root=dataset_root, max_files=args.max_files)
    output_path = Path(args.output).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"template saved: {output_path}")
    print(f"files included: {len(data.get('samples', []))}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
