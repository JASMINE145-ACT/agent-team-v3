import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { t } from "../../i18n/index.ts";
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
);

type ByTimeRow = { date?: string; count?: number };

@customElement("dashboard-charts")
export class DashboardCharts extends LitElement {
  @property({ attribute: false }) quotationByTime: ByTimeRow[] = [];
  @property({ attribute: false }) oosByTime: ByTimeRow[] = [];
  @property({ attribute: false }) shortageByTime: ByTimeRow[] = [];
  @property({ type: Boolean }) loading = false;

  private quotationChart: Chart | null = null;
  private stockChart: Chart | null = null;

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .chart-card {
      background: var(--bg-elev, #fff);
      border: 1px solid var(--border, #2e2e2e);
      border-radius: 12px;
      padding: 14px;
    }
    .chart-title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--text, #111);
    }
    .chart-wrap {
      position: relative;
      width: 100%;
      height: 280px;
    }
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
    .empty {
      font-size: 12px;
      color: var(--text-dim, #9aa0a6);
      padding: 26px 0;
      text-align: center;
    }
  `;

  render() {
    return html`
      <div class="chart-card">
        <div class="chart-title">${t("overview.dashboard.chart.quotationTrend")}</div>
        ${this.loading
          ? html`<div class="empty">${t("overview.dashboard.chart.loading")}</div>`
          : this.quotationByTime.length === 0
            ? html`<div class="empty">${t("overview.dashboard.chart.empty")}</div>`
            : html`<div class="chart-wrap"><canvas id="quotation-chart"></canvas></div>`}
      </div>
      <div class="chart-card">
        <div class="chart-title">${t("overview.dashboard.chart.stockTrend")}</div>
        ${this.loading
          ? html`<div class="empty">${t("overview.dashboard.chart.loading")}</div>`
          : this.oosByTime.length === 0 && this.shortageByTime.length === 0
            ? html`<div class="empty">${t("overview.dashboard.chart.empty")}</div>`
            : html`<div class="chart-wrap"><canvas id="stock-chart"></canvas></div>`}
      </div>
    `;
  }

  updated() {
    this.renderQuotationChart();
    this.renderStockChart();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.quotationChart?.destroy();
    this.stockChart?.destroy();
    this.quotationChart = null;
    this.stockChart = null;
  }

  private renderQuotationChart() {
    const canvas = this.shadowRoot?.getElementById("quotation-chart") as HTMLCanvasElement | null;
    if (!canvas) {
      this.quotationChart?.destroy();
      this.quotationChart = null;
      return;
    }
    this.quotationChart?.destroy();

    const labels = this.quotationByTime.map((r) => (r.date ?? "").slice(5));
    const series = this.quotationByTime.map((r) => Number(r.count ?? 0));

    this.quotationChart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: t("overview.dashboard.chart.quotationSeries"),
            data: series,
            borderColor: "#4f8ef7",
            backgroundColor: "rgba(79,142,247,0.14)",
            fill: true,
            tension: 0.35,
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { font: { size: 12 } } },
          y: { beginAtZero: true, ticks: { precision: 0, font: { size: 12 } } },
        },
        elements: { line: { borderWidth: 3 }, point: { radius: 3 } },
      },
    });
  }

  private renderStockChart() {
    const canvas = this.shadowRoot?.getElementById("stock-chart") as HTMLCanvasElement | null;
    if (!canvas) {
      this.stockChart?.destroy();
      this.stockChart = null;
      return;
    }
    this.stockChart?.destroy();

    const allDates = [
      ...new Set([
        ...this.oosByTime.map((r) => r.date ?? ""),
        ...this.shortageByTime.map((r) => r.date ?? ""),
      ]),
    ]
      .filter(Boolean)
      .sort();
    const labels = allDates.map((d) => d.slice(5));
    const oosMap = Object.fromEntries(this.oosByTime.map((r) => [r.date ?? "", Number(r.count ?? 0)]));
    const shortageMap = Object.fromEntries(
      this.shortageByTime.map((r) => [r.date ?? "", Number(r.count ?? 0)]),
    );

    this.stockChart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: t("overview.dashboard.chart.oosSeries"),
            data: allDates.map((d) => oosMap[d] ?? 0),
            borderColor: "#e25555",
            backgroundColor: "rgba(226,85,85,0.12)",
            fill: true,
            tension: 0.35,
            pointRadius: 2,
          },
          {
            label: t("overview.dashboard.chart.shortageSeries"),
            data: allDates.map((d) => shortageMap[d] ?? 0),
            borderColor: "#f5a623",
            backgroundColor: "rgba(245,166,35,0.12)",
            fill: true,
            tension: 0.35,
            pointRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: { legend: { display: true, position: "top", labels: { font: { size: 12 } } } },
        scales: {
          x: { ticks: { font: { size: 12 } } },
          y: { beginAtZero: true, ticks: { precision: 0, font: { size: 12 } } },
        },
        elements: { line: { borderWidth: 3 }, point: { radius: 3 } },
      },
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dashboard-charts": DashboardCharts;
  }
}
