/** Stub: 设备认证 payload，供 control-ui 使用 */
export function buildDeviceAuthPayload(_opts: {
  deviceId?: string;
  clientId?: string;
  clientMode?: string;
  role?: string;
  scopes?: string[];
  signedAtMs?: number;
  token?: string | null;
  nonce?: string;
}): Record<string, unknown> {
  return {};
}
