/** Stub: 相对时间，供 control-ui 使用 */
export function formatRelativeTimestamp(ms?: number | null): string {
  if (ms == null || !Number.isFinite(ms)) return "n/a";
  const now = Date.now();
  const diff = ms - now;
  const abs = Math.abs(diff);
  const min = Math.floor(abs / 60000);
  const h = Math.floor(min / 60);
  const d = Math.floor(h / 24);
  if (diff > 0) {
    if (min < 1) return "in <1m";
    if (min < 60) return `in ${min}m`;
    if (h < 24) return `in ${h}h`;
    return `in ${d}d`;
  }
  if (abs < 15000) return "just now";
  if (min < 60) return `${min}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}
