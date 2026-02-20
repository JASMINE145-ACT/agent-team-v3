/** Stub: 工具策略，供 control-ui 使用 */
export function normalizeToolName(name: string | undefined | null): string {
  const s = (name ?? "").trim();
  return s ? s.replace(/\s+/g, "_").toLowerCase() : "";
}

export function expandToolGroups(_groupIds: string[]): string[] {
  return [];
}

export function resolveToolProfilePolicy(_policy: unknown): { allow: string[]; alsoAllow: string[]; deny: string[] } {
  return { allow: [], alsoAllow: [], deny: [] };
}
