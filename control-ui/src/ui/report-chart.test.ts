import { describe, expect, it } from "vitest";
import "./report-chart.ts";

describe("report-chart", () => {
  it("dispatches chart-bar-click with selected date from onClick", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);

    const el = document.createElement("report-chart") as HTMLElement & {
      data: Array<{ date: string; order_count: number; sales_amount: number }>;
      type: "daily" | "customers";
      updateComplete?: Promise<unknown>;
      _chart?: { options?: { onClick?: (evt: unknown, elements: Array<{ index: number }>) => void } };
    };
    el.type = "daily";
    el.data = [
      { date: "2026-04-14", order_count: 10, sales_amount: 200_000 },
      { date: "2026-04-15", order_count: 12, sales_amount: 220_000 },
    ];
    host.appendChild(el);
    await el.updateComplete;

    const clickHandler = el._chart?.options?.onClick;
    expect(typeof clickHandler).toBe("function");
    const eventPromise = new Promise<CustomEvent<{ date: string }>>((resolve) => {
      host.addEventListener(
        "chart-bar-click",
        (evt) => {
          resolve(evt as CustomEvent<{ date: string }>);
        },
        { once: true },
      );
    });
    clickHandler?.({}, [{ index: 1 }]);
    const captured = await eventPromise;
    expect(captured.detail.date).toBe("2026-04-15");

    host.remove();
  });
});
