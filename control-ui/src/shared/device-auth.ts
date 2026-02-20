/** Stub: 设备认证存储类型与规范化 */
export type DeviceAuthEntry = { token?: string; role?: string; scopes?: string[]; issuedAtMs?: number };
export type DeviceAuthStore = { version: number; deviceId: string; tokens: Record<string, DeviceAuthEntry> };

export function normalizeDeviceAuthRole(role: string | undefined | null): string {
  return (role ?? "").trim().toLowerCase() || "viewer";
}
export function normalizeDeviceAuthScopes(scopes: unknown): string[] {
  if (!Array.isArray(scopes)) return [];
  return scopes.filter((s): s is string => typeof s === "string").map((s) => s.trim()).filter(Boolean);
}
