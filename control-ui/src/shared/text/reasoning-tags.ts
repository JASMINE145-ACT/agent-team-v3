/** Stub: 去除推理标签，保留内容 */
export function stripReasoningTagsFromText(
  text: string,
  _opts?: { mode?: string; trim?: string },
): string {
  if (!text || typeof text !== "string") return "";
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}
