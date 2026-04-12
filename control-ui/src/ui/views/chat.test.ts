import { render } from "lit";
import { describe, expect, it, vi } from "vitest";
import { RENDERED_MARKER } from "../app-tool-stream.ts";
import type { SessionsListResult } from "../types.ts";
import { renderChat, type ChatProps } from "./chat.ts";

function createSessions(): SessionsListResult {
  return {
    ts: 0,
    path: "",
    count: 0,
    defaults: { model: null, contextTokens: null },
    sessions: [],
  };
}

function createProps(overrides: Partial<ChatProps> = {}): ChatProps {
  return {
    sessionKey: "main",
    onSessionKeyChange: () => undefined,
    thinkingLevel: null,
    showThinking: false,
    loading: false,
    sending: false,
    canAbort: false,
    compactionStatus: null,
    messages: [],
    toolMessages: [],
    stream: null,
    streamStartedAt: null,
    assistantAvatarUrl: null,
    draft: "",
    queue: [],
    connected: true,
    canSend: true,
    disabledReason: null,
    error: null,
    sessions: createSessions(),
    focusMode: false,
    assistantName: "OpenClaw",
    assistantAvatar: null,
    onRefresh: () => undefined,
    onToggleFocusMode: () => undefined,
    onDraftChange: () => undefined,
    onSend: () => undefined,
    onQueueRemove: () => undefined,
    onNewSession: () => undefined,
    ...overrides,
  };
}

