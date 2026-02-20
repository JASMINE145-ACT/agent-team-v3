/**
 * Control UI 与后端的约定（路径与配置类型）。
 * 原依赖外部 src/gateway/control-ui-contract，现内联到 control-ui 内。
 */
export const CONTROL_UI_BOOTSTRAP_CONFIG_PATH = "/api/bootstrap";

export type ControlUiBootstrapConfig = {
  assistantName?: string | null;
  assistantAvatar?: string | null;
  assistantAgentId?: string | null;
};
