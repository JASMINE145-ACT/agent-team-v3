import type { GatewayBrowserClient } from "../gateway.ts";
import type { AgentInfo, AgentsListResult } from "../types.ts";

export type AgentsState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  agentsLoading: boolean;
  agentsError: string | null;
  agentsList: AgentsListResult | null;
  agentsSelectedId: string | null;
  agentInfo: AgentInfo | null;
  agentInfoLoading: boolean;
  agentInfoError: string | null;
};

export async function loadAgents(state: AgentsState) {
  if (!state.client || !state.connected) {
    return;
  }
  if (state.agentsLoading) {
    return;
  }
  state.agentsLoading = true;
  state.agentsError = null;
  try {
    const res = await state.client.request<AgentsListResult>("agents.list", {});
    if (res) {
      state.agentsList = res;
      const selected = state.agentsSelectedId;
      const known = res.agents.some((entry) => entry.id === selected);
      if (!selected || !known) {
        state.agentsSelectedId = res.defaultId ?? res.agents[0]?.id ?? null;
      }
    }
  } catch (err) {
    state.agentsError = String(err);
  } finally {
    state.agentsLoading = false;
  }
}

export async function loadAgentInfo(state: AgentsState) {
  if (state.agentInfoLoading) {
    return;
  }
  state.agentInfoLoading = true;
  state.agentInfoError = null;
  try {
    const res = await fetch("/api/agent/info");
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    state.agentInfo = (await res.json()) as AgentInfo;
  } catch (err) {
    state.agentInfoError = String(err);
  } finally {
    state.agentInfoLoading = false;
  }
}
