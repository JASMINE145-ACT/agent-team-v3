import { truncateText } from "./format.ts";

const TOOL_STREAM_LIMIT = 50;
const TOOL_STREAM_THROTTLE_MS = 80;
const TOOL_OUTPUT_CHAR_LIMIT = 120_000;

// Keep in sync with backend/plugins/jagent/extension.py::RENDERED_MARKER
export const RENDERED_MARKER = "[已渲染到前端]";

export type AgentEventPayload = {
  runId: string;
  seq: number;
  stream: string;
  ts: number;
  sessionKey?: string;
  data: Record<string, unknown>;
};

export type ToolStreamEntry = {
  toolCallId: string;
  runId: string;
  sessionKey?: string;
  name: string;
  args?: unknown;
  output?: string;
  startedAt: number;
  updatedAt: number;
  message: Record<string, unknown>;
};

type ToolStreamHost = {
  sessionKey: string;
  chatRunId: string | null;
  toolStreamById: Map<string, ToolStreamEntry>;
  toolStreamOrder: string[];
  chatToolMessages: Record<string, unknown>[];
  toolStreamSyncTimer: number | null;
};

function extractToolOutputText(value: unknown): string | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  const record = value as Record<string, unknown>;
  if (typeof record.text === "string") {
    return record.text;
  }
  const content = record.content;
  if (!Array.isArray(content)) {
    return null;
  }
  const parts = content
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }
      const entry = item as Record<string, unknown>;
      if (entry.type === "text" && typeof entry.text === "string") {
        return entry.text;
      }
      return null;
    })
    .filter((part): part is string => Boolean(part));
  if (parts.length === 0) {
    return null;
  }
  return parts.join("\n");
}

function formatToolOutput(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  const contentText = extractToolOutputText(value);
  let text: string;
  if (typeof value === "string") {
    text = value;
  } else if (contentText) {
    text = contentText;
  } else {
    try {
      text = JSON.stringify(value, null, 2);
    } catch {
      // oxlint-disable typescript/no-base-to-string
      text = String(value);
    }
  }
  const truncated = truncateText(text, TOOL_OUTPUT_CHAR_LIMIT);
  if (!truncated.truncated) {
    return truncated.text;
  }
  return `${truncated.text}\n\n鈥?truncated (${truncated.total} chars, showing first ${truncated.text.length}).`;
}

function buildToolStreamMessage(entry: ToolStreamEntry): Record<string, unknown> {
  const content: Array<Record<string, unknown>> = [];
  content.push({
    type: "toolcall",
    name: entry.name,
    arguments: entry.args ?? {},
  });
  if (entry.output) {
    content.push({
      type: "toolresult",
      name: entry.name,
      text: entry.output,
    });
  }
  return {
    role: "assistant",
    toolCallId: entry.toolCallId,
    runId: entry.runId,
    content,
    timestamp: entry.startedAt,
  };
}

function trimToolStream(host: ToolStreamHost) {
  if (host.toolStreamOrder.length <= TOOL_STREAM_LIMIT) {
    return;
  }
  const overflow = host.toolStreamOrder.length - TOOL_STREAM_LIMIT;
  const removed = host.toolStreamOrder.splice(0, overflow);
  for (const id of removed) {
    host.toolStreamById.delete(id);
  }
}

function syncToolStreamMessages(host: ToolStreamHost) {
  host.chatToolMessages = host.toolStreamOrder
    .map((id) => host.toolStreamById.get(id)?.message)
    .filter((msg): msg is Record<string, unknown> => Boolean(msg));
}

export function flushToolStreamSync(host: ToolStreamHost) {
  if (host.toolStreamSyncTimer != null) {
    clearTimeout(host.toolStreamSyncTimer);
    host.toolStreamSyncTimer = null;
  }
  syncToolStreamMessages(host);
}

export function scheduleToolStreamSync(host: ToolStreamHost, force = false) {
  if (force) {
    flushToolStreamSync(host);
    return;
  }
  if (host.toolStreamSyncTimer != null) {
    return;
  }
  host.toolStreamSyncTimer = window.setTimeout(
    () => flushToolStreamSync(host),
    TOOL_STREAM_THROTTLE_MS,
  );
}

export function resetToolStream(host: ToolStreamHost) {
  host.toolStreamById.clear();
  host.toolStreamOrder = [];
  host.chatToolMessages = [];
  flushToolStreamSync(host);
}

export function resetToolRender(host: ToolRenderHost) {
  host.toolRenderData = null;
  host.toolRenderSeq = null;
  host.toolRenderItems = [];
  host.candidatePreviews = [];
  // Intentionally do NOT clear ocrResultCards here: the same function runs when a
  // chat run ends (final), and OCR cards must remain visible for that turn. Clear
  // ocrResultCards only when the user starts a new send, reconnects, or switches session.
}

export type CompactionStatus = {
  active: boolean;
  startedAt: number | null;
  completedAt: number | null;
};

