/** Stub: 网关客户端信息 */
export const GATEWAY_CLIENT_MODES = {
  WEBCHAT: "webchat",
  NODE: "node",
} as const;
export const GATEWAY_CLIENT_NAMES = {
  CONTROL_UI: "control-ui",
  NODE: "node",
} as const;
export type GatewayClientMode = (typeof GATEWAY_CLIENT_MODES)[keyof typeof GATEWAY_CLIENT_MODES];
export type GatewayClientName = (typeof GATEWAY_CLIENT_NAMES)[keyof typeof GATEWAY_CLIENT_NAMES];
