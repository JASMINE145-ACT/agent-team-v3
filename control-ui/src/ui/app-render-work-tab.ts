import { nothing } from "lit";
import type { AppViewState } from "./app-view-state.ts";
import { runWork, resumeWork } from "./controllers/work.ts";
import { renderWork } from "./views/work.ts";

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
    onAddFile: (filePath, _fileName) => {
      if (!state.workFilePaths.includes(filePath)) {
        state.workFilePaths = [...state.workFilePaths, filePath];
      }
    },
    onRemoveFile: (index) => {
      state.workFilePaths = state.workFilePaths.filter((_, i) => i !== index);
    },
    onCustomerLevelChange: (level) => {
      state.workCustomerLevel = level;
    },
    onDoRegisterOosChange: (v) => {
      state.workDoRegisterOos = v;
    },
    onRun: () => void runWork(state),
    onSelectionChange: (itemId, selectedCode) => {
      state.workSelections = { ...state.workSelections, [itemId]: selectedCode };
    },
    onResume: () => void resumeWork(state),
  });
}
