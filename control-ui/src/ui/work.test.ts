import { describe, it, expect } from "vitest";
import { render } from "lit";
import type { WorkProps } from "./views/work.ts";
import { renderWork } from "./views/work.ts";

function createBaseProps(overrides: Partial<WorkProps> = {}): WorkProps {
  return {
    basePath: "",
    workFilePaths: [],
    workOriginalFileNamesByPath: {},
    workRunning: false,
    workProgressStage: 0,
    workRunStatus: "done",
    workRunId: null,
    workPendingChoices: [],
    workSelections: {},
    workResult: null,
    workError: null,
    workCustomerLevel: "A_QUOTE",
    workDoRegisterOos: false,
    workPendingQuotationDraft: null,
    workQuotationDraftSaveStatus: null,
    workTextInput: "",
    workTextGenerating: false,
    workTextError: null,
    workPriceLevelOptions: [],
    onAddFile: () => {},
    onRemoveFile: () => {},
    onRenameFileName: () => {},
    onWorkTextChange: () => {},
    onGenerateFromText: () => {},
    onCustomerLevelChange: () => {},
    onDoRegisterOosChange: () => {},
    onRun: () => {},
    onCancel: () => {},
    onRetry: () => {},
    onSelectionChange: () => {},
    onResume: () => {},
    onQuotationLineChange: () => {},
    onQuotationDraftSave: () => {},
    onQuotationDraftDismiss: () => {},
    ...overrides,
  };
}

describe("renderWork - quotation download link", () => {
  it("shows download link when trace contains output_path", () => {
    const container = document.createElement("div");
    const props = createBaseProps({
      workResult: {
        success: true,
        answer: "",
        error: "",
        trace: [
          {
            type: "step",
            output_path: "some/dir/quote.xlsx",
          },
        ],
      },
      workPendingQuotationDraft: null,
    });

    render(renderWork(props), container);

    const links = container.querySelectorAll<HTMLAnchorElement>('a[href*="/api/quotation/download?path="]');
    expect(links.length).toBe(1);
    const link = links[0];
    expect(link.getAttribute("href")).toContain("/api/quotation/download?path=quote.xlsx");
    expect(link.getAttribute("download")).toBe("quote.xlsx");
  });

  it("hides download link when trace has no output file paths", () => {
    const container = document.createElement("div");
    const props = createBaseProps({
      workResult: {
        success: true,
        answer: "",
        error: "",
        trace: [
          {
            type: "step",
            message: "no files here",
          },
        ],
      },
      workPendingQuotationDraft: null,
    });

    render(renderWork(props), container);

    const links = container.querySelectorAll<HTMLAnchorElement>('a[href*="/api/quotation/download?path="]');
    expect(links.length).toBe(0);
  });
});

