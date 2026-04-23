import { describe, expect, it } from "vitest";
import { parseClarifyOptions } from "./clarify-card.ts";

const PVC_TEXT = `PVC 产品有以下类型，请问您要的是哪种？
1. PVC-U 排水管（建筑排水用，管身直管，含 D排水系列）
2. PVC-U 排水管件（排水用弯头/三通/直接等管件）
3. PVC-U 给水管（AW 给水系列，管身/管件均可）
4. PVC 电线管/线管（电气安装用，B管/A管）
5. PVC 阀门（球阀等）
6. PVC 胶水/辅材（清扫口等）
请回复序号或类型名称，或说明其他类型。`;

describe("parseClarifyOptions", () => {
  it("parses 6 numbered options from PVC clarification text", () => {
    const result = parseClarifyOptions(PVC_TEXT);
    expect(result).toHaveLength(6);
    expect(result[0]).toBe("PVC-U 排水管（建筑排水用，管身直管，含 D排水系列）");
    expect(result[5]).toBe("PVC 胶水/辅材（清扫口等）");
  });

  it("returns empty array for plain text without numbered list", () => {
    expect(parseClarifyOptions("这是普通回复，没有编号列表。")).toEqual([]);
  });

  it("returns empty array when fewer than 3 consecutive items", () => {
    const text = "请选择：\n1. 选项A\n2. 选项B\n然后联系我们。";
    expect(parseClarifyOptions(text)).toEqual([]);
  });

  it("handles dot and 、and ) as item separators", () => {
    const text = "请选择：\n1. A型\n2、B型\n3) C型\n4. D型";
    const result = parseClarifyOptions(text);
    expect(result).toHaveLength(4);
    expect(result[0]).toBe("A型");
    expect(result[1]).toBe("B型");
    expect(result[2]).toBe("C型");
  });

  it("tolerates blank lines between numbered items", () => {
    const text = "请选择：\n1. 选项A\n\n2. 选项B\n\n3. 选项C";
    expect(parseClarifyOptions(text)).toHaveLength(3);
  });

  it("stops at first non-sequential item after list starts", () => {
    const text = "1. A\n2. B\n3. C\n（请回复序号）\n5. E";
    const result = parseClarifyOptions(text);
    expect(result).toHaveLength(3);
  });

  it("returns empty array for empty string", () => {
    expect(parseClarifyOptions("")).toEqual([]);
  });

  it("supports wrapped option lines as continuation text", () => {
    const text = `请选择：
1. PVC-U 排水管（建筑排水用，
管身直管）
2. PVC-U 排水管件（排水用弯头）
3. PVC-U 给水管（AW 给水系列）`;
    const result = parseClarifyOptions(text);
    expect(result).toHaveLength(3);
    expect(result[0]).toContain("管身直管");
  });

  it("stops parsing on explicit footer instruction after list", () => {
    const text = `1. A型
2. B型
3. C型
请回复序号或类型名称
4. D型`;
    const result = parseClarifyOptions(text);
    expect(result).toEqual(["A型", "B型", "C型"]);
  });
});
