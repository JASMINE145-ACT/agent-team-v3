/**
 * 业务知识（wanding_business_knowledge.md）加载与保存，供 Control 侧「业务知识」页使用。
 * 模式参考 controllers/oos.ts（无货看板）。
 */

export type DependentFiles = {
  mapping_table: string;
  price_library: string;
};

export type BusinessKnowledgeState = {
  basePath: string;
  bkContent: string;
  bkLoading: boolean;
  bkError: string | null;
  bkSaving: boolean;
  bkLastSuccess: number | null;
  bkDependentFiles: DependentFiles | null;
};

function apiUrl(basePath: string, path: string): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  return prefix ? `${prefix}${path}` : path;
}

export async function loadBusinessKnowledgeDependentFiles(
  state: BusinessKnowledgeState,
): Promise<void> {
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/business-knowledge/dependent-files"));
    const json = await res.json().catch(() => ({}));
    if (json.success && json.data) {
      state.bkDependentFiles = {
        mapping_table: json.data.mapping_table ?? "",
        price_library: json.data.price_library ?? "",
      };
    } else {
      state.bkDependentFiles = null;
    }
  } catch {
    state.bkDependentFiles = null;
  }
}

export async function loadBusinessKnowledge(state: BusinessKnowledgeState): Promise<void> {
  state.bkLoading = true;
  state.bkError = null;
  loadBusinessKnowledgeDependentFiles(state);
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/business-knowledge"));
    const json = await res.json().catch(() => ({}));
    if (json.success && json.data && typeof json.data.content === "string") {
      state.bkContent = json.data.content;
    } else {
      state.bkContent = "";
      if (!res.ok) {
        state.bkError = json.detail ?? `HTTP ${res.status}`;
      }
    }
  } catch (err) {
    state.bkError = err instanceof Error ? err.message : String(err);
    state.bkContent = "";
  } finally {
    state.bkLoading = false;
  }
}

export async function saveBusinessKnowledge(
  state: BusinessKnowledgeState,
  content: string,
): Promise<boolean> {
  state.bkSaving = true;
  state.bkError = null;
  try {
    const res = await fetch(apiUrl(state.basePath, "/api/business-knowledge"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) {
      state.bkContent = content;
      state.bkLastSuccess = Date.now();
      return true;
    }
    state.bkError = json.detail ?? `HTTP ${res.status}`;
    return false;
  } catch (err) {
    state.bkError = err instanceof Error ? err.message : String(err);
    return false;
  } finally {
    state.bkSaving = false;
  }
}
