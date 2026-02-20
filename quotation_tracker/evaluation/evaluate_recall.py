"""
Evaluate out-of-stock extraction recall against a small golden dataset.
"""
import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple


ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from processor import QuotationProcessor  # noqa: E402


ProductKey = Tuple[str, str, str, float]


def _norm_text(value: object) -> str:
    return re.sub(r"\s+", "", str(value or "")).lower()


def _to_float(value: object) -> float:
    if value is None:
        return 0.0
    text = str(value).strip().replace(",", "")
    if not text:
        return 0.0
    return float(text)


def _build_key(name: object, spec: object, unit: object, qty: object) -> ProductKey:
    return (
        _norm_text(name),
        _norm_text(spec),
        _norm_text(unit),
        round(_to_float(qty), 6),
    )


def _valid_ground_truth_item(item: Dict[str, object]) -> bool:
    required = ("product_name", "specification", "unit", "quantity")
    return all(key in item for key in required)


def _evaluate_sheet(
    processor: QuotationProcessor,
    file_bytes: bytes,
    file_name: str,
    sheet_name: str,
    ground_truth: List[Dict[str, object]],
) -> Dict[str, object]:
    result = processor.process_file(
        file_bytes=file_bytes,
        filename=file_name,
        sheet_name=sheet_name,
        persist_records=False,
    )

    predicted_items = result.records if result.success else []
    predicted_keys = Counter(
        _build_key(p.product_name, p.specification, p.unit, p.quantity) for p in predicted_items
    )

    gt_items = [item for item in ground_truth if _valid_ground_truth_item(item)]
    gt_keys = Counter(
        _build_key(
            item.get("product_name"),
            item.get("specification"),
            item.get("unit"),
            item.get("quantity"),
        )
        for item in gt_items
    )

    matched = sum(min(count, predicted_keys.get(key, 0)) for key, count in gt_keys.items())
    gt_total = sum(gt_keys.values())
    recall = (matched / gt_total) if gt_total else 1.0

    gt_items_by_key: Dict[ProductKey, List[Dict[str, object]]] = defaultdict(list)
    for item in gt_items:
        key = _build_key(
            item.get("product_name"),
            item.get("specification"),
            item.get("unit"),
            item.get("quantity"),
        )
        gt_items_by_key[key].append(item)

    missing_keys = gt_keys - predicted_keys
    missing_items: List[Dict[str, object]] = []
    for key, count in missing_keys.items():
        missing_items.extend(gt_items_by_key.get(key, [])[:count])

    return {
        "sheet_name": sheet_name,
        "success": result.success,
        "error": result.error,
        "debug_per_sheet": result.debug_per_sheet,
        "ground_truth_count": gt_total,
        "predicted_count": len(predicted_items),
        "matched_count": matched,
        "recall": recall,
        "missing_items": missing_items,
    }


def _iter_samples(manifest: Dict[str, object], dataset_root: Path) -> Iterable[Tuple[Path, Dict[str, object]]]:
    samples = manifest.get("samples", [])
    if not isinstance(samples, list):
        return []
    for sample in samples:
        if not isinstance(sample, dict):
            continue
        file_name = sample.get("file")
        if not file_name:
            continue
        yield (dataset_root / file_name, sample)


