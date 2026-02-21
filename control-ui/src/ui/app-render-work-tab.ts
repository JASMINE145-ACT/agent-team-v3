import { nothing } from "lit";
import type { AppViewState } from "./app-view-state.ts";
import { loadWorkPlan, runWork } from "./controllers/work.ts";
import { renderWork } from "./views/work.ts";

export function renderWorkTab(state: AppViewState) {
  if (state.tab !== "work") {
    return nothing;
  }

  return renderWork({
    basePath: state.basePath,
    workFilePaths: state.workFilePaths,
    workPlan: state.workPlan,
    workPlanLoading: state.workPlanLoading,
    workRunning: state.workRunning,
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
    onGeneratePlan: () => void loadWorkPlan(state),
    onRun: () => void runWork(state),
  });
}
