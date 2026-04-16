import { Chart, registerables } from "chart.js";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

Chart.register(...registerables);

type DailyStat = { date: string; order_count: number; sales_amount: number };
type CustomerStat = { customer_name: string; sales_amount: number; order_count: number };

@customElement("report-chart")
export class ReportChart extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .chart-wrap {
      position: relative;
      width: 100%;
    }
  `;

  @property({ type: Array }) data: (DailyStat | CustomerStat)[] = [];
  @property({ type: String }) type: "daily" | "customers" = "daily";

  private _chart: Chart | null = null;

  render() {
    const h = this.type === "customers" ? Math.max(220, this.data.length * 30) : 200;
    return html`
      <div class="chart-wrap" style="height:${h}px;">
        <canvas></canvas>
      </div>
    `;
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("data") || changedProperties.has("type") || !this._chart) {
      this._rebuild();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._chart?.destroy();
    this._chart = null;
  }

  private _rebuild(): void {
    this._chart?.destroy();
    this._chart = null;

    const canvas = this.renderRoot.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas || !this.data.length) return;

    const bg = "rgba(99,102,241,0.72)";
    const border = "rgba(99,102,241,1)";

    if (this.type === "daily") {
      const rows = this.data as DailyStat[];
      this._chart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: rows.map((r) => r.date),
          datasets: [
            {
              label: "销售额",
              data: rows.map((r) => r.sales_amount),
              backgroundColor: bg,
              borderColor: border,
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `Rp ${Number(ctx.raw).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}`,
                afterLabel: (ctx) => `订单数: ${(rows[ctx.dataIndex] as DailyStat).order_count}`,
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: (val) =>
                  `Rp ${Number(val).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}`,
                maxTicksLimit: 5,
              },
            },
          },
        },
      });
    } else {
      const rows = [...(this.data as CustomerStat[])].reverse();
      this._chart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: rows.map((r) =>
            r.customer_name.length > 24 ? `${r.customer_name.slice(0, 24)}...` : r.customer_name,
          ),
          datasets: [
            {
              label: "销售额",
              data: rows.map((r) => r.sales_amount),
              backgroundColor: bg,
              borderColor: border,
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          indexAxis: "y" as const,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `Rp ${Number(ctx.raw).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}`,
                afterLabel: (ctx) => `订单数: ${(rows[ctx.dataIndex] as CustomerStat).order_count}`,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                callback: (val) =>
                  `Rp ${Number(val).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}`,
                maxTicksLimit: 5,
              },
            },
          },
        },
      });
    }
  }
}
