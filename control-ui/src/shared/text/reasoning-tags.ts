/**
 * Strips reasoning/thinking blocks from assistant text before display.
 *
 * Handles three formats the LLM may produce:
 *   1. <think>...</think> tags  — LLM followed the prompt instruction
 *   2. "1. Plan / 2. Gather..." numbered structure — LLM forgot the tags, used headers
 *   3. "Reasoning:\n..." prefix  — alternate non-compliant prefix
 *
 * In all cases the LLM still uses the reasoning correctly; only the display is suppressed.
 */

/** Returns true when text opens with the Plan/Gather/Act/Verify numbered structure. */
function startsWithPlanBlock(text: string): boolean {
  return /^(?:###\s*)?1\.\s*Plan\b/i.test(text);
}

/** Returns true when text opens with a bare "Reasoning:" prefix. */
function startsWithReasoningPrefix(text: string): boolean {
  return /^Reasoning:\s*\n/i.test(text);
}

/**
 * For "Reasoning:\n...\n\n<answer>" format: return the part after the blank-line
 * separator (the actual user-facing reply). Returns "" if nothing follows.
 */
function extractAfterReasoningBlock(text: string): string {
  const blankIdx = text.indexOf("\n\n");
  if (blankIdx === -1) return "";
  return text.slice(blankIdx + 2).trim();
}

export function stripReasoningTagsFromText(
  text: string,
  _opts?: { mode?: string; trim?: string },
): string {
  if (!text || typeof text !== "string") return "";

  // Strip explicit <think>...</think> blocks first
  let result = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // If text starts with "1. Plan" / "### 1. Plan" — the whole message is reasoning;
  // hide it entirely (the SSE tool_render card already shows the result).
  if (startsWithPlanBlock(result)) {
    return "";
  }

  // If text starts with "Reasoning:\n" — strip the reasoning prefix, keep the reply
  // that follows after the blank-line separator.
  if (startsWithReasoningPrefix(result)) {
    return extractAfterReasoningBlock(result);
  }

  return result;
}
