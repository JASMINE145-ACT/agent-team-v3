export class ResponseSchemaError extends Error {
  endpoint: string;

  constructor(endpoint: string, detail: string) {
    super(`Invalid response schema from ${endpoint}: ${detail}`);
    this.name = "ResponseSchemaError";
    this.endpoint = endpoint;
  }
}

export type JsonRecord = Record<string, unknown>;

export function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function asRecord(value: unknown, endpoint: string, field = "response"): JsonRecord {
  if (!isRecord(value)) {
    throw new ResponseSchemaError(endpoint, `${field} must be an object`);
  }
  return value;
}

export function asArray(value: unknown, endpoint: string, field: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new ResponseSchemaError(endpoint, `${field} must be an array`);
  }
  return value;
}

export function asString(value: unknown, endpoint: string, field: string): string {
  if (typeof value !== "string") {
    throw new ResponseSchemaError(endpoint, `${field} must be a string`);
  }
  return value;
}

export function asNumber(value: unknown, endpoint: string, field: string): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new ResponseSchemaError(endpoint, `${field} must be a number`);
  }
  return value;
}

export function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function optionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function optionalBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

export function extractErrorDetail(json: unknown, fallback: string): string {
  if (!isRecord(json)) return fallback;
  if (typeof json.detail === "string" && json.detail.trim()) return json.detail.trim();
  if (typeof json.error === "string" && json.error.trim()) return json.error.trim();
  if (typeof json.message === "string" && json.message.trim()) return json.message.trim();
  return fallback;
}

export function buildStandardError(
  operation: string,
  detail: string,
  impact: string,
  nextAction: string,
): string {
  return `${operation}失败：${detail}。影响：${impact}。下一步：${nextAction}`;
}