type CompactionHost = ToolStreamHost & {
  compactionStatus?: CompactionStatus | null;
  compactionClearTimer?: number | null;
};

const COMPACTION_TOAST_DURATION_MS = 5000;

export function handleCompactionEvent(host: CompactionHost, payload: AgentEventPayload) {
  const data = payload.data ?? {};
  const phase = typeof data.phase === "string" ? data.phase : "";

  // Clear any existing timer
  if (host.compactionClearTimer != null) {
    window.clearTimeout(host.compactionClearTimer);
    host.compactionClearTimer = null;
  }

  if (phase === "start") {
    host.compactionStatus = {
      active: true,
      startedAt: Date.now(),
      completedAt: null,
    };
  } else if (phase === "end") {
    host.compactionStatus = {
      active: false,
      startedAt: host.compactionStatus?.startedAt ?? null,
      completedAt: Date.now(),
    };
    // Auto-clear the toast after duration
    host.compactionClearTimer = window.setTimeout(() => {
      host.compactionStatus = null;
      host.compactionClearTimer = null;
    }, COMPACTION_TOAST_DURATION_MS);
  }
}

export type ToolRenderPayload = {
  formatted_response: string;
  chosen: Record<string, unknown>;
  chosen_index: number;
  match_source: string;
  selection_reasoning: string;
  batch_mode?: boolean;
  resolved_items?: Array<Record<string, unknown>>;
  pending_items?: Array<Record<string, unknown>>;
  unmatched_items?: Array<Record<string, unknown>>;
};

export type ToolRenderItem = {
  id: string;
  runId: string;
  seq: number;
  ts: number;
  sessionKey?: string;
  payload: ToolRenderPayload;
};

export type CandidatesPreviewItem = {
  id: string;
  runId: string;
  keywords: string;
  candidates: Array<{ code: string; matched_name: string; unit_price: number; source?: string }>;
  match_source: string;
};

export type OcrResultCard = {
  id: string;
  text: string;
  createdAt: number;
};

export type ToolRenderHost = ToolStreamHost & {
  toolRenderData?: ToolRenderPayload | null;
  toolRenderSeq?: number | null;
  toolRenderItems?: ToolRenderItem[];
  candidatePreviews?: CandidatesPreviewItem[];
  ocrResultCards?: OcrResultCard[];
};

function popCandidatePreviewForRun(host: ToolRenderHost, runId: string): void {
  if (!Array.isArray(host.candidatePreviews) || host.candidatePreviews.length === 0) {
    return;
  }
  const idx = host.candidatePreviews.findIndex((p) => p.runId === runId);
  if (idx === -1) {
    return;
  }
  host.candidatePreviews = [...host.candidatePreviews.slice(0, idx), ...host.candidatePreviews.slice(idx + 1)];
}

export function handleCandidatesEvent(host: ToolRenderHost, payload: AgentEventPayload): void {
  const data = payload.data ?? {};
  const candidates = Array.isArray(data.candidates) ? data.candidates : [];
  if (candidates.length === 0) {
    return;
  }

  if (!Array.isArray(host.candidatePreviews)) {
    host.candidatePreviews = [];
  }
  const counter = host.candidatePreviews.length;
  host.candidatePreviews = [
    ...host.candidatePreviews,
    {
      id: `${payload.runId}:candidates:${counter}`,
      runId: payload.runId,
      keywords: typeof data.keywords === "string" ? data.keywords : "",
      candidates: candidates as CandidatesPreviewItem["candidates"],
      match_source: typeof data.match_source === "string" ? data.match_source : "",
    },
  ];
}

