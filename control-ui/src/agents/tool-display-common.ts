/** Stub: 工具展示通用，供 control-ui 使用 */
export type ToolDisplaySpec = {
  icon?: string;
  title?: string;
  label?: string;
  detailKeys?: string[];
  detailKeysMode?: string;
  actions?: Array<{ label?: string; detailKeys?: string[] }>;
};

export function defaultTitle(name: string): string {
  return (name ?? "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Tool";
}

export function normalizeToolName(name: string | undefined | null): string {
  const s = (name ?? "").trim();
  return s ? s.replace(/\s+/g, "_").toLowerCase() : "";
}

export function normalizeVerb(verb: string): string {
  return (verb ?? "").trim().toLowerCase() || "use";
}

export function resolveActionSpec(
  _spec: ToolDisplaySpec | undefined,
  _action: string | undefined,
): { label?: string; detailKeys?: string[] } | undefined {
  return undefined;
}

export function resolveDetailFromKeys(
  _args: unknown,
  _keys: string[],
  _opts?: { mode?: string; coerce?: object },
): string | undefined {
  return undefined;
}

export function resolveExecDetail(_args: unknown): string | undefined {
  return undefined;
}

export function resolveReadDetail(_args: unknown): string | undefined {
  return undefined;
}

export function resolveWriteDetail(_key: string, _args: unknown): string | undefined {
  return undefined;
}

export function resolveWebSearchDetail(_args: unknown): string | undefined {
  return undefined;
}

export function resolveWebFetchDetail(_args: unknown): string | undefined {
  return undefined;
}