def evaluate_manifest(manifest_path: Path, dataset_root_override: Optional[Path]) -> Dict[str, object]:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    dataset_root_value = (
        str(dataset_root_override)
        if dataset_root_override is not None
        else str(manifest.get("dataset_root") or "")
    )
    dataset_root = Path(dataset_root_value)
    processor = QuotationProcessor()

    report = {
        "manifest_path": str(manifest_path),
        "dataset_root": str(dataset_root),
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "files": [],
        "summary": {
            "files_total": 0,
            "sheets_total": 0,
            "ground_truth_total": 0,
            "matched_total": 0,
            "predicted_total": 0,
            "sheet_failures": 0,
            "recall": 0.0,
        },
    }

    files_total = 0
    sheets_total = 0
    ground_truth_total = 0
    matched_total = 0
    predicted_total = 0
    sheet_failures = 0

    for file_path, sample in _iter_samples(manifest, dataset_root):
        file_report = {
            "file": file_path.name,
            "exists": file_path.exists(),
            "sheets": [],
        }
        if not file_path.exists():
            report["files"].append(file_report)
            continue

        file_bytes = file_path.read_bytes()
        sheets = sample.get("sheets", [])
        if not isinstance(sheets, list):
            sheets = []

        for sheet in sheets:
            if not isinstance(sheet, dict):
                continue
            sheet_name = str(sheet.get("sheet_name") or "")
            if not sheet_name:
                continue
            ground_truth = sheet.get("ground_truth", [])
            if not isinstance(ground_truth, list):
                ground_truth = []

            sheet_report = _evaluate_sheet(
                processor=processor,
                file_bytes=file_bytes,
                file_name=file_path.name,
                sheet_name=sheet_name,
                ground_truth=ground_truth,
            )
            file_report["sheets"].append(sheet_report)

            sheets_total += 1
            ground_truth_total += int(sheet_report["ground_truth_count"])
            matched_total += int(sheet_report["matched_count"])
            predicted_total += int(sheet_report["predicted_count"])
            if not sheet_report["success"]:
                sheet_failures += 1

        files_total += 1
        report["files"].append(file_report)

    recall = (matched_total / ground_truth_total) if ground_truth_total else 1.0
    report["summary"] = {
        "files_total": files_total,
        "sheets_total": sheets_total,
        "ground_truth_total": ground_truth_total,
        "matched_total": matched_total,
        "predicted_total": predicted_total,
        "sheet_failures": sheet_failures,
        "recall": recall,
    }
    return report


def print_report(report: Dict[str, object]) -> None:
    summary = report["summary"]
    print("=" * 72)
    print("Out-of-stock recall evaluation")
    print("=" * 72)
    print(f"manifest      : {report['manifest_path']}")
    print(f"dataset_root  : {report['dataset_root']}")
    print(f"generated_at  : {report['generated_at']}")
    print("-" * 72)
    print(f"files_total   : {summary['files_total']}")
    print(f"sheets_total  : {summary['sheets_total']}")
    print(f"gt_total      : {summary['ground_truth_total']}")
    print(f"matched_total : {summary['matched_total']}")
    print(f"predicted_total: {summary['predicted_total']}")
    print(f"sheet_failures: {summary['sheet_failures']}")
    print(f"recall        : {summary['recall']:.4f}")
    print("-" * 72)

    for file_report in report["files"]:
        print(f"FILE {file_report['file']}")
        if not file_report["exists"]:
            print("  [missing] file not found")
            continue
        for sheet in file_report["sheets"]:
            print(
                "  SHEET {name} | success={success} | gt={gt} | predicted={pred} | "
                "matched={matched} | recall={recall:.4f}".format(
                    name=sheet["sheet_name"],
                    success=sheet["success"],
                    gt=sheet["ground_truth_count"],
                    pred=sheet["predicted_count"],
                    matched=sheet["matched_count"],
                    recall=sheet["recall"],
                )
            )
            if sheet["missing_items"]:
                print("    missing:")
                for item in sheet["missing_items"]:
                    row_info = f"row={item.get('row_index')}" if "row_index" in item else "row=?"
                    print(
                        "      - {row} | name={name} | spec={spec} | unit={unit} | qty={qty}".format(
                            row=row_info,
                            name=item.get("product_name"),
                            spec=item.get("specification"),
                            unit=item.get("unit"),
                            qty=item.get("quantity"),
                        )
                    )
            if not sheet["success"] and sheet.get("debug_per_sheet"):
                print(f"    debug: {sheet['debug_per_sheet']}")
        print()


def main() -> int:
    parser = argparse.ArgumentParser(description="Evaluate out-of-stock recall against golden samples.")
    parser.add_argument(
        "--manifest",
        default=str(Path(__file__).resolve().parent / "golden_samples.json"),
        help="Path to golden sample manifest JSON.",
    )
    parser.add_argument(
        "--dataset-root",
        default=None,
        help="Optional dataset root override. Defaults to dataset_root in manifest.",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Optional output report JSON path.",
    )
    args = parser.parse_args()

    manifest_path = Path(args.manifest).resolve()
    dataset_root_override = Path(args.dataset_root).resolve() if args.dataset_root else None
    report = evaluate_manifest(manifest_path=manifest_path, dataset_root_override=dataset_root_override)
    print_report(report)

    if args.output:
        output_path = Path(args.output).resolve()
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(
            json.dumps(report, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(f"report saved: {output_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
