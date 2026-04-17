import { html, nothing } from "lit";
import { parseAgentSessionKey } from "../routing/session-key.js";
import { t, i18n, type Locale } from "../i18n/index.ts";
import { refreshChatAvatar } from "./app-chat.ts";
import { renderWorkTab } from "./app-render-work-tab.ts";
import { renderChatControls, renderTab, renderThemeToggle } from "./app-render.helpers.ts";
import type { AppViewState } from "./app-view-state.ts";
import { loadAgentFileContent, loadAgentFiles, saveAgentFile } from "./controllers/agent-files.ts";
import { loadAgentIdentities, loadAgentIdentity } from "./controllers/agent-identity.ts";
import { loadAgentSkills } from "./controllers/agent-skills.ts";
import { loadAgents, loadAgentInfo } from "./controllers/agents.ts";
import { loadChannels } from "./controllers/channels.ts";
import { loadBusinessKnowledge, saveBusinessKnowledge } from "./controllers/business-knowledge.ts";
import { loadChatHistory } from "./controllers/chat.ts";
import {
  applyConfig,
  loadConfig,
  runUpdate,
  saveConfig,
  updateConfigFormValue,
  removeConfigFormValue,
} from "./controllers/config.ts";
import {
  loadCronRuns,
  toggleCronJob,
  runCronJob,
  removeCronJob,
  addCronJob,
  normalizeCronFormState,
} from "./controllers/cron.ts";
import { loadDebug, callDebugMethod } from "./controllers/debug.ts";
import {
  approveDevicePairing,
  loadDevices,
  rejectDevicePairing,
  revokeDeviceToken,
  rotateDeviceToken,
} from "./controllers/devices.ts";
import {
  loadExecApprovals,
  removeExecApprovalsFormValue,
  saveExecApprovals,
  updateExecApprovalsFormValue,
} from "./controllers/exec-approvals.ts";
import { loadLogs } from "./controllers/logs.ts";
import { loadNodes } from "./controllers/nodes.ts";
import { loadOos, deleteOosItem, addOosItem, loadShortage, deleteShortageItem, addShortageItem } from "./controllers/oos.ts";
import { loadPresence } from "./controllers/presence.ts";
import { deleteSessionAndRefresh, loadSessions, patchSession } from "./controllers/sessions.ts";
import {
  installSkill,
  loadSkills,
  saveSkillApiKey,
  updateSkillEdit,
  updateSkillEnabled,
} from "./controllers/skills.ts";
import {
  addLibraryRow,
  adminLogin,
  adminLogout,
  deleteLibraryRow,
  dropLibrary,
  loadLibraries,
  loadLibraryData,
  patchLibraryRow,
  saveLibraryRow,
  uploadLibrary,
} from "./controllers/admin-data.ts";
import type { AdminDataHost } from "./controllers/admin-data.types.ts";
import {
  loadReportDetail,
  loadReports,
  reanalyzeRecord,
  runReportTask,
  saveReportTaskConfig,
  stopAnalysisPoller,
} from "./controllers/reports.ts";
import { icons } from "./icons.ts";
import { normalizeBasePath, TAB_GROUPS, subtitleForTab, titleForTab } from "./navigation.ts";
import { renderAgents } from "./views/agents.ts";
import { renderChannels } from "./views/channels.ts";
import { renderBusinessKnowledge } from "./views/business-knowledge.ts";
import { renderChat } from "./views/chat.ts";
import { renderConfig } from "./views/config.ts";
import { loadFulfillDraftDetail, confirmFulfillDraft } from "./controllers/fulfill.ts";
import { loadProcurementSuggestions, approveProcurement, procurementItemKey } from "./controllers/procurement.ts";
import { renderCron } from "./views/cron.ts";
import { renderFulfill } from "./views/fulfill.ts";
import { renderProcurement } from "./views/procurement.ts";
import { renderDebug } from "./views/debug.ts";
import { renderExecApprovalPrompt } from "./views/exec-approval.ts";
import { renderGatewayUrlConfirmation } from "./views/gateway-url-confirmation.ts";
import { renderAdminData } from "./views/admin-data.ts";
import { renderLogs } from "./views/logs.ts";
import { renderOosDashboard, renderShortageBlock } from "./views/oos-dashboard.ts";
import { renderNodes } from "./views/nodes.ts";
import { renderReportsTab } from "./views/reports-tab.ts";
import { renderOverview } from "./views/overview.ts";
import { renderSessions } from "./views/sessions.ts";
import { renderSkills } from "./views/skills.ts";

const AVATAR_DATA_RE = /^data:/i;
const AVATAR_HTTP_RE = /^https?:\/\//i;

