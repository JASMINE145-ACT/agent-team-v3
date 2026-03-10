import { nothing } from "lit";
import { t } from "../i18n/index.ts";
import type { AppViewState } from "./app-view-state.ts";
import { cancelWork, generateWorkFileFromText, retryWork, runWork, resumeWork, saveQuotationDraft } from "./controllers/work.ts";
import { renderWork } from "./views/work.ts";

function normalizePathKey(p: string): string {
  return (p || "").trim().replace(/\\/g, "/").toLowerCase();
}

export function renderWorkTab(state: AppViewState) {
  if (state.tab !== "work") {
    return nothing;
  }

  return renderWork({
    basePath: state.basePath,
    workFilePaths: state.workFilePaths,
    workRunning: state.workRunning,
    workProgressStage: state.workProgressStage,
    workRunStatus: state.workRunStatus,
    workRunId: state.workRunId,
    workPendingChoices: state.workPendingChoices,
    workSelections: state.workSelections,
    workResult: state.workResult,
    workError: state.workError,
    workCustomerLevel: state.workCustomerLevel,
    workDoRegisterOos: state.workDoRegisterOos,
    workOriginalFileNamesByPath: state.workOriginalFileNamesByPath,
    workPendingQuotationDraft: state.workPendingQuotationDraft,
    workQuotationDraftSaveStatus: state.workQuotationDraftSaveStatus,
    workTextInput: state.workTextInput,
    workTextGenerating: state.workTextGenerating,
    workTextError: state.workTextError,
    workPriceLevelOptions: state.workPriceLevelOptions,
    onWorkTextChange: (v) => {
      state.workTextInput = v;
    },
    onGenerateFromText: () => {
      void generateWorkFileFromText(state);
    },
    onAddFile: (filePath, fileName) => {
      if (!state.workFilePaths.includes(filePath)) {
        state.workFilePaths = [...state.workFilePaths, filePath];
      }
      const key = normalizePathKey(filePath);
      if (key) {
        state.workOriginalFileNamesByPath = {
          ...state.workOriginalFileNamesByPath,
          [key]: (fileName || "").trim() || filePath.split(/[/\\]/).pop() || filePath,
        };
      }
    },
    onRenameFileName: (filePath, nextName) => {
      const key = normalizePathKey(filePath);
      if (!key) return;
      const trimmed = (nextName || "").trim();
      const fallback = filePath.split(/[/\\]/).pop() || filePath;
      state.workOriginalFileNamesByPath = {
        ...state.workOriginalFileNamesByPath,
        [key]: trimmed || fallback,
      };
      const draft = state.workPendingQuotationDraft;
      if (draft && draft.file_path && normalizePathKey(draft.file_path) === key) {
        state.workPendingQuotationDraft = {
          ...draft,
          name: trimmed || fallback,
        };
      }
    },
    onRemoveFile: (index) => {
      const removedPath = state.workFilePaths[index] ?? "";
      state.workFilePaths = state.workFilePaths.filter((_, i) => i !== index);
      const key = normalizePathKey(removedPath);
      if (key && state.workOriginalFileNamesByPath[key] !== undefined) {
        const next = { ...state.workOriginalFileNamesByPath };
        delete next[key];
        state.workOriginalFileNamesByPath = next;
      }
    },
    onCustomerLevelChange: (level) => {
      state.workCustomerLevel = level;
    },
    onDoRegisterOosChange: (v) => {
      state.workDoRegisterOos = v;
    },
    onRun: () => void runWork(state),
    onCancel: () => cancelWork(state),
    onRetry: () => void retryWork(state),
    onSelectionChange: (itemId, selectedCode) => {
      state.workSelections = { ...state.workSelections, [itemId]: selectedCode };
    },
    onResume: () => void resumeWork(state),
    onQuotationLineChange: (rowIndex, field, value) => {
      const draft = state.workPendingQuotationDraft;
      if (!draft?.lines?.length || rowIndex < 0 || rowIndex >= draft.lines.length) return;
      const lines = draft.lines.slice();
      const line = { ...lines[rowIndex] };
      if (field === "qty") {
        const n = Number(value);
        line.qty = Number.isFinite(n) ? n : 0;
      } else if (field === "unit_price") {
        const s = String(value ?? "").trim();
        if (!s) {
          line.unit_price = null;
        } else {
          const n = Number(s);
          line.unit_price = Number.isFinite(n) ? n : null;
        }
      } else {
        (line as Record<string, unknown>)[field] = value;
      }
      if (field === "qty" || field === "unit_price") {
        const qty = Number(line.qty ?? 0);
        const unitPrice = line.unit_price == null ? NaN : Number(line.unit_price);
        line.amount = Number.isFinite(qty) && Number.isFinite(unitPrice) ? qty * unitPrice : null;
      }
      lines[rowIndex] = line;
      state.workPendingQuotationDraft = { ...draft, lines };
    },
    onQuotationDraftSave: () => {
      if (typeof window !== "undefined" && window.confirm(t("work.saveConfirm"))) {
        void saveQuotationDraft(state).then((saved) => {
          if (saved) {
            void state.loadFulfillDrafts();
          }
        });
      }
    },
    onQuotationDraftDismiss: () => {
      state.workPendingQuotationDraft = null;
      state.workQuotationDraftSaveStatus = null;
    },
  });
}
