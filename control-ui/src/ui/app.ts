import { LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { i18n, I18nController, isSupportedLocale } from "../i18n/index.ts";
import {
  handleChannelConfigReload as handleChannelConfigReloadInternal,
  handleChannelConfigSave as handleChannelConfigSaveInternal,
  handleNostrProfileCancel as handleNostrProfileCancelInternal,
  handleNostrProfileEdit as handleNostrProfileEditInternal,
  handleNostrProfileFieldChange as handleNostrProfileFieldChangeInternal,
  handleNostrProfileImport as handleNostrProfileImportInternal,
  handleNostrProfileSave as handleNostrProfileSaveInternal,
  handleNostrProfileToggleAdvanced as handleNostrProfileToggleAdvancedInternal,
  handleWhatsAppLogout as handleWhatsAppLogoutInternal,
  handleWhatsAppStart as handleWhatsAppStartInternal,
  handleWhatsAppWait as handleWhatsAppWaitInternal,
} from "./app-channels.ts";
import {
  handleAbortChat as handleAbortChatInternal,
  handleSendChat as handleSendChatInternal,
  removeQueuedMessage as removeQueuedMessageInternal,
} from "./app-chat.ts";
import { DEFAULT_CRON_FORM, DEFAULT_LOG_LEVEL_FILTERS } from "./app-defaults.ts";
import type { EventLogEntry } from "./app-events.ts";
import { connectGateway as connectGatewayInternal } from "./app-gateway.ts";
import {
  handleConnected,
  handleDisconnected,
  handleFirstUpdated,
  handleUpdated,
} from "./app-lifecycle.ts";
import { initialAdminDataState } from "./controllers/admin-data.ts";
import { renderApp } from "./app-render.ts";
import {
  exportLogs as exportLogsInternal,
  handleChatScroll as handleChatScrollInternal,
  handleLogsScroll as handleLogsScrollInternal,
  resetChatScroll as resetChatScrollInternal,
  scheduleChatScroll as scheduleChatScrollInternal,
} from "./app-scroll.ts";
import {
  applySettings as applySettingsInternal,
  loadCron as loadCronInternal,
  loadFulfillDrafts as loadFulfillDraftsInternal,
  loadProcurementSuggestions as loadProcurementSuggestionsInternal,
  loadOverview as loadOverviewInternal,
  setTab as setTabInternal,
  setTheme as setThemeInternal,
  onPopState as onPopStateInternal,
} from "./app-settings.ts";
import {
  loadReplenishmentDrafts,
  loadReplenishmentDraftDetail,
  confirmReplenishmentDraft,
  createReplenishmentDraft,
  deleteReplenishmentDraft,
  type ReplenishmentInputLine,
} from "./controllers/procurement.ts";
import {
  resetToolStream as resetToolStreamInternal,
  resetToolRender as resetToolRenderInternal,
  type ToolStreamEntry,
  type CompactionStatus,
  type CandidatesPreviewItem,
  type ToolRenderItem,
  type ToolRenderPayload,
} from "./app-tool-stream.ts";
import type { AppViewState } from "./app-view-state.ts";
import { normalizeAssistantIdentity } from "./assistant-identity.ts";
import { loadAssistantIdentity as loadAssistantIdentityInternal } from "./controllers/assistant-identity.ts";
import type { DevicePairingList } from "./controllers/devices.ts";
import type { ExecApprovalRequest } from "./controllers/exec-approval.ts";
import type { ExecApprovalsFile, ExecApprovalsSnapshot } from "./controllers/exec-approvals.ts";
import { uploadChatFile as uploadChatFileController } from "./controllers/chat.ts";
import type { SkillMessage } from "./controllers/skills.ts";
import type { GatewayBrowserClient, GatewayHelloOk } from "./gateway.ts";
import type { Tab } from "./navigation.ts";
import { loadSettings, type UiSettings } from "./storage.ts";
import type { ResolvedTheme, ThemeMode } from "./theme.ts";
import type {
  AgentsListResult,
  AgentsFilesListResult,
  AgentIdentityResult,
  ConfigSnapshot,
  ConfigUiHints,
  CronJob,
  CronRunLogEntry,
  CronStatus,
  HealthSnapshot,
  LogEntry,
  LogLevel,
  PresenceEntry,
  ChannelsStatusSnapshot,
  SessionsListResult,
  SkillStatusReport,
  StatusSummary,
  NostrProfile,
  ReportRecord,
  ReportTask,
  ReportTaskConfig,
} from "./types.ts";
import {
  type ChatAttachment,
  type ChatQueueItem,
  type ChatUploadedFile,
  type CronFormState,
} from "./ui-types.ts";
import type { NostrProfileFormState } from "./views/channels.nostr-profile-form.ts";

declare global {
  interface Window {
    __OPENCLAW_CONTROL_UI_BASE_PATH__?: string;
  }
}

const bootAssistantIdentity = normalizeAssistantIdentity({});

function resolveOnboardingMode(): boolean {
  if (!window.location.search) {
    return false;
  }
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("onboarding");
  if (!raw) {
    return false;
  }
  const normalized = raw.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

@customElement("openclaw-app")
export class OpenClawApp extends LitElement {
  private i18nController = new I18nController(this);
  @state() settings: UiSettings = loadSettings();
  constructor() {
    super();
    if (isSupportedLocale(this.settings.locale)) {
      void i18n.setLocale(this.settings.locale);
    }
  }
  @state() password = "";
  @state() tab: Tab = "chat";
  @state() onboarding = resolveOnboardingMode();
  @state() connected = false;
  @state() theme: ThemeMode = this.settings.theme ?? "system";
  @state() themeResolved: ResolvedTheme = "dark";
  @state() hello: GatewayHelloOk | null = null;
  @state() lastError: string | null = null;
  @state() eventLog: EventLogEntry[] = [];
  private eventLogBuffer: EventLogEntry[] = [];
  private toolStreamSyncTimer: number | null = null;
  private sidebarCloseTimer: number | null = null;

  @state() assistantName = bootAssistantIdentity.name;
  @state() assistantAvatar = bootAssistantIdentity.avatar;
  @state() assistantAgentId = bootAssistantIdentity.agentId ?? null;

  @state() sessionKey = this.settings.sessionKey;
  @state() chatLoading = false;
  @state() chatSending = false;
  @state() chatMessage = "";
  @state() chatMessages: unknown[] = [];
  @state() chatToolMessages: unknown[] = [];
  @state() chatStream: string | null = null;
  @state() chatStreamStartedAt: number | null = null;
  @state() chatRunId: string | null = null;
  @state() compactionStatus: CompactionStatus | null = null;
  @state() chatAvatarUrl: string | null = null;
  @state() chatThinkingLevel: string | null = null;
  @state() chatQueue: ChatQueueItem[] = [];
  @state() chatAttachments: ChatAttachment[] = [];
  @state() chatUploadedFile: ChatUploadedFile | null = null;
  @state() chatComposeDragOver = false;
  @state() chatManualRefreshInFlight = false;
  // Sidebar state for tool output viewing
  @state() sidebarOpen = false;
  @state() sidebarContent: string | null = null;
  @state() sidebarError: string | null = null;
  @state() splitRatio = this.settings.splitRatio;

  @state() nodesLoading = false;
  @state() nodes: Array<Record<string, unknown>> = [];
  @state() devicesLoading = false;
  @state() devicesError: string | null = null;
  @state() devicesList: DevicePairingList | null = null;
  @state() execApprovalsLoading = false;
  @state() execApprovalsSaving = false;
  @state() execApprovalsDirty = false;
  @state() execApprovalsSnapshot: ExecApprovalsSnapshot | null = null;
  @state() execApprovalsForm: ExecApprovalsFile | null = null;
  @state() execApprovalsSelectedAgent: string | null = null;
  @state() execApprovalsTarget: "gateway" | "node" = "gateway";
  @state() execApprovalsTargetNodeId: string | null = null;
  @state() execApprovalQueue: ExecApprovalRequest[] = [];
  @state() execApprovalBusy = false;
  @state() execApprovalError: string | null = null;
  @state() pendingGatewayUrl: string | null = null;

  @state() configLoading = false;
  @state() configRaw = "{\n}\n";
  @state() configRawOriginal = "";
  @state() configValid: boolean | null = null;
  @state() configIssues: unknown[] = [];
  @state() configSaving = false;
  @state() configApplying = false;
  @state() updateRunning = false;
  @state() applySessionKey = this.settings.lastActiveSessionKey;
  @state() configSnapshot: ConfigSnapshot | null = null;
  @state() configSchema: unknown = null;
  @state() configSchemaVersion: string | null = null;
  @state() configSchemaLoading = false;
  @state() configUiHints: ConfigUiHints = {};
  @state() configForm: Record<string, unknown> | null = null;
  @state() configFormOriginal: Record<string, unknown> | null = null;
  @state() configFormDirty = false;
  @state() configFormMode: "form" | "raw" = "form";
  @state() configSearchQuery = "";
  @state() configActiveSection: string | null = null;
  @state() configActiveSubsection: string | null = null;

  @state() channelsLoading = false;
  @state() channelsSnapshot: ChannelsStatusSnapshot | null = null;
  @state() channelsError: string | null = null;
  @state() channelsLastSuccess: number | null = null;

  /** 涓氬姟鐭ヨ瘑椤碉紙鍘?Channels 浣嶏級锛歸anding_business_knowledge.md 鍐呭涓庡姞杞?淇濆瓨鐘舵€?*/
  @state() bkContent = "";
  @state() bkLoading = false;
  @state() bkError: string | null = null;
  @state() bkSaving = false;
  @state() bkLastSuccess: number | null = null;
  @state() bkDependentFiles: { mapping_table: string; price_library: string } | null = null;
  @state() whatsappLoginMessage: string | null = null;
  @state() whatsappLoginQrDataUrl: string | null = null;
  @state() whatsappLoginConnected: boolean | null = null;
  @state() whatsappBusy = false;
  @state() nostrProfileFormState: NostrProfileFormState | null = null;
  @state() nostrProfileAccountId: string | null = null;

  @state() presenceLoading = false;
  @state() presenceEntries: PresenceEntry[] = [];
  @state() presenceError: string | null = null;
  @state() presenceStatus: string | null = null;

  @state() oosLoading = false;
  @state() oosError: string | null = null;
  @state() oosStats: import("./types.js").OosStats | null = null;
  @state() oosList: import("./types.js").OosRecord[] = [];
  @state() oosByFile: import("./types.js").OosByFileRow[] = [];
  @state() oosByTime: import("./types.js").OosByTimeRow[] = [];
  @state() oosShowAddForm = false;
  @state() oosDb: "postgres" | "sqlite" | null = null;

  @state() shortageLoading = false;
  @state() shortageError: string | null = null;
  @state() shortageStats: import("./types.js").ShortageStats | null = null;
  @state() shortageList: import("./types.js").ShortageRecord[] = [];
  @state() shortageByFile: import("./types.js").ShortageByFileRow[] = [];
  @state() shortageByTime: import("./types.js").ShortageByTimeRow[] = [];
  @state() shortageShowAddForm = false;
  @state() shortageDb: "postgres" | "sqlite" | null = null;

  /** Overview 椤电敤锛氬揩閫熷睍绀烘棤璐?缂鸿揣缁熻 */
  @state() overviewOosStats: import("./types.js").OosStats | null = null;
  @state() overviewOosError: string | null = null;
  @state() overviewShortageStats: import("./types.js").ShortageStats | null = null;
  @state() overviewShortageError: string | null = null;
  @state() dashboardLoading = false;
  @state() dashboardError: string | null = null;
  @state() quotationStats: import("./types.js").QuotationDraftStats | null = null;
  @state() dashboardOosByTime: import("./types.js").OosByTimeRow[] = [];
  @state() dashboardShortageByTime: import("./types.js").ShortageByTimeRow[] = [];

  @state() agentsLoading = false;
  @state() agentsList: AgentsListResult | null = null;
  @state() agentsError: string | null = null;
  @state() agentsSelectedId: string | null = null;
  @state() agentsPanel: "overview" | "tools" = "overview";
  @state() agentInfo: import("./types.js").AgentInfo | null = null;
  @state() agentInfoLoading = false;
  @state() agentInfoError: string | null = null;
  @state() agentFilesLoading = false;
  @state() agentFilesError: string | null = null;
  @state() agentFilesList: AgentsFilesListResult | null = null;
  @state() agentFileContents: Record<string, string> = {};
  @state() agentFileDrafts: Record<string, string> = {};
  @state() agentFileActive: string | null = null;
  @state() agentFileSaving = false;
  @state() agentIdentityLoading = false;
  @state() agentIdentityError: string | null = null;
  @state() agentIdentityById: Record<string, AgentIdentityResult> = {};
  @state() agentSkillsLoading = false;
  @state() agentSkillsError: string | null = null;
  @state() agentSkillsReport: SkillStatusReport | null = null;
  @state() agentSkillsAgentId: string | null = null;

  @state() sessionsLoading = false;
  @state() sessionsResult: SessionsListResult | null = null;
  @state() sessionsError: string | null = null;
  @state() sessionsFilterActive = "";
  @state() sessionsFilterLimit = "120";
  @state() sessionsIncludeGlobal = true;
  @state() sessionsIncludeUnknown = false;

  @state() usageLoading = false;
  @state() usageResult: import("./types.js").SessionsUsageResult | null = null;
  @state() usageCostSummary: import("./types.js").CostUsageSummary | null = null;
  @state() usageError: string | null = null;
  usageRequestSeq = 0;
  usageTimeSeriesRequestSeq = 0;
  usageSessionLogsRequestSeq = 0;
  @state() usageStartDate = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();
  @state() usageEndDate = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();
  @state() usageSelectedSessions: string[] = [];
  @state() usageSelectedDays: string[] = [];
  @state() usageSelectedHours: number[] = [];
  @state() usageChartMode: "tokens" | "cost" = "tokens";
  @state() usageDailyChartMode: "total" | "by-type" = "by-type";
  @state() usageTimeSeriesMode: "cumulative" | "per-turn" = "per-turn";
  @state() usageTimeSeriesBreakdownMode: "total" | "by-type" = "by-type";
  @state() usageTimeSeries: import("./types.js").SessionUsageTimeSeries | null = null;
  @state() usageTimeSeriesLoading = false;
  @state() usageTimeSeriesCursorStart: number | null = null;
  @state() usageTimeSeriesCursorEnd: number | null = null;
  @state() usageSessionLogs: import("./views/usage.js").SessionLogEntry[] | null = null;
  @state() usageSessionLogsLoading = false;
  @state() usageSessionLogsExpanded = false;
  // Applied query (used to filter the already-loaded sessions list client-side).
  @state() usageQuery = "";
  // Draft query text (updates immediately as the user types; applied via debounce or "Search").
  @state() usageQueryDraft = "";
  @state() usageSessionSort: "tokens" | "cost" | "recent" | "messages" | "errors" = "recent";
  @state() usageSessionSortDir: "desc" | "asc" = "desc";
  @state() usageRecentSessions: string[] = [];
  @state() usageTimeZone: "local" | "utc" = "local";
  @state() usageContextExpanded = false;
  @state() usageHeaderPinned = false;
  @state() usageSessionsTab: "all" | "recent" = "all";
  @state() usageVisibleColumns: string[] = [
    "channel",
    "agent",
    "provider",
    "model",
    "messages",
    "tools",
    "errors",
    "duration",
  ];
  @state() usageLogFilterRoles: import("./views/usage.js").SessionLogRole[] = [];
  @state() usageLogFilterTools: string[] = [];
  @state() usageLogFilterHasTools = false;
  @state() usageLogFilterQuery = "";

  // Non-reactive (don鈥檛 trigger renders just for timer bookkeeping).
  usageQueryDebounceTimer: number | null = null;

  @state() workFilePaths: string[] = [];
  @state() workOriginalFileNamesByPath: Record<string, string> = {};
  @state() workRunning = false;
  /** 鎵ц涓椂寰幆灞曠ず鐨勯樁娈?0=璇嗗埆琛?1=鏌ヤ环鏍间笌搴撳瓨 2=濉〃 */
  @state() workProgressStage = 0;
  private _workProgressInterval: ReturnType<typeof setInterval> | null = null;
  @state() workRunStatus: import("./controllers/work.js").WorkRunStatus = "idle";
  @state() workRunId: string | null = null;
  @state() workPendingChoices: import("./controllers/work.js").WorkPendingChoice[] = [];
  @state() workSelections: Record<string, string> = {};
  @state() workResult: { success?: boolean; answer?: string; trace?: unknown[]; error?: string } | null = null;
  @state() workError: string | null = null;
  @state() workCustomerLevel = "B_QUOTE";
  @state() workDoRegisterOos = false;
  @state() workPendingQuotationDraft: import("./controllers/work.js").PendingQuotationDraft | null = null;
  @state() workQuotationDraftSaveStatus: import("./controllers/work.js").WorkQuotationDraftSaveStatus | null = null;
  @state() workTextInput = "";
  @state() workTextGenerating = false;
  @state() workTextError: string | null = null;
  @state() workPriceLevelOptions: Array<{ value: string; label: string }> = [];

  @state() cronLoading = false;
  @state() cronJobs: CronJob[] = [];
  @state() cronStatus: CronStatus | null = null;
  @state() cronError: string | null = null;
  @state() cronForm: CronFormState = { ...DEFAULT_CRON_FORM };
  @state() cronRunsJobId: string | null = null;
  @state() cronRuns: CronRunLogEntry[] = [];
  @state() cronBusy = false;

  @state() fulfillDraftsLoading = false;
  @state() fulfillDraftsError: string | null = null;
  @state() fulfillDrafts: import("./types.js").QuotationDraftListItem[] = [];
  @state() fulfillDetail: import("./types.js").QuotationDraftDetail | null = null;
  @state() fulfillDetailId: number | null = null;
  @state() fulfillConfirmBusy = false;
  @state() fulfillConfirmResult: { order_id?: string; message?: string } | null = null;
  @state() fulfillFilterQuery = "";
  @state() fulfillSortBy: "created_at" | "draft_no" | "name" = "created_at";
  @state() fulfillSortDir: "asc" | "desc" = "desc";
  @state() fulfillPage = 1;
  @state() fulfillPageSize = 10;

  @state() procurementLoading = false;
  @state() procurementError: string | null = null;
  @state() procurementSuggestions: import("./types.js").ShortageRecord[] = [];
  @state() procurementSelectedKeys: string[] = [];
  @state() procurementApprovedKeys: string[] = [];
  @state() procurementApproveBusy = false;
  @state() procurementApproveResult: { approved_count?: number; message?: string } | null = null;
  @state() procurementFilterQuery = "";
  @state() procurementSortBy: "uploaded_at" | "shortfall" | "count" | "product_name" = "uploaded_at";
  @state() procurementSortDir: "asc" | "desc" = "desc";
  @state() procurementPage = 1;
  @state() procurementPageSize = 10;

  @state() replenishmentDrafts: import("./types.js").ReplenishmentDraftListItem[] = [];
  @state() replenishmentDetail: import("./types.js").ReplenishmentDraftDetail | null = null;
  @state() replenishmentDetailId: number | null = null;
  @state() replenishmentLoading = false;
  @state() replenishmentError: string | null = null;
  @state() replenishmentConfirmBusy = false;
  @state() replenishmentConfirmResult: { executed?: number; message?: string } | null = null;
  @state() replenishmentInputLines: ReplenishmentInputLine[] = [{ product_or_code: "", quantity: 0 }];
  @state() replenishmentCreateBusy = false;

  @state() skillsLoading = false;
  @state() skillsReport: SkillStatusReport | null = null;
  @state() skillsError: string | null = null;
  @state() skillsFilter = "";
  @state() skillEdits: Record<string, string> = {};
  @state() skillsBusyKey: string | null = null;
  @state() skillMessages: Record<string, SkillMessage> = {};
  @state() reportsLoading = false;
  @state() reportsError: string | null = null;
  @state() reportsTasks: ReportTask[] = [];
  @state() reportsRecords: ReportRecord[] = [];
  @state() reportsAdminToken = "";
  @state() reportsEditingTaskId: string | null = null;
  @state() reportsEditForm: ReportTaskConfig = {};
  @state() reportDetail: ReportRecord | null = null;
  @state() reportDetailLoading = false;
  @state() selectedRecordId: number | null = null;
  @state() reportsCopyJustDone = false;
  @state() reportsDetailTab: "data" | "analysis" = "data";

  @state() debugLoading = false;
  @state() debugStatus: StatusSummary | null = null;
  @state() debugHealth: HealthSnapshot | null = null;
  @state() debugModels: unknown[] = [];
  @state() debugHeartbeat: unknown = null;
  @state() debugCallMethod = "";
  @state() debugCallParams = "{}";
  @state() debugCallResult: string | null = null;
  @state() debugCallError: string | null = null;

  @state() logsLoading = false;
  @state() logsError: string | null = null;
  @state() logsFile: string | null = null;
  @state() logsEntries: LogEntry[] = [];
  @state() logsFilterText = "";
  @state() logsLevelFilters: Record<LogLevel, boolean> = {
    ...DEFAULT_LOG_LEVEL_FILTERS,
  };
  @state() logsAutoFollow = true;
  @state() logsTruncated = false;
  @state() logsCursor: number | null = null;
  @state() logsLastFetchAt: number | null = null;
  @state() logsLimit = 500;
  @state() logsMaxBytes = 250_000;
  @state() logsAtBottom = true;
  @state() adminData = initialAdminDataState();

  client: GatewayBrowserClient | null = null;
  private chatScrollFrame: number | null = null;
  private chatScrollTimeout: number | null = null;
  private chatHasAutoScrolled = false;
  private chatUserNearBottom = true;
  @state() chatNewMessagesBelow = false;
  private nodesPollInterval: number | null = null;
  private logsPollInterval: number | null = null;
  private debugPollInterval: number | null = null;
  private logsScrollFrame: number | null = null;
  private toolStreamById = new Map<string, ToolStreamEntry>();
  private toolStreamOrder: string[] = [];
  @state() toolRenderData: ToolRenderPayload | null = null;
  @state() toolRenderSeq: number | null = null;
  @state() toolRenderItems: ToolRenderItem[] = [];
  @state() candidatePreviews: CandidatesPreviewItem[] = [];
  refreshSessionsAfterChat = new Set<string>();
  basePath = "";
  private popStateHandler = () =>
    onPopStateInternal(this as unknown as Parameters<typeof onPopStateInternal>[0]);
  private themeMedia: MediaQueryList | null = null;
  private themeMediaHandler: ((event: MediaQueryListEvent) => void) | null = null;
  private topbarObserver: ResizeObserver | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    handleConnected(this as unknown as Parameters<typeof handleConnected>[0]);
  }

  protected firstUpdated() {
    handleFirstUpdated(this as unknown as Parameters<typeof handleFirstUpdated>[0]);
  }

  disconnectedCallback() {
    handleDisconnected(this as unknown as Parameters<typeof handleDisconnected>[0]);
    super.disconnectedCallback();
  }

  protected updated(changed: Map<PropertyKey, unknown>) {
    if (changed.has("workRunning")) {
      if (this.workRunning) {
        // 首次 run 显示阶段 0；resume 显示阶段 1。
        this.workProgressStage = this.workRunStatus === "resuming" ? 1 : 0;
        if (this._workProgressInterval != null) {
          clearInterval(this._workProgressInterval);
          this._workProgressInterval = null;
        }
      } else {
        if (this._workProgressInterval != null) {
          clearInterval(this._workProgressInterval);
          this._workProgressInterval = null;
        }
        if (this.workRunStatus === "done") {
          this.workProgressStage = 2;
        }
      }
    }
    handleUpdated(this as unknown as Parameters<typeof handleUpdated>[0], changed);
  }

  connect() {
    connectGatewayInternal(this as unknown as Parameters<typeof connectGatewayInternal>[0]);
  }

  handleChatScroll(event: Event) {
    handleChatScrollInternal(
      this as unknown as Parameters<typeof handleChatScrollInternal>[0],
      event,
    );
  }

  handleLogsScroll(event: Event) {
    handleLogsScrollInternal(
      this as unknown as Parameters<typeof handleLogsScrollInternal>[0],
      event,
    );
  }

  exportLogs(lines: string[], label: string) {
    exportLogsInternal(lines, label);
  }

  resetToolStream() {
    resetToolStreamInternal(this as unknown as Parameters<typeof resetToolStreamInternal>[0]);
  }

  resetToolRender() {
    resetToolRenderInternal(this as unknown as Parameters<typeof resetToolRenderInternal>[0]);
  }

  resetChatScroll() {
    resetChatScrollInternal(this as unknown as Parameters<typeof resetChatScrollInternal>[0]);
  }

  scrollToBottom(opts?: { smooth?: boolean }) {
    resetChatScrollInternal(this as unknown as Parameters<typeof resetChatScrollInternal>[0]);
    scheduleChatScrollInternal(
      this as unknown as Parameters<typeof scheduleChatScrollInternal>[0],
      true,
      Boolean(opts?.smooth),
    );
  }

  async loadAssistantIdentity() {
    await loadAssistantIdentityInternal(this);
  }

  applySettings(next: UiSettings) {
    applySettingsInternal(this as unknown as Parameters<typeof applySettingsInternal>[0], next);
  }

  setTab(next: Tab) {
    setTabInternal(this as unknown as Parameters<typeof setTabInternal>[0], next);
  }

  setTheme(next: ThemeMode, context?: Parameters<typeof setThemeInternal>[2]) {
    setThemeInternal(this as unknown as Parameters<typeof setThemeInternal>[0], next, context);
  }

  async loadOverview() {
    await loadOverviewInternal(this as unknown as Parameters<typeof loadOverviewInternal>[0]);
  }

  async loadCron() {
    await loadCronInternal(this as unknown as Parameters<typeof loadCronInternal>[0]);
  }

  async loadFulfillDrafts() {
    await loadFulfillDraftsInternal(this as unknown as Parameters<typeof loadFulfillDraftsInternal>[0]);
  }

  async loadProcurementSuggestions() {
    await loadProcurementSuggestionsInternal(this as unknown as Parameters<typeof loadProcurementSuggestionsInternal>[0]);
  }

  async loadProcurementReplenishment() {
    await loadReplenishmentDrafts(this as unknown as Parameters<typeof loadReplenishmentDrafts>[0]);
  }

  async loadProcurementReplenishmentDetail(draftId: number) {
    await loadReplenishmentDraftDetail(
      this as unknown as Parameters<typeof loadReplenishmentDraftDetail>[0],
      draftId,
    );
  }

  async confirmProcurementReplenishment(draftId: number) {
    await confirmReplenishmentDraft(
      this as unknown as Parameters<typeof confirmReplenishmentDraft>[0],
      draftId,
    );
  }

  async deleteProcurementReplenishmentDraft(draftId: number) {
    await deleteReplenishmentDraft(
      this as unknown as Parameters<typeof deleteReplenishmentDraft>[0],
      draftId,
    );
  }

  onReplenishmentLineChange(index: number, field: "product_or_code" | "quantity", value: string | number) {
    const next = this.replenishmentInputLines.slice();
    if (index < 0 || index >= next.length) return;
    next[index] = { ...next[index], [field]: value };
    this.replenishmentInputLines = next;
  }

  onReplenishmentAddLine() {
    this.replenishmentInputLines = [...this.replenishmentInputLines, { product_or_code: "", quantity: 0 }];
  }

  onReplenishmentRemoveLine(index: number) {
    const next = this.replenishmentInputLines.filter((_, i) => i !== index);
    this.replenishmentInputLines = next.length > 0 ? next : [{ product_or_code: "", quantity: 0 }];
  }

  async createProcurementReplenishmentDraft() {
    if (this.replenishmentCreateBusy) return;
    this.replenishmentCreateBusy = true;
    this.replenishmentError = null;
    try {
      const result = await createReplenishmentDraft(
        this as unknown as Parameters<typeof createReplenishmentDraft>[0],
        this.replenishmentInputLines,
      );
      if (result) {
        this.replenishmentInputLines = [{ product_or_code: "", quantity: 0 }];
        await this.loadProcurementReplenishment();
        await this.loadProcurementReplenishmentDetail(result.id);
      }
    } finally {
      this.replenishmentCreateBusy = false;
    }
  }

  async handleAbortChat() {
    await handleAbortChatInternal(this as unknown as Parameters<typeof handleAbortChatInternal>[0]);
  }

  removeQueuedMessage(id: string) {
    removeQueuedMessageInternal(
      this as unknown as Parameters<typeof removeQueuedMessageInternal>[0],
      id,
    );
  }

  async handleUploadChatFile(file: File): Promise<void> {
    try {
      const res = await uploadChatFileController(this.basePath, file);
      this.chatUploadedFile = res;
      this.lastError = null;
    } catch (err) {
      this.lastError = err instanceof Error ? err.message : String(err);
    }
  }

  clearChatUploadedFile(): void {
    this.chatUploadedFile = null;
  }

  setChatComposeDragOver(over: boolean): void {
    this.chatComposeDragOver = over;
  }

  async handleComposeDrop(file: File): Promise<void> {
    this.chatComposeDragOver = false;
    await this.handleUploadChatFile(file);
  }

  async handleSendChat(
    messageOverride?: string,
    opts?: Parameters<typeof handleSendChatInternal>[2],
  ) {
    await handleSendChatInternal(
      this as unknown as Parameters<typeof handleSendChatInternal>[0],
      messageOverride,
      opts,
    );
  }

  async handleWhatsAppStart(force: boolean) {
    await handleWhatsAppStartInternal(this, force);
  }

  async handleWhatsAppWait() {
    await handleWhatsAppWaitInternal(this);
  }

  async handleWhatsAppLogout() {
    await handleWhatsAppLogoutInternal(this);
  }

  async handleChannelConfigSave() {
    await handleChannelConfigSaveInternal(this);
  }

  async handleChannelConfigReload() {
    await handleChannelConfigReloadInternal(this);
  }

  handleNostrProfileEdit(accountId: string, profile: NostrProfile | null) {
    handleNostrProfileEditInternal(this, accountId, profile);
  }

  handleNostrProfileCancel() {
    handleNostrProfileCancelInternal(this);
  }

  handleNostrProfileFieldChange(field: keyof NostrProfile, value: string) {
    handleNostrProfileFieldChangeInternal(this, field, value);
  }

  async handleNostrProfileSave() {
    await handleNostrProfileSaveInternal(this);
  }

  async handleNostrProfileImport() {
    await handleNostrProfileImportInternal(this);
  }

  handleNostrProfileToggleAdvanced() {
    handleNostrProfileToggleAdvancedInternal(this);
  }

  async handleExecApprovalDecision(decision: "allow-once" | "allow-always" | "deny") {
    const active = this.execApprovalQueue[0];
    if (!active || !this.client || this.execApprovalBusy) {
      return;
    }
    this.execApprovalBusy = true;
    this.execApprovalError = null;
    try {
      await this.client.request("exec.approval.resolve", {
        id: active.id,
        decision,
      });
      this.execApprovalQueue = this.execApprovalQueue.filter((entry) => entry.id !== active.id);
    } catch (err) {
      this.execApprovalError = `Exec approval failed: ${String(err)}`;
    } finally {
      this.execApprovalBusy = false;
    }
  }

  handleGatewayUrlConfirm() {
    const nextGatewayUrl = this.pendingGatewayUrl;
    if (!nextGatewayUrl) {
      return;
    }
    this.pendingGatewayUrl = null;
    applySettingsInternal(this as unknown as Parameters<typeof applySettingsInternal>[0], {
      ...this.settings,
      gatewayUrl: nextGatewayUrl,
    });
    this.connect();
  }

  handleGatewayUrlCancel() {
    this.pendingGatewayUrl = null;
  }

  // Sidebar handlers for tool output viewing
  handleOpenSidebar(content: string) {
    if (this.sidebarCloseTimer != null) {
      window.clearTimeout(this.sidebarCloseTimer);
      this.sidebarCloseTimer = null;
    }
    this.sidebarContent = content;
    this.sidebarError = null;
    this.sidebarOpen = true;
  }

  handleCloseSidebar() {
    this.sidebarOpen = false;
    // Clear content after transition
    if (this.sidebarCloseTimer != null) {
      window.clearTimeout(this.sidebarCloseTimer);
    }
    this.sidebarCloseTimer = window.setTimeout(() => {
      if (this.sidebarOpen) {
        return;
      }
      this.sidebarContent = null;
      this.sidebarError = null;
      this.sidebarCloseTimer = null;
    }, 200);
  }

  handleSplitRatioChange(ratio: number) {
    const newRatio = Math.max(0.4, Math.min(0.7, ratio));
    this.splitRatio = newRatio;
    this.applySettings({ ...this.settings, splitRatio: newRatio });
  }

  render() {
    return renderApp(this as unknown as AppViewState);
  }
}
