/** Stub: 去除消息外壳，返回纯文本 */
export function stripEnvelope(text: string | undefined | null): string {
  if (text == null) return "";
  return String(text).trim();
}
