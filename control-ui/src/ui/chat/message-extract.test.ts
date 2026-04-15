import { describe, expect, it } from "vitest";
import { hasOcrBlock, stripOcrBlock } from "./message-extract.ts";

const MARKER = "【以下为上传图片的识别结果】";

describe("hasOcrBlock", () => {
  it("returns true when OCR marker present", () => {
    expect(hasOcrBlock(`你好\n\n${MARKER}\nsome ocr text`)).toBe(true);
  });
  it("returns false when no marker", () => {
    expect(hasOcrBlock("plain message")).toBe(false);
  });
  it("returns false for empty string", () => {
    expect(hasOcrBlock("")).toBe(false);
  });
});

describe("stripOcrBlock", () => {
  it("removes marker and everything after", () => {
    const input = `user message\n\n${MARKER}\nocr line 1\nocr line 2`;
    expect(stripOcrBlock(input)).toBe("user message");
  });
  it("returns original when no marker", () => {
    expect(stripOcrBlock("no marker")).toBe("no marker");
  });
  it("returns empty string when message is only the marker", () => {
    expect(stripOcrBlock(`${MARKER}\nocr text`)).toBe("");
  });
  it("trims trailing whitespace from user text", () => {
    expect(stripOcrBlock(`hello   \n\n${MARKER}\nocr`)).toBe("hello");
  });
});
