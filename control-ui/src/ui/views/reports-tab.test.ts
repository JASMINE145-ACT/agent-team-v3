import { render } from "lit";
import { describe, expect, it, vi } from "vitest";
import type { ReportRecord, ReportTaskConfig } from "../types.ts";
import { renderReportsTab, type ReportsTabParams } from "./reports-tab.ts";

function createRecord(): ReportRecord {
  return {
    id: 1,
    task_key: "sales_weekly_basic",
    status: "success",
    trigger_type: "manual",
    started_at: "2026-04-24T00:00:00Z",
    finished_at: "2026-04-24T00:01:00Z",
    summary_json: {
      total_sales_amount: 1_000_000,
      total_order_count: 50,
      prev_week: {
        total_sales_amount: 900_000,
        total_order_count: 45,
        amount_pct: 11.1,
        count_pct: 11.1,
      },
    },
    report_json: {
      total_sales_amount: 1_000_000,
      total_order_count: 50,
      daily_stats: [
        { date: "2026-04-14", order_count: 10, sales_amount: 200_000 },
        { date: "2026-04-15", order_count: 12, sales_amount: 220_000 },
      ],
      top_customers: [],
      status_stats: [],
    },
    analysis_status: "done",
  };
}

function createParams(overrides: Partial<ReportsTabParams> = {}): ReportsTabParams {
  const report = createRecord();
  return {
    reportsLoading: false,
    reportsError: null,
    reportsTasks: [],
    reportsRecords: [report],
    reportsAdminToken: "",
    selectedRecordId: report.id,
    reportDetailLoading: false,
    reportDetail: report,
    reportsDetailTab: "data",
    reportsEditingTaskId: null,
    reportsEditForm: {} as ReportTaskConfig,
    reportsFilter: { search: "", status: "all" },
    onTokenChange: () => undefined,
    onRefresh: () => undefined,
    onRun: () => undefined,
    onSelectRecord: () => undefined,
    onDetailTabChange: () => undefined,
    onReanalyze: () => undefined,
    selectedDailyDate: null,
    onDailyDateClick: () => undefined,
    onEditTask: () => undefined,
    onCancelEdit: () => undefined,
    onEditFormChange: () => undefined,
    onSaveEdit: () => undefined,
    onFilterChange: () => undefined,
    ...overrides,
  };
}

describe("reports tab view", () => {
  it("renders WoW delta text from prev_week summary", () => {
    const container = document.createElement("div");
    render(renderReportsTab(createParams()), container);
    const text = container.textContent ?? "";
    // 两个 KPI 卡（金额/单量）都应渲染 delta
    const hits = text.match(/11\.1% vs 上周/g) ?? [];
    expect(hits.length).toBe(2);
  });

  it("toggles selected daily date on chart bar click", () => {
    const container = document.createElement("div");
    const onDailyDateClick = vi.fn();
    render(
      renderReportsTab(
        createParams({
          selectedDailyDate: "2026-04-14",
          onDailyDateClick,
        }),
      ),
      container,
    );

    const chart = container.querySelector("report-chart");
    expect(chart).not.toBeNull();

    chart?.dispatchEvent(
      new CustomEvent("chart-bar-click", {
        detail: { date: "2026-04-14" },
        bubbles: true,
        composed: true,
      }),
    );
    expect(onDailyDateClick).toHaveBeenNthCalledWith(1, null);

    chart?.dispatchEvent(
      new CustomEvent("chart-bar-click", {
        detail: { date: "2026-04-15" },
        bubbles: true,
        composed: true,
      }),
    );
    expect(onDailyDateClick).toHaveBeenNthCalledWith(2, "2026-04-15");
  });

  it("renders and clears selected date via clear button", () => {
    const container = document.createElement("div");
    const onDailyDateClick = vi.fn();
    render(
      renderReportsTab(
        createParams({
          selectedDailyDate: "2026-04-14",
          onDailyDateClick,
        }),
      ),
      container,
    );

    const clearBtn = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent?.trim() === "清除",
    );
    expect(clearBtn).toBeDefined();
    clearBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onDailyDateClick).toHaveBeenCalledWith(null);
  });

  it("does not show clear button when no date is selected", () => {
    const container = document.createElement("div");
    render(
      renderReportsTab(
        createParams({
          selectedDailyDate: null,
        }),
      ),
      container,
    );
    const clearBtn = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent?.trim() === "清除",
    );
    expect(clearBtn).toBeUndefined();
  });

  it("highlights selected daily row when selectedDailyDate is set", () => {
    const container = document.createElement("div");
    render(
      renderReportsTab(
        createParams({
          selectedDailyDate: "2026-04-15",
        }),
      ),
      container,
    );

    const selectedRow = Array.from(container.querySelectorAll("tbody tr")).find((row) => {
      const text = row.textContent ?? "";
      return text.includes("2026-04-15");
    });
    expect(selectedRow).toBeDefined();
    const style = selectedRow?.getAttribute("style") ?? "";
    expect(style).toContain("font-weight:600");
    expect(style).toContain("accent-soft");
  });

  it("shows troubleshooting section on failed analysis", () => {
    const failedRecord: ReportRecord = {
      ...createRecord(),
      id: 42,
      analysis_status: "failed",
      error_message: "anthropic API error",
    };
    const container = document.createElement("div");
    render(
      renderReportsTab(
        createParams({
          reportDetail: failedRecord,
          reportsDetailTab: "analysis",
        }),
      ),
      container,
    );
    expect(container.querySelector("details")).not.toBeNull();
    expect(container.textContent ?? "").toContain("record_id=42");
  });

  it("renders history filters and emits onFilterChange", () => {
    const onFilterChange = vi.fn();
    const container = document.createElement("div");
    render(renderReportsTab(createParams({ onFilterChange })), container);
    const input = container.querySelector("input[placeholder]") as HTMLInputElement | null;
    const select = container.querySelector("select") as HTMLSelectElement | null;
    expect(input).not.toBeNull();
    expect(select).not.toBeNull();
    input!.value = "2026-04";
    input!.dispatchEvent(new Event("input", { bubbles: true }));
    expect(onFilterChange).toHaveBeenCalled();
  });
});
