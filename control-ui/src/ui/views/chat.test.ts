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
});