export function handleToolRenderEvent(host: ToolRenderHost, payload: AgentEventPayload) {
  const data = payload.data ?? {};

  // Render as long as formatted markdown exists; other fields are best-effort.
  if (typeof data.formatted_response !== "string" || data.formatted_response.trim().length === 0) {
    console.warn("[tool_render] malformed payload:", data);
    return;
  }

  const chosenIndexRaw = data.chosen_index;
  let chosenIndex = 0;
  if (typeof chosenIndexRaw === "number" && Number.isFinite(chosenIndexRaw)) {
    chosenIndex = chosenIndexRaw;
  } else if (typeof chosenIndexRaw === "string" && chosenIndexRaw.trim()) {
    const n = Number(chosenIndexRaw);
    chosenIndex = Number.isFinite(n) ? n : 0;
  }

  const matchSource = typeof data.match_source === "string" ? data.match_source : "";

  host.toolRenderData = {
    formatted_response: data.formatted_response,
    chosen: (data.chosen ?? {}) as Record<string, unknown>,
    chosen_index: chosenIndex,
    match_source: matchSource,
    selection_reasoning: typeof data.selection_reasoning === "string" ? data.selection_reasoning : "",
    batch_mode: Boolean(data.batch_mode),
    resolved_items: Array.isArray(data.resolved_items) ? (data.resolved_items as Array<Record<string, unknown>>) : [],
    pending_items: Array.isArray(data.pending_items) ? (data.pending_items as Array<Record<string, unknown>>) : [],
    unmatched_items: Array.isArray(data.unmatched_items) ? (data.unmatched_items as Array<Record<string, unknown>>) : [],
  };
  host.toolRenderSeq = payload.seq;
  if (!Array.isArray(host.toolRenderItems)) {
    host.toolRenderItems = [];
  }
  const itemId = `${payload.runId}:${payload.seq}`;
  const nextItem: ToolRenderItem = {
    id: itemId,
    runId: payload.runId,
    seq: payload.seq,
    ts: typeof payload.ts === "number" ? payload.ts : Date.now(),
    sessionKey: typeof payload.sessionKey === "string" ? payload.sessionKey : undefined,
    payload: host.toolRenderData,
  };
  const existing = host.toolRenderItems.find((x) => x.id === itemId);
  if (existing) {
    existing.payload = nextItem.payload;
    existing.ts = nextItem.ts;
    existing.sessionKey = nextItem.sessionKey;
    popCandidatePreviewForRun(host, payload.runId);
    return;
  }
  const dedup = host.toolRenderItems.find(
    (x) =>
      x.runId === nextItem.runId &&
      x.payload.formatted_response === nextItem.payload.formatted_response,
  );
  if (dedup) {
    dedup.seq = nextItem.seq;
    dedup.ts = nextItem.ts;
    dedup.sessionKey = nextItem.sessionKey;
    dedup.payload = nextItem.payload;
    popCandidatePreviewForRun(host, payload.runId);
    return;
  }
  host.toolRenderItems.push(nextItem);
  popCandidatePreviewForRun(host, payload.runId);
}

export function handleAgentEvent(host: ToolStreamHost, payload?: AgentEventPayload) {
  if (!payload) {
    return;
  }

  // Handle compaction events
  if (payload.stream === "compaction") {
    handleCompactionEvent(host as CompactionHost, payload);
    return;
  }

  // Candidates preview (after fuzzy match, before LLM selection)
  if (payload.stream === "tool_candidates") {
    const sessionKey = typeof payload.sessionKey === "string" ? payload.sessionKey : undefined;
    if (sessionKey && sessionKey !== host.sessionKey) {
      return;
    }
    if (!sessionKey && host.chatRunId && payload.runId !== host.chatRunId) {
      return;
    }
    if (host.chatRunId && payload.runId !== host.chatRunId) {
      return;
    }
    if (!host.chatRunId) {
      return;
    }
    handleCandidatesEvent(host as ToolRenderHost, payload);
    return;
  }

  // Handle tool_render SSE events
  if (payload.stream === "tool_render") {
    const sessionKey = typeof payload.sessionKey === "string" ? payload.sessionKey : undefined;
    if (sessionKey && sessionKey !== host.sessionKey) {
      return;
    }
    if (!sessionKey && host.chatRunId && payload.runId !== host.chatRunId) {
      return;
    }
    if (host.chatRunId && payload.runId !== host.chatRunId) {
      return;
    }
    if (!host.chatRunId) {
      return;
    }
    handleToolRenderEvent(host as ToolRenderHost, payload);
    return;
  }

  if (payload.stream !== "tool") {
    return;
  }
  const sessionKey = typeof payload.sessionKey === "string" ? payload.sessionKey : undefined;
  if (sessionKey && sessionKey !== host.sessionKey) {
    return;
  }
  // Fallback: only accept session-less events for the active run.
  if (!sessionKey && host.chatRunId && payload.runId !== host.chatRunId) {
    return;
  }
  if (host.chatRunId && payload.runId !== host.chatRunId) {
    return;
  }
  if (!host.chatRunId) {
    return;
  }

  const data = payload.data ?? {};
  const toolCallId = typeof data.toolCallId === "string" ? data.toolCallId : "";
  if (!toolCallId) {
    return;
  }
  const name = typeof data.name === "string" ? data.name : "tool";
  const phase = typeof data.phase === "string" ? data.phase : "";
  const args = phase === "start" ? data.args : undefined;
  const output =
    phase === "update"
      ? formatToolOutput(data.partialResult)
      : phase === "result"
        ? formatToolOutput(data.result)
        : undefined;

  const now = Date.now();
  let entry = host.toolStreamById.get(toolCallId);
  if (!entry) {
    entry = {
      toolCallId,
      runId: payload.runId,
      sessionKey,
      name,
      args,
      output: output || undefined,
      startedAt: typeof payload.ts === "number" ? payload.ts : now,
      updatedAt: now,
      message: {},
    };
    host.toolStreamById.set(toolCallId, entry);
    host.toolStreamOrder.push(toolCallId);
  } else {
    entry.name = name;
    if (args !== undefined) {
      entry.args = args;
    }
    if (output !== undefined) {
      entry.output = output || undefined;
    }
    entry.updatedAt = now;
  }

  entry.message = buildToolStreamMessage(entry);
  trimToolStream(host);
  scheduleToolStreamSync(host, phase === "result");
}