describe("chat view", () => {
  it("renders tool_render markdown payload when present", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          toolRenderData: {
            formatted_response: "**查询结果**\n\n| 编号 | 名称 |\n|---|---|\n| 8020020755 | 直通 DN50 |",
            chosen: { code: "8020020755" },
            chosen_index: 1,
            match_source: "共同",
            selection_reasoning: "规格与来源均匹配",
          },
          toolRenderSeq: 1,
        }),
      ),
      container,
    );

    expect(container.textContent).toContain("查询结果");
    expect(container.textContent).toContain("直通 DN50");
  });

  it("suppresses rendered-marker assistant bubble when tool_render card exists", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          messages: [
            {
              role: "assistant",
              content: [{ type: "text", text: `${RENDERED_MARKER} 「直通50」查询结果已推送` }],
              timestamp: Date.now(),
            },
          ],
          toolRenderData: {
            formatted_response: "**查询结果**\n\n直通 DN50",
            chosen: { code: "8020020755" },
            chosen_index: 1,
            match_source: "共同",
            selection_reasoning: "规格匹配",
          },
          toolRenderSeq: 2,
        }),
      ),
      container,
    );

    expect(container.textContent).not.toContain(RENDERED_MARKER);
    expect(container.textContent).toContain("查询结果");
  });

  it("renders batch summary table ordered by input_index", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          toolRenderData: {
            formatted_response: "fallback",
            chosen: {},
            chosen_index: 0,
            match_source: "batch",
            selection_reasoning: "",
            batch_mode: true,
            resolved_items: [{ input_index: 2, chosen: { code: "C3", matched_name: "第三项" } }],
            pending_items: [{ input_index: 0, options: [{ code: "C1", matched_name: "第一项候选" }] }],
            unmatched_items: [{ input_index: 1 }],
          },
          toolRenderSeq: 3,
        }),
      ),
      container,
    );
    const text = container.textContent ?? "";
    expect(text).toContain("批处理总表");
    expect(text.indexOf("第一项候选")).toBeLessThan(text.indexOf("第三项"));
  });

  it("replaces marker messages with cards in chronological order", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          messages: [
            { role: "user", content: [{ type: "text", text: "查询 直接50 价格" }], timestamp: 1000 },
            {
              role: "assistant",
              content: [{ type: "text", text: `${RENDERED_MARKER} 第一条` }],
              timestamp: 1001,
            },
            { role: "user", content: [{ type: "text", text: "查询 三通50 价格" }], timestamp: 2000 },
            {
              role: "assistant",
              content: [{ type: "text", text: `${RENDERED_MARKER} 第二条` }],
              timestamp: 2001,
            },
          ],
          toolRenderItems: [
            {
              id: "run1:9",
              runId: "run1",
              seq: 9,
              ts: 1001,
              payload: {
                formatted_response: "卡片A",
                chosen: {},
                chosen_index: 1,
                match_source: "共同",
                selection_reasoning: "A",
              },
            },
            {
              id: "run2:10",
              runId: "run2",
              seq: 10,
              ts: 2001,
              payload: {
                formatted_response: "卡片B",
                chosen: {},
                chosen_index: 1,
                match_source: "共同",
                selection_reasoning: "B",
              },
            },
          ],
        }),
      ),
      container,
    );

    const text = container.textContent ?? "";
    expect(text).toContain("查询 直接50 价格");
    expect(text).toContain("卡片A");
    expect(text).toContain("查询 三通50 价格");
    expect(text).toContain("卡片B");
    expect(text.indexOf("查询 直接50 价格")).toBeLessThan(text.indexOf("卡片A"));
    expect(text.indexOf("卡片A")).toBeLessThan(text.indexOf("查询 三通50 价格"));
    expect(text.indexOf("查询 三通50 价格")).toBeLessThan(text.indexOf("卡片B"));
  });

  it("renders multiple batch cards at a single marker position", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          messages: [
            { role: "user", content: [{ type: "text", text: "batch query" }], timestamp: 1000 },
            {
              role: "assistant",
              content: [{ type: "text", text: `${RENDERED_MARKER} batch done` }],
              timestamp: 1003,
            },
            { role: "user", content: [{ type: "text", text: "follow up" }], timestamp: 2000 },
          ],
          toolRenderItems: [
            {
              id: "run-batch:1",
              runId: "run-batch",
              seq: 1,
              ts: 1001,
              payload: {
                formatted_response: "CARD-A",
                chosen: {},
                chosen_index: 1,
                match_source: "shared",
                selection_reasoning: "A",
              },
            },
            {
              id: "run-batch:2",
              runId: "run-batch",
              seq: 2,
              ts: 1002,
              payload: {
                formatted_response: "CARD-B",
                chosen: {},
                chosen_index: 1,
                match_source: "shared",
                selection_reasoning: "B",
              },
            },
          ],
        }),
      ),
      container,
    );

    const text = container.textContent ?? "";
    expect(text).toContain("batch query");
    expect(text).toContain("CARD-A");
    expect(text).toContain("CARD-B");
    expect(text).toContain("follow up");
    expect(text).not.toContain(RENDERED_MARKER);
    expect(text.indexOf("batch query")).toBeLessThan(text.indexOf("CARD-A"));
    expect(text.indexOf("CARD-A")).toBeLessThan(text.indexOf("CARD-B"));
    expect(text.indexOf("CARD-B")).toBeLessThan(text.indexOf("follow up"));
  });

  it("ignores stale cards older than visible history window", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          messages: [
            { role: "user", content: [{ type: "text", text: "query latest" }], timestamp: 1000 },
            {
              role: "assistant",
              content: [{ type: "text", text: `${RENDERED_MARKER} done` }],
              timestamp: 1003,
            },
          ],
          toolRenderItems: [
            {
              id: "run-old:1",
              runId: "run-old",
              seq: 1,
              ts: 900,
              payload: {
                formatted_response: "CARD-OLD",
                chosen: {},
                chosen_index: 1,
                match_source: "shared",
                selection_reasoning: "old",
              },
            },
            {
              id: "run-new:2",
              runId: "run-new",
              seq: 2,
              ts: 1001,
              payload: {
                formatted_response: "CARD-NEW",
                chosen: {},
                chosen_index: 1,
                match_source: "shared",
                selection_reasoning: "new",
              },
            },
          ],
        }),
      ),
      container,
    );

    const text = container.textContent ?? "";
    expect(text).toContain("CARD-NEW");
    expect(text).not.toContain("CARD-OLD");
  });

  it("keeps live unmatched cards as bottom fallback", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          messages: [
            { role: "user", content: [{ type: "text", text: "query one" }], timestamp: 1000 },
            {
              role: "assistant",
              content: [{ type: "text", text: `${RENDERED_MARKER} done` }],
              timestamp: 1003,
            },
          ],
          toolRenderItems: [
            {
              id: "run-live:3",
              runId: "run-live",
              seq: 3,
              ts: 1005,
              payload: {
                formatted_response: "CARD-LIVE",
                chosen: {},
                chosen_index: 1,
                match_source: "shared",
                selection_reasoning: "live",
              },
            },
          ],
        }),
      ),
      container,
    );

    const text = container.textContent ?? "";
    expect(text).toContain("CARD-LIVE");
    expect(text).toContain("query one");
  });

  it("deduplicates same card content between marker and fallback in same turn", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          messages: [
            { role: "user", content: [{ type: "text", text: "query two products" }], timestamp: 1000 },
            {
              role: "assistant",
              content: [{ type: "text", text: `${RENDERED_MARKER} done` }],
              timestamp: 1003,
            },
          ],
          toolRenderItems: [
            {
              id: "run1:1",
              runId: "run1",
              seq: 1,
              ts: 1001,
              payload: {
                formatted_response: "CARD-DUP",
                chosen: {},
                chosen_index: 1,
                match_source: "shared",
                selection_reasoning: "dup-a",
              },
            },
            {
              id: "run1:2",
              runId: "run1",
              seq: 2,
              ts: 1005,
              payload: {
                formatted_response: "CARD-DUP",
                chosen: {},
                chosen_index: 1,
                match_source: "shared",
                selection_reasoning: "dup-b",
              },
            },
          ],
        }),
      ),
      container,
    );

    const text = container.textContent ?? "";
    const count = text.split("CARD-DUP").length - 1;
    expect(count).toBe(1);
  });

  it("renders compacting indicator as a badge", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          compactionStatus: {
            active: true,
            startedAt: Date.now(),
            completedAt: null,
          },
        }),
      ),
      container,
    );

    const indicator = container.querySelector(".compaction-indicator--active");
    expect(indicator).not.toBeNull();
    expect(indicator?.textContent).toContain("Compacting context...");
  });

  it("renders completion indicator shortly after compaction", () => {
    const container = document.createElement("div");
    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(1_000);
    render(
      renderChat(
        createProps({
          compactionStatus: {
            active: false,
            startedAt: 900,
            completedAt: 900,
          },
        }),
      ),
      container,
    );

    const indicator = container.querySelector(".compaction-indicator--complete");
    expect(indicator).not.toBeNull();
    expect(indicator?.textContent).toContain("Context compacted");
    nowSpy.mockRestore();
  });

  it("hides stale compaction completion indicator", () => {
    const container = document.createElement("div");
    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(10_000);
    render(
      renderChat(
        createProps({
          compactionStatus: {
            active: false,
            startedAt: 0,
            completedAt: 0,
          },
        }),
      ),
      container,
    );

    expect(container.querySelector(".compaction-indicator")).toBeNull();
    nowSpy.mockRestore();
  });

  it("shows a stop button when aborting is available", () => {
    const container = document.createElement("div");
    const onAbort = vi.fn();
    render(
      renderChat(
        createProps({
          canAbort: true,
          onAbort,
        }),
      ),
      container,
    );

    const stopButton = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent?.trim() === "Stop",
    );
    expect(stopButton).not.toBeUndefined();
    stopButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onAbort).toHaveBeenCalledTimes(1);
    expect(container.textContent).not.toContain("New session");
  });

  it("shows a new session button when aborting is unavailable", () => {
    const container = document.createElement("div");
    const onNewSession = vi.fn();
    render(
      renderChat(
        createProps({
          canAbort: false,
          onNewSession,
        }),
      ),
      container,
    );

    const newSessionButton = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent?.trim() === "New session",
    );
    expect(newSessionButton).not.toBeUndefined();
    newSessionButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onNewSession).toHaveBeenCalledTimes(1);
    expect(container.textContent).not.toContain("Stop");
  });

  it("maps newest card to newest marker when only one card exists", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          messages: [
            { role: "user", content: [{ type: "text", text: "Q1" }], timestamp: 1000 },
            { role: "assistant", content: [{ type: "text", text: `${RENDERED_MARKER} old` }], timestamp: 1001 },
            { role: "user", content: [{ type: "text", text: "Q2" }], timestamp: 2000 },
            { role: "assistant", content: [{ type: "text", text: `${RENDERED_MARKER} new` }], timestamp: 2001 },
          ],
          toolRenderItems: [
            {
              id: "run2:10",
              runId: "run2",
              seq: 10,
              ts: 2001,
              payload: {
                formatted_response: "CARD-NEW",
                chosen: {},
                chosen_index: 1,
                match_source: "共同",
                selection_reasoning: "new",
              },
            },
          ],
        }),
      ),
      container,
    );

    const text = container.textContent ?? "";
    expect(text).toContain("Q1");
    expect(text).toContain("Q2");
    expect(text).toContain("CARD-NEW");
    expect(text.indexOf("Q2")).toBeLessThan(text.indexOf("CARD-NEW"));
    expect(text.indexOf("CARD-NEW")).toBeGreaterThan(text.indexOf("Q1"));
  });

  it("renders candidates preview card when candidatePreviews has items", () => {
    const container = document.createElement("div");
    render(
      renderChat(
        createProps({
          candidatePreviews: [
            {
              id: "run-1:candidates:0",
              runId: "run-1",
              keywords: "直通50",
              candidates: [
                { code: "C001", matched_name: "直通PVC DN50", unit_price: 12.5, source: "历史报价" },
                { code: "C002", matched_name: "直通UPVC DN50", unit_price: 13.0, source: "字段匹配" },
              ],
              match_source: "历史报价",
            },
          ],
        }),
      ),
      container,
    );
    const text = container.textContent ?? "";
    expect(text).toContain("直通50");
    expect(text).toContain("C001");
    expect(text).toContain("C002");
    expect(text.toLowerCase()).toContain("ai");
  });

  it("does not render candidates preview when candidatePreviews is empty", () => {
    const container = document.createElement("div");
    render(renderChat(createProps({ candidatePreviews: [] })), container);
    const text = container.textContent ?? "";
    expect(text).not.toContain("直通50");
    expect(text).not.toContain("C001");
  });
});
