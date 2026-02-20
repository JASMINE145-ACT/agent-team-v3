/** Stub: 时长格式化，供 control-ui 使用 */
export function formatDurationHuman(ms?: number | null): string {
  if (ms == null || !Number.isFinite(ms)) return "n/a";
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const h = Math.floor(min / 60);
  if (h > 0) return `${h}h`;
  if (min > 0) return `${min}m`;
  if (sec > 0) return `${sec}s`;
  return "<1s";
}

export function formatDurationCompact(
  ms?: number | null,
  opts?: { spaced?: boolean },
): string | null {
  if (ms == null || !Number.isFinite(ms)) return null;
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const h = Math.floor(min / 60);
  const sep = opts?.spaced ? " " : "";
  if (h > 0) return `${h}${sep}h`;
  if (min > 0) return `${min}${sep}m`;
  if (sec > 0) return `${sec}${sep}s`;
  return "<1s";
}
