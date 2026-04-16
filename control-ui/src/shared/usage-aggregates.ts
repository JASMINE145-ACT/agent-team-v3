/** Stub: 使用量聚合尾部，供 usage-metrics 使用 */

type SessionsUsageTotals = {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
  totalTokens: number;
  totalCost: number;
  inputCost: number;
  outputCost: number;
  cacheReadCost: number;
  cacheWriteCost: number;
  missingCostEntries: number;
};

export function buildUsageAggregateTail(_opts: Record<string, unknown>): {
  byChannel: Array<{ channel: string; totals: SessionsUsageTotals }>;
  daily: Array<{
    date: string;
    tokens: number;
    cost: number;
    messages: number;
    toolCalls: number;
    errors: number;
  }>;
  latency?: { count: number; avgMs: number; p95Ms: number; minMs: number; maxMs: number };
  dailyLatency?: Array<{
    date: string;
    count: number;
    avgMs: number;
    p95Ms: number;
    minMs: number;
    maxMs: number;
  }>;
  modelDaily?: Array<{
    date: string;
    provider?: string;
    model?: string;
    tokens: number;
    cost: number;
    count: number;
  }>;
} {
  return { byChannel: [], daily: [] };
}