function resolveAssistantAvatarUrl(state: AppViewState): string | undefined {
  const list = state.agentsList?.agents ?? [];
  const parsed = parseAgentSessionKey(state.sessionKey);
  const agentId = parsed?.agentId ?? state.agentsList?.defaultId ?? "main";
  const agent = list.find((entry) => entry.id === agentId);
  const identity = agent?.identity;
  const candidate = identity?.avatarUrl ?? identity?.avatar;
  if (!candidate) {
    return undefined;
  }
  if (AVATAR_DATA_RE.test(candidate) || AVATAR_HTTP_RE.test(candidate)) {
    return candidate;
  }
  return identity?.avatarUrl;
}

export function renderApp(state: AppViewState) {
  const presenceCount = state.presenceEntries.length;
  const sessionsCount = state.sessionsResult?.count ?? null;
  const cronNext = state.cronStatus?.nextWakeAtMs ?? null;
  const chatDisabledReason = state.connected ? null : t("chat.disconnected");
  const isChat = state.tab === "chat";
  const chatFocus = isChat && (state.settings.chatFocusMode || state.onboarding);
  const showThinking = state.onboarding ? false : state.settings.chatShowThinking;
  const assistantAvatarUrl = resolveAssistantAvatarUrl(state);
  const chatAvatarUrl = state.chatAvatarUrl ?? assistantAvatarUrl ?? null;
  const configValue =
    state.configForm ?? (state.configSnapshot?.config as Record<string, unknown> | null);
  const basePath = normalizeBasePath(state.basePath ?? "");
  const resolvedAgentId =
    state.agentsSelectedId ??
    state.agentsList?.defaultId ??
    state.agentsList?.agents?.[0]?.id ??
    null;

  const currentLocale = i18n.getLocale();

  return html`
    <div class="shell ${isChat ? "shell--chat" : ""} ${chatFocus ? "shell--chat-focus" : ""} ${state.settings.navCollapsed ? "shell--nav-collapsed" : ""} ${state.onboarding ? "shell--onboarding" : ""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${() =>
              state.applySettings({
                ...state.settings,
                navCollapsed: !state.settings.navCollapsed,
              })}
            title="${state.settings.navCollapsed ? t("nav.expand") : t("nav.collapse")}"
            aria-label="${state.settings.navCollapsed ? t("nav.expand") : t("nav.collapse")}"
          >
            <span class="nav-collapse-toggle__icon">${icons.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src=${basePath ? `${basePath}/favicon.svg` : "/favicon.svg"} alt="PT Vansting Agent" />
            </div>
            <div class="brand-text">
              <div class="brand-title">PT VANSTING AGENT</div>
              <div class="brand-sub">Gateway Dashboard</div>
            </div>
          </div>
        </div>
        <div class="topbar-status">
          <div class="pill">
            <span class="statusDot ${state.connected ? "ok" : ""}"></span>
            <span>${t("common.health")}</span>
            <span class="mono">${state.connected ? t("common.ok") : t("common.offline")}</span>
          </div>
          ${renderThemeToggle(state)}
          <label class="topbar-lang">
            <span class="sr-only">${t("overview.access.language")}</span>
            <select
              .value=${currentLocale}
              style="padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); min-width: 140px;"
              @change=${(e: Event) => {
                const v = (e.target as HTMLSelectElement).value as Locale;
                void i18n.setLocale(v);
                state.applySettings({ ...state.settings, locale: v });
              }}
            >
              <option value="en">${t("languages.en")}</option>
              <option value="zh-CN">${t("languages.zhCN")}</option>
            </select>
          </label>
        </div>
      </header>
      <aside class="nav ${state.settings.navCollapsed ? "nav--collapsed" : ""}">
        ${TAB_GROUPS.map((group) => {
          const isGroupCollapsed = state.settings.navGroupsCollapsed[group.label] ?? false;
          const hasActiveTab = group.tabs.some((tab) => tab === state.tab);
          return html`
            <div class="nav-group ${isGroupCollapsed && !hasActiveTab ? "nav-group--collapsed" : ""}">
              <button
                class="nav-label"
                @click=${() => {
                  const next = { ...state.settings.navGroupsCollapsed };
                  next[group.label] = !isGroupCollapsed;
                  state.applySettings({
                    ...state.settings,
                    navGroupsCollapsed: next,
                  });
                }}
                aria-expanded=${!isGroupCollapsed}
              >
                <span class="nav-label__text">${t(`nav.${group.label}`)}</span>
                <span class="nav-label__chevron">${isGroupCollapsed ? "+" : "−"}</span>
              </button>
              <div class="nav-group__items">
                ${group.tabs.map((tab) => renderTab(state, tab))}
              </div>
            </div>
          `;
        })}
        <div class="nav-group nav-group--links">
          <div class="nav-label nav-label--static">
            <span class="nav-label__text">${t("common.resources")}</span>
          </div>
          <div class="nav-group__items">
            <a
              class="nav-item nav-item--external"
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noreferrer"
              title="${t("common.docs")} (opens in new tab)"
            >
              <span class="nav-item__icon" aria-hidden="true">${icons.book}</span>
              <span class="nav-item__text">${t("common.docs")}</span>
            </a>
          </div>
        </div>
      </aside>
      <main class="content ${isChat ? "content--chat" : ""}">
        <section class="content-header">
          <div>
            ${state.tab === "work" ? nothing : html`<div class="page-title">${titleForTab(state.tab)}</div>`}
            ${state.tab === "work" ? nothing : html`<div class="page-sub">${subtitleForTab(state.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${state.lastError ? html`<div class="pill danger">${state.lastError}</div>` : nothing}
            ${isChat ? renderChatControls(state) : nothing}
          </div>
        </section>

        ${
          state.tab === "overview"
            ? renderOverview({
                connected: state.connected,
                hello: state.hello,
                settings: state.settings,
                password: state.password,
                lastError: state.lastError,
                presenceCount,
                sessionsCount,
                cronEnabled: state.cronStatus?.enabled ?? null,
                cronNext,
                lastChannelsRefresh: state.channelsLastSuccess,
                oosStats: state.overviewOosStats,
                shortageStats: state.overviewShortageStats,
                quotationStats: state.quotationStats,
                oosByTime: state.dashboardOosByTime,
                shortageByTime: state.dashboardShortageByTime,
                dashboardLoading: state.dashboardLoading,
                dashboardError: state.dashboardError,
                onSettingsChange: (next) => state.applySettings(next),
                onPasswordChange: (next) => (state.password = next),
                onSessionKeyChange: (next) => {
                  state.sessionKey = next;
                  state.chatMessage = "";
                  state.resetToolStream();
                  state.applySettings({
                    ...state.settings,
                    sessionKey: next,
                    lastActiveSessionKey: next,
                  });
                  void state.loadAssistantIdentity();
                },
                onConnect: () => state.connect(),
                onRefresh: () => state.loadOverview(),
              })
            : nothing
        }

        ${
          state.tab === "channels"
            ? renderBusinessKnowledge({
                loading: state.bkLoading,
                saving: state.bkSaving,
                error: state.bkError,
                content: state.bkContent,
                lastSuccessAt: state.bkLastSuccess,
                dependentFiles: state.bkDependentFiles,
                onReload: () => loadBusinessKnowledge(state),
                onSave: (content) => saveBusinessKnowledge(state, content),
                onContentChange: (content) => (state.bkContent = content),
              })
            : nothing
        }

        ${
          state.tab === "instances"
            ? html`
                ${renderOosDashboard({
                  loading: state.oosLoading,
                  error: state.oosError,
                  stats: state.oosStats,
                  list: state.oosList,
                  byFile: state.oosByFile,
                  byTime: state.oosByTime,
                  db: state.oosDb ?? undefined,
                  onRefresh: () => loadOos(state),
                  onDelete: (productKey) => deleteOosItem(state, productKey),
                  showAddForm: state.oosShowAddForm,
                  onOpenAddForm: () => (state.oosShowAddForm = true),
                  onCloseAddForm: () => (state.oosShowAddForm = false),
                  onAdd: async (record) => {
                    const ok = await addOosItem(state, record);
                    if (ok) state.oosShowAddForm = false;
                    return ok;
                  },
                })}
                ${renderShortageBlock({
                  loading: state.shortageLoading,
                  error: state.shortageError,
                  stats: state.shortageStats,
                  list: state.shortageList,
                  byFile: state.shortageByFile,
                  byTime: state.shortageByTime,
                  db: state.shortageDb ?? undefined,
                  onRefresh: () => loadShortage(state),
                  onDelete: (productKey) => deleteShortageItem(state, productKey),
                  showAddForm: state.shortageShowAddForm,
                  onOpenAddForm: () => (state.shortageShowAddForm = true),
                  onCloseAddForm: () => (state.shortageShowAddForm = false),
                  onAdd: async (record) => {
                    const ok = await addShortageItem(state, record);
                    if (ok) state.shortageShowAddForm = false;
                    return ok;
                  },
                })}
              `
            : nothing
        }

        ${
          state.tab === "sessions"
            ? renderProcurement({
                basePath: state.basePath,
                loading: state.procurementLoading,
                error: state.procurementError,
                suggestions: state.procurementSuggestions,
                selectedKeys: state.procurementSelectedKeys,
                approvedKeys: state.procurementApprovedKeys,
                approveBusy: state.procurementApproveBusy,
                approveResult: state.procurementApproveResult,
                filterQuery: state.procurementFilterQuery,
                sortBy: state.procurementSortBy,
                sortDir: state.procurementSortDir,
                page: state.procurementPage,
                pageSize: state.procurementPageSize,
                replenishmentDrafts: state.replenishmentDrafts,
                replenishmentDetail: state.replenishmentDetail,
                replenishmentDetailId: state.replenishmentDetailId,
                replenishmentLoading: state.replenishmentLoading,
                replenishmentError: state.replenishmentError,
                replenishmentConfirmBusy: state.replenishmentConfirmBusy,
                replenishmentConfirmResult: state.replenishmentConfirmResult,
                replenishmentInputLines: state.replenishmentInputLines,
                replenishmentCreateBusy: state.replenishmentCreateBusy,
                onReplenishmentLineChange: (index, field, value) =>
                  state.onReplenishmentLineChange(index, field, value),
                onReplenishmentAddLine: () => state.onReplenishmentAddLine(),
                onReplenishmentRemoveLine: (index) => state.onReplenishmentRemoveLine(index),
                onCreateReplenishmentDraft: () => state.createProcurementReplenishmentDraft(),
                onReplenishmentRefresh: () => state.loadProcurementReplenishment(),
                onSelectReplenishmentDraft: (draftId) => {
                  void state.loadProcurementReplenishmentDetail(draftId);
                },
                onConfirmReplenishment: (draftId) => {
                  if (typeof window !== "undefined" && !window.confirm(t("replenishment.confirmPrompt"))) return;
                  void state.confirmProcurementReplenishment(draftId);
                },
                onDeleteReplenishmentDraft: (draftId) => {
                  if (typeof window !== "undefined" && !window.confirm(t("replenishment.deleteConfirm"))) return;
                  void state.deleteProcurementReplenishmentDraft(draftId);
                },
                onClearReplenishmentDetail: () => {
                  state.replenishmentDetail = null;
                  state.replenishmentDetailId = null;
                },
                onRefresh: () => {
                  state.procurementPage = 1;
                  return state.loadProcurementSuggestions();
                },
                onToggleSelect: (key) => {
                  if (state.procurementSelectedKeys.includes(key)) {
                    state.procurementSelectedKeys = state.procurementSelectedKeys.filter((k) => k !== key);
                  } else {
                    state.procurementSelectedKeys = [...state.procurementSelectedKeys, key];
                  }
                },
                onApprove: (item) => {
                  if (typeof window !== "undefined" && !window.confirm(t("procurement.approveConfirm"))) return;
                  const payload = [{
                    product_key: item.product_key,
                    product_name: item.product_name,
                    specification: item.specification,
                    shortfall: item.shortfall,
                    code: item.code,
                  }];
                  void approveProcurement(state, payload).then((res) => {
                    if (res && (res.approved_count ?? 0) > 0) {
                      state.procurementApprovedKeys = [...state.procurementApprovedKeys, procurementItemKey(item)];
                    }
                  });
                },
                onApproveBatch: () => {
                  const selected = state.procurementSuggestions.filter((s) =>
                    state.procurementSelectedKeys.includes(procurementItemKey(s)),
                  );
                  if (selected.length === 0) return;
                  if (typeof window !== "undefined" && !window.confirm(t("procurement.approveBatchConfirm", { count: String(selected.length) }))) return;
                  const payload = selected.map((s) => ({
                    product_key: s.product_key,
                    product_name: s.product_name,
                    specification: s.specification,
                    shortfall: s.shortfall,
                    code: s.code,
                  }));
                  void approveProcurement(state, payload).then((res) => {
                    if (res && (res.approved_count ?? 0) > 0) {
                      const keys = selected.map((s) => procurementItemKey(s));
                      state.procurementApprovedKeys = [...state.procurementApprovedKeys, ...keys];
                      state.procurementSelectedKeys = state.procurementSelectedKeys.filter((k) => !keys.includes(k));
                    }
                  });
                },
                onFilterQueryChange: (value) => {
                  state.procurementFilterQuery = value;
                  state.procurementPage = 1;
                },
                onSortByChange: (value) => {
                  state.procurementSortBy = value;
                  state.procurementPage = 1;
                },
                onSortDirChange: (value) => {
                  state.procurementSortDir = value;
                  state.procurementPage = 1;
                },
                onPageChange: (value) => {
                  state.procurementPage = Math.max(1, value);
                },
                onPageSizeChange: (value) => {
                  state.procurementPageSize = Math.max(1, value);
                  state.procurementPage = 1;
                },
              })
            : nothing
        }

        ${renderWorkTab(state)}

        ${
          state.tab === "cron"
            ? renderFulfill({
                basePath: state.basePath,
                loading: state.fulfillDraftsLoading,
                error: state.fulfillDraftsError,
                drafts: state.fulfillDrafts,
                detail: state.fulfillDetail,
                detailId: state.fulfillDetailId,
                confirmBusy: state.fulfillConfirmBusy,
                confirmResult: state.fulfillConfirmResult,
                filterQuery: state.fulfillFilterQuery,
                sortBy: state.fulfillSortBy,
                sortDir: state.fulfillSortDir,
                page: state.fulfillPage,
                pageSize: state.fulfillPageSize,
                onRefresh: () => {
                  state.fulfillPage = 1;
                  return state.loadFulfillDrafts();
                },
                onSelectDraft: (draftId) => loadFulfillDraftDetail(state, draftId),
                onConfirm: (draftId) => {
                  const detail = state.fulfillDetailId === draftId ? state.fulfillDetail : null;
                  const lineCount = detail?.lines?.length ?? 0;
                  const totalAmount = (detail?.lines ?? []).reduce(
                    (sum, l) => sum + Number(l.amount ?? 0),
                    0,
                  );
                  const msg =
                    lineCount > 0
                      ? t("fulfill.confirmPrompt", {
                          count: String(lineCount),
                          amount: totalAmount.toFixed(2),
                        })
                      : t("fulfill.confirmPromptSimple");
                  if (typeof window !== "undefined" && window.confirm(msg)) {
                    void confirmFulfillDraft(state, draftId).then((res) => {
                      if (res?.order_id) {
                        void state.loadProcurementSuggestions();
                      }
                    });
                  }
                },
                onClearDetail: () => {
                  state.fulfillDetail = null;
                  state.fulfillDetailId = null;
                  state.fulfillConfirmResult = null;
                },
                onFilterQueryChange: (value) => {
                  state.fulfillFilterQuery = value;
                  state.fulfillPage = 1;
                },
                onSortByChange: (value) => {
                  state.fulfillSortBy = value;
                  state.fulfillPage = 1;
                },
                onSortDirChange: (value) => {
                  state.fulfillSortDir = value;
                  state.fulfillPage = 1;
                },
                onPageChange: (value) => {
                  state.fulfillPage = Math.max(1, value);
                },
                onPageSizeChange: (value) => {
                  state.fulfillPageSize = Math.max(1, value);
                  state.fulfillPage = 1;
                },
              })
            : nothing
        }

        ${
          state.tab === "agents"
            ? renderAgents({
                loading: state.agentsLoading,
                error: state.agentsError,
                agentsList: state.agentsList,
                selectedAgentId: resolvedAgentId,
                activePanel: state.agentsPanel,
                agentInfo: state.agentInfo,
                agentInfoLoading: state.agentInfoLoading,
                agentInfoError: state.agentInfoError,
                agentIdentityLoading: state.agentIdentityLoading,
                agentIdentityError: state.agentIdentityError,
                agentIdentityById: state.agentIdentityById,
                onRefresh: async () => {
                  await loadAgents(state);
                  void loadAgentInfo(state);
                  const agentIds = state.agentsList?.agents?.map((entry) => entry.id) ?? [];
                  if (agentIds.length > 0) {
                    void loadAgentIdentities(state, agentIds);
                  }
                },
                onSelectAgent: (agentId) => {
                  if (state.agentsSelectedId === agentId) {
                    return;
                  }
                  state.agentsSelectedId = agentId;
                  void loadAgentIdentity(state, agentId);
                },
                onSelectPanel: (panel) => {
                  state.agentsPanel = panel;
                },
              })
            : nothing
        }

        ${
          state.tab === "skills"
            ? renderSkills({
                loading: state.skillsLoading,
                report: state.skillsReport,
                error: state.skillsError,
                filter: state.skillsFilter,
                edits: state.skillEdits,
                messages: state.skillMessages,
                busyKey: state.skillsBusyKey,
                onFilterChange: (next) => (state.skillsFilter = next),
                onRefresh: () => loadSkills(state, { clearMessages: true }),
                onToggle: (key, enabled) => updateSkillEnabled(state, key, enabled),
                onEdit: (key, value) => updateSkillEdit(state, key, value),
                onSaveKey: (key) => saveSkillApiKey(state, key),
                onInstall: (skillKey, name, installId) =>
                  installSkill(state, skillKey, name, installId),
              })
            : nothing
        }

        ${
          state.tab === "nodes"
            ? renderNodes({
                loading: state.nodesLoading,
                nodes: state.nodes,
                devicesLoading: state.devicesLoading,
                devicesError: state.devicesError,
                devicesList: state.devicesList,
                configForm:
                  state.configForm ??
                  (state.configSnapshot?.config as Record<string, unknown> | null),
                configLoading: state.configLoading,
                configSaving: state.configSaving,
                configDirty: state.configFormDirty,
                configFormMode: state.configFormMode,
                execApprovalsLoading: state.execApprovalsLoading,
                execApprovalsSaving: state.execApprovalsSaving,
                execApprovalsDirty: state.execApprovalsDirty,
                execApprovalsSnapshot: state.execApprovalsSnapshot,
                execApprovalsForm: state.execApprovalsForm,
                execApprovalsSelectedAgent: state.execApprovalsSelectedAgent,
                execApprovalsTarget: state.execApprovalsTarget,
                execApprovalsTargetNodeId: state.execApprovalsTargetNodeId,
                onRefresh: () => loadNodes(state),
                onDevicesRefresh: () => loadDevices(state),
                onDeviceApprove: (requestId) => approveDevicePairing(state, requestId),
                onDeviceReject: (requestId) => rejectDevicePairing(state, requestId),
                onDeviceRotate: (deviceId, role, scopes) =>
                  rotateDeviceToken(state, { deviceId, role, scopes }),
                onDeviceRevoke: (deviceId, role) => revokeDeviceToken(state, { deviceId, role }),
                onLoadConfig: () => loadConfig(state),
                onLoadExecApprovals: () => {
                  const target =
                    state.execApprovalsTarget === "node" && state.execApprovalsTargetNodeId
                      ? { kind: "node" as const, nodeId: state.execApprovalsTargetNodeId }
                      : { kind: "gateway" as const };
                  return loadExecApprovals(state, target);
                },
                onBindDefault: (nodeId) => {
                  if (nodeId) {
                    updateConfigFormValue(state, ["tools", "exec", "node"], nodeId);
                  } else {
                    removeConfigFormValue(state, ["tools", "exec", "node"]);
                  }
                },
                onBindAgent: (agentIndex, nodeId) => {
                  const basePath = ["agents", "list", agentIndex, "tools", "exec", "node"];
                  if (nodeId) {
                    updateConfigFormValue(state, basePath, nodeId);
                  } else {
                    removeConfigFormValue(state, basePath);
                  }
                },
                onSaveBindings: () => saveConfig(state),
                onExecApprovalsTargetChange: (kind, nodeId) => {
                  state.execApprovalsTarget = kind;
                  state.execApprovalsTargetNodeId = nodeId;
                  state.execApprovalsSnapshot = null;
                  state.execApprovalsForm = null;
                  state.execApprovalsDirty = false;
                  state.execApprovalsSelectedAgent = null;
                },
                onExecApprovalsSelectAgent: (agentId) => {
                  state.execApprovalsSelectedAgent = agentId;
                },
                onExecApprovalsPatch: (path, value) =>
                  updateExecApprovalsFormValue(state, path, value),
                onExecApprovalsRemove: (path) => removeExecApprovalsFormValue(state, path),
                onSaveExecApprovals: () => {
                  const target =
                    state.execApprovalsTarget === "node" && state.execApprovalsTargetNodeId
                      ? { kind: "node" as const, nodeId: state.execApprovalsTargetNodeId }
                      : { kind: "gateway" as const };
                  return saveExecApprovals(state, target);
                },
              })
            : nothing
        }

        ${
          state.tab === "reports"
            ? renderReportsTab({
                reportsLoading: state.reportsLoading,
                reportsError: state.reportsError,
                reportsTasks: state.reportsTasks,
                reportsRecords: state.reportsRecords,
                reportsAdminToken: state.reportsAdminToken,
                selectedRecordId: state.selectedRecordId,
                reportDetailLoading: state.reportDetailLoading,
                reportDetail: state.reportDetail,
                reportsDetailTab: state.reportsDetailTab,
                reportsEditingTaskId: state.reportsEditingTaskId,
                reportsEditForm: state.reportsEditForm,
                onTokenChange: (token) => {
                  state.reportsAdminToken = token;
                },
                onRefresh: () => loadReports(state),
                onRun: (taskKey) => {
                  void runReportTask(state, taskKey);
                },
                onSelectRecord: (recordId) => {
                  stopAnalysisPoller();
                  void loadReportDetail(state, recordId);
                },
                onDetailTabChange: (tab) => {
                  state.reportsDetailTab = tab;
                },
                onReanalyze: (recordId) => {
                  void reanalyzeRecord(state, recordId);
                },
                onEditTask: (task) => {
                  state.reportsEditingTaskId = task.task_key;
                  state.reportsEditForm = {
                    enabled: task.enabled,
                    cron_expr: task.cron_expr,
                    timezone: task.timezone,
                    title: task.title,
                  };
                },
                onCancelEdit: () => {
                  state.reportsEditingTaskId = null;
                  state.reportsEditForm = {};
                },
                onEditFormChange: (patch) => {
                  state.reportsEditForm = patch;
                },
                onSaveEdit: (taskKey) => {
                  void saveReportTaskConfig(state, taskKey, state.reportsEditForm).then(() => {
                    if (!state.reportsError) {
                      state.reportsEditingTaskId = null;
                      state.reportsEditForm = {};
                    }
                  });
                },
              })
            : nothing
        }

        ${
          state.tab === "chat"
            ? renderChat({
                sessionKey: state.sessionKey,
                onSessionKeyChange: (next) => {
                  state.sessionKey = next;
                  state.chatMessage = "";
                  state.chatAttachments = [];
                  state.chatStream = null;
                  state.chatStreamStartedAt = null;
                  state.chatRunId = null;
                  state.chatQueue = [];
                  state.resetToolStream();
                  (state as unknown as { resetToolRender: () => void }).resetToolRender();
                  state.ocrResultCards = [];
                  state.resetChatScroll();
                  state.applySettings({
                    ...state.settings,
                    sessionKey: next,
                    lastActiveSessionKey: next,
                  });
                  void state.loadAssistantIdentity();
                  void loadChatHistory(state);
                  void refreshChatAvatar(state);
                },
                thinkingLevel: state.chatThinkingLevel,
                showThinking,
                loading: state.chatLoading,
                sending: state.chatSending,
                compactionStatus: state.compactionStatus,
                toolRenderData: state.toolRenderData,
                toolRenderSeq: state.toolRenderSeq,
                toolRenderItems: state.toolRenderItems,
                candidatePreviews: state.candidatePreviews,
                ocrResultCards: state.ocrResultCards,
                assistantAvatarUrl: chatAvatarUrl,
                messages: state.chatMessages,
                toolMessages: state.chatToolMessages,
                stream: state.chatStream,
                streamStartedAt: state.chatStreamStartedAt,
                draft: state.chatMessage,
                queue: state.chatQueue,
                connected: state.connected,
                canSend: state.connected,
                disabledReason: chatDisabledReason,
                error: state.lastError,
                sessions: state.sessionsResult,
                focusMode: chatFocus,
                onRefresh: () => {
                  state.resetToolStream();
                  return Promise.all([loadChatHistory(state), refreshChatAvatar(state)]);
                },
                onToggleFocusMode: () => {
                  if (state.onboarding) {
                    return;
                  }
                  state.applySettings({
                    ...state.settings,
                    chatFocusMode: !state.settings.chatFocusMode,
                  });
                },
                onChatScroll: (event) => state.handleChatScroll(event),
                onDraftChange: (next) => (state.chatMessage = next),
                attachments: state.chatAttachments,
                onAttachmentsChange: (next) => (state.chatAttachments = next),
                uploadedFile: state.chatUploadedFile,
                onFileSelect: (file) => state.handleUploadChatFile(file),
                onClearUploadedFile: () => state.clearChatUploadedFile(),
                composeDragOver: state.chatComposeDragOver,
                onComposeDragOver: () => state.setChatComposeDragOver(true),
                onComposeDragLeave: () => state.setChatComposeDragOver(false),
                onComposeDrop: (file) => state.handleComposeDrop(file),
                onSend: () => state.handleSendChat(),
                canAbort: Boolean(state.chatRunId),
                onAbort: () => void state.handleAbortChat(),
                onQueueRemove: (id) => state.removeQueuedMessage(id),
                onNewSession: () => state.handleSendChat("/new", { restoreDraft: true }),
                showNewMessages: state.chatNewMessagesBelow && !state.chatManualRefreshInFlight,
                onScrollToBottom: () => state.scrollToBottom(),
                // Sidebar props for tool output viewing
                sidebarOpen: state.sidebarOpen,
                sidebarContent: state.sidebarContent,
                sidebarError: state.sidebarError,
                splitRatio: state.splitRatio,
                onOpenSidebar: (content: string) => state.handleOpenSidebar(content),
                onCloseSidebar: () => state.handleCloseSidebar(),
                onSplitRatioChange: (ratio: number) => state.handleSplitRatioChange(ratio),
                assistantName: state.assistantName,
                assistantAvatar: state.assistantAvatar,
              })
            : nothing
        }

        ${
          state.tab === "config"
            ? renderConfig({
                raw: state.configRaw,
                originalRaw: state.configRawOriginal,
                valid: state.configValid,
                issues: state.configIssues,
                loading: state.configLoading,
                saving: state.configSaving,
                applying: state.configApplying,
                updating: state.updateRunning,
                connected: state.connected,
                schema: state.configSchema,
                schemaLoading: state.configSchemaLoading,
                uiHints: state.configUiHints,
                formMode: state.configFormMode,
                formValue: state.configForm,
                originalValue: state.configFormOriginal,
                searchQuery: state.configSearchQuery,
                activeSection: state.configActiveSection,
                activeSubsection: state.configActiveSubsection,
                onRawChange: (next) => {
                  state.configRaw = next;
                },
                onFormModeChange: (mode) => (state.configFormMode = mode),
                onFormPatch: (path, value) => updateConfigFormValue(state, path, value),
                onSearchChange: (query) => (state.configSearchQuery = query),
                onSectionChange: (section) => {
                  state.configActiveSection = section;
                  state.configActiveSubsection = null;
                },
                onSubsectionChange: (section) => (state.configActiveSubsection = section),
                onReload: () => loadConfig(state),
                onSave: () => saveConfig(state),
                onApply: () => applyConfig(state),
                onUpdate: () => runUpdate(state),
              })
            : nothing
        }

        ${
          state.tab === "admin-data"
            ? renderAdminData({
                host: { basePath: state.basePath ?? "", adminData: state.adminData },
                onLogin: async (password) => {
                  const h = state as unknown as AdminDataHost;
                  await adminLogin(h, password);
                  if (state.adminData.token) {
                    void loadLibraries(h);
                  }
                },
                onLogout: () => {
                  adminLogout(state as unknown as AdminDataHost);
                },
                onLibraryUpload: (file, name) => uploadLibrary(state as unknown as AdminDataHost, file, name),
                onLibraryView: (id) => loadLibraryData(state as unknown as AdminDataHost, id),
                onLibraryBack: () => {
                  state.adminData = { ...state.adminData, activeLibraryId: null, libraryData: [] };
                },
                onLibraryQueryInput: (q) => {
                  state.adminData = { ...state.adminData, libraryDataQuery: q };
                },
                onLibraryQueryApply: (libId) => loadLibraryData(state as unknown as AdminDataHost, libId),
                onLibraryRefresh: (libId) => loadLibraryData(state as unknown as AdminDataHost, libId),
                onLibraryFieldChange: (index, key, value) =>
                  patchLibraryRow(state as unknown as AdminDataHost, index, key, value),
                onLibrarySave: (libId, index) => {
                  const row = state.adminData.libraryData[index];
                  if (row) return saveLibraryRow(state as unknown as AdminDataHost, libId, row);
                },
                onLibraryDeleteRow: (libId, rowId) =>
                  deleteLibraryRow(state as unknown as AdminDataHost, libId, rowId),
                onLibraryAddRow: (libId) => addLibraryRow(state as unknown as AdminDataHost, libId),
                onLibraryDrop: (libId) => dropLibrary(state as unknown as AdminDataHost, libId),
                onLibraryWarningsDismiss: () => {
                  state.adminData = { ...state.adminData, libraryUploadWarnings: [] };
                },
              })
            : nothing
        }

        ${
          state.tab === "debug"
            ? renderDebug({
                loading: state.debugLoading,
                status: state.debugStatus,
                health: state.debugHealth,
                models: state.debugModels,
                heartbeat: state.debugHeartbeat,
                eventLog: state.eventLog,
                callMethod: state.debugCallMethod,
                callParams: state.debugCallParams,
                callResult: state.debugCallResult,
                callError: state.debugCallError,
                onCallMethodChange: (next) => (state.debugCallMethod = next),
                onCallParamsChange: (next) => (state.debugCallParams = next),
                onRefresh: () => loadDebug(state),
                onCall: () => callDebugMethod(state),
              })
            : nothing
        }

        ${
          state.tab === "logs"
            ? renderLogs({
                loading: state.logsLoading,
                error: state.logsError,
                file: state.logsFile,
                entries: state.logsEntries,
                filterText: state.logsFilterText,
                levelFilters: state.logsLevelFilters,
                autoFollow: state.logsAutoFollow,
                truncated: state.logsTruncated,
                onFilterTextChange: (next) => (state.logsFilterText = next),
                onLevelToggle: (level, enabled) => {
                  state.logsLevelFilters = { ...state.logsLevelFilters, [level]: enabled };
                },
                onToggleAutoFollow: (next) => (state.logsAutoFollow = next),
                onRefresh: () => loadLogs(state, { reset: true }),
                onExport: (lines, label) => state.exportLogs(lines, label),
                onScroll: (event) => state.handleLogsScroll(event),
              })
            : nothing
        }
      </main>
      ${renderExecApprovalPrompt(state)}
      ${renderGatewayUrlConfirmation(state)}
    </div>
  `;
}
