import { describe, expect, it } from "vitest";
import {
  handleCandidatesEvent,
  handleToolRenderEvent,
  resetToolRender,
  type AgentEventPayload,
  type ToolRenderHost,
} from "./app-tool-stream.ts";

function makePayload(overrides: Partial<AgentEventPayload> = {}): AgentEventPayload {
  return {
    runId: "run-1",
    seq: 1,
    stream: "tool_candidates",
    ts: Date.now(),
    data: {
      keywords: "直通50",
      candidates: [
        { code: "C001", matched_name: "直通PVC DN50", unit_price: 12.5, source: "历史报价" },
        { code: "C002", matched_name: "直通UPVC DN50", unit_price: 13.0, source: "字段匹配" },
      ],
      match_source: "历史报价",
    },
    ...overrides,
  };
}

function makeRenderPayload(): AgentEventPayload {
  return {
    runId: "run-1",
    seq: 2,
    stream: "tool_render",
    ts: Date.now(),
    data: {
      formatted_response: "**查询结果**\n| code | name |\n|---|---|\n| C001 | 直通PVC |",
      chosen: { code: "C001", matched_name: "直通PVC DN50", unit_price: 12.5 },
      chosen_index: 1,
      match_source: "历史报价",
      selection_reasoning: "",
      batch_mode: false,
      resolved_items: [],
      pending_items: [],
      unmatched_items: [],
    },
  };
}

function makeHost(): ToolRenderHost {
  return {
    sessionKey: "main",
    chatRunId: "run-1",
    toolStreamById: new Map(),
    toolStreamOrder: [],
    chatToolMessages: [],
    toolStreamSyncTimer: null,
    toolRenderData: null,
    toolRenderSeq: null,
    toolRenderItems: [],
    candidatePreviews: [],
    ocrResultCards: [],
  };
}

describe("handleCandidatesEvent", () => {
  it("adds a CandidatesPreviewItem when candidates are present", () => {
    const host = makeHost();
    handleCandidatesEvent(host, makePayload());
    expect(host.candidatePreviews).toHaveLength(1);
    expect(host.candidatePreviews![0].keywords).toBe("直通50");
    expect(host.candidatePreviews![0].candidates).toHaveLength(2);
    expect(host.candidatePreviews![0].runId).toBe("run-1");
  });

  it("ignores events with empty candidates", () => {
    const host = makeHost();
    handleCandidatesEvent(host, makePayload({ data: { keywords: "x", candidates: [], match_source: "" } }));
    expect(host.candidatePreviews).toHaveLength(0);
  });

  it("accumulates multiple previews for multi-product queries", () => {
    const host = makeHost();
    handleCandidatesEvent(host, makePayload({ seq: 1 }));
    handleCandidatesEvent(
      host,
      makePayload({
        seq: 2,
        data: {
          keywords: "弯头50",
          candidates: [{ code: "B1", matched_name: "弯头", unit_price: 8, source: "共同" }],
          match_source: "共同",
        },
      }),
    );
    expect(host.candidatePreviews).toHaveLength(2);
  });
});

describe("handleToolRenderEvent removes oldest candidatePreview", () => {
  it("removes the oldest preview for the same runId when tool_render arrives", () => {
    const host = makeHost();
    handleCandidatesEvent(
      host,
      makePayload({
        seq: 1,
        data: {
          keywords: "直通50",
          candidates: [{ code: "C001", matched_name: "直通PVC", unit_price: 12, source: "共同" }],
          match_source: "共同",
        },
      }),
    );
    expect(host.candidatePreviews).toHaveLength(1);
    handleToolRenderEvent(host, makeRenderPayload());
    expect(host.candidatePreviews).toHaveLength(0);
  });

  it("does not remove preview for a different runId", () => {
    const host = makeHost();
    handleCandidatesEvent(host, makePayload({ seq: 1 }));
    const otherRender = makeRenderPayload();
    otherRender.runId = "run-other";
    host.chatRunId = "run-other";
    handleToolRenderEvent(host, otherRender);
    expect(host.candidatePreviews).toHaveLength(1);
  });
});

describe("resetToolRender clears candidatePreviews", () => {
  it("empties candidatePreviews on reset", () => {
    const host = makeHost();
    handleCandidatesEvent(host, makePayload());
    resetToolRender(host);
    expect(host.candidatePreviews).toHaveLength(0);
  });
});
