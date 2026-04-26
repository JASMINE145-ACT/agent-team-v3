/* @vitest-environment jsdom */

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  initialAdminDataState,
  loadLibraryData,
  loadBkItems,
  saveBkItem,
  setBkEditingKey,
  syncLibrarySchema,
  type AdminDataHost,
} from "./admin-data.ts";

function createHost(): AdminDataHost {
  const adminData = initialAdminDataState();
  adminData.token = "ok";
  adminData.libraryDataQuery = "";
  adminData.libraryDataPage = 1;
  adminData.libraries = [
    {
      id: 1,
      name: "Demo",
      table_name: "dl_1_demo",
      columns: [{ name: "material", type: "TEXT", original_name: "material", warnings: [] }],
      row_count: 1,
      created_at: "2026-04-24T00:00:00Z",
    },
  ];
  return {
    basePath: "",
    adminData,
  };
}

describe("admin-data controller schema sync", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads library rows and schema-diff columns together", async () => {
    const host = createHost();
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/admin/libraries/1/data")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ items: [{ id: 10, material: "A" }], total: 1 }),
        };
      }
      if (url.endsWith("/api/admin/libraries/1/schema-diff")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            new_columns: [{ name: "price_a", type: "TEXT", original_name: "price_a", warnings: [] }],
          }),
        };
      }
      throw new Error(`unexpected fetch url: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    await loadLibraryData(host, 1);

    expect(host.adminData.libraryDataTotal).toBe(1);
    expect(host.adminData.libraryData[0]?.material).toBe("A");
    expect(host.adminData.libraryNewColumns.map((c) => c.name)).toEqual(["price_a"]);
  });

  it("syncLibrarySchema clears pending new columns after reload", async () => {
    const host = createHost();
    host.adminData.libraryNewColumns = [
      { name: "price_a", type: "TEXT", original_name: "price_a", warnings: [] },
    ];
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/api/admin/libraries/1/sync-schema")) {
        return { ok: true, status: 200, json: async () => ({ merged: ["price_a"] }) };
      }
      if (url.endsWith("/api/admin/libraries")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ items: host.adminData.libraries }),
        };
      }
      if (url.includes("/api/admin/libraries/1/data")) {
        return { ok: true, status: 200, json: async () => ({ items: [{ id: 1 }], total: 1 }) };
      }
      if (url.endsWith("/api/admin/libraries/1/schema-diff")) {
        return { ok: true, status: 200, json: async () => ({ new_columns: [] }) };
      }
      throw new Error(`unexpected fetch url: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    await syncLibrarySchema(host, 1);

    expect(host.adminData.librarySchemaLoading).toBe(false);
    expect(host.adminData.librarySchemaError).toBeNull();
    expect(host.adminData.libraryNewColumns).toEqual([]);
  });
});

describe("admin-data controller business knowledge", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads BK items from admin endpoint", async () => {
    const host = createHost();
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/api/admin/business-knowledge")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            items: [{ id: 1, key: "wanding_selector", content: "demo", updated_at: "2026-04-26T00:00:00Z" }],
          }),
        };
      }
      throw new Error(`unexpected fetch url: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    await loadBkItems(host);

    expect(host.adminData.bkLoading).toBe(false);
    expect(host.adminData.bkError).toBeNull();
    expect(host.adminData.bkItems.length).toBe(1);
    expect(host.adminData.bkItems[0]?.key).toBe("wanding_selector");
  });

  it("saves BK item then reloads list and clears edit state", async () => {
    const host = createHost();
    setBkEditingKey(host, "wanding_selector", "old");
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/api/admin/business-knowledge/wanding_selector")) {
        expect(init?.method).toBe("PUT");
        expect((init?.headers as Record<string, string>)["X-Admin-Token"]).toBe("ok");
        expect((init?.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
        expect(String(init?.body)).toBe(JSON.stringify({ content: "new" }));
        return { ok: true, status: 200, json: async () => ({ ok: true }) };
      }
      if (url.endsWith("/api/admin/business-knowledge")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            items: [{ id: 1, key: "wanding_selector", content: "new", updated_at: "2026-04-26T00:00:00Z" }],
          }),
        };
      }
      throw new Error(`unexpected fetch url: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const ok = await saveBkItem(host, "wanding_selector", "new");

    expect(ok).toBe(true);
    expect(host.adminData.bkSaving).toBe(false);
    expect(host.adminData.bkSaveKey).toBeNull();
    expect(host.adminData.bkEditingKey).toBeNull();
    expect(host.adminData.bkEditingContent).toBe("");
    expect(host.adminData.bkItems[0]?.content).toBe("new");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("/api/admin/business-knowledge/wanding_selector");
    expect(String(fetchMock.mock.calls[1]?.[0])).toContain("/api/admin/business-knowledge");
  });

  it("clears BK loading state on 401 during load", async () => {
    const host = createHost();
    const fetchMock = vi.fn(async () => ({ ok: false, status: 401, text: async () => "unauthorized" }));
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    await loadBkItems(host);

    expect(host.adminData.token).toBeNull();
    expect(host.adminData.bkLoading).toBe(false);
  });

  it("clears saving flags on 401 during save", async () => {
    const host = createHost();
    const fetchMock = vi.fn(async () => ({ ok: false, status: 401, text: async () => "unauthorized" }));
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const ok = await saveBkItem(host, "wanding_selector", "new");

    expect(ok).toBe(false);
    expect(host.adminData.token).toBeNull();
    expect(host.adminData.bkSaving).toBe(false);
    expect(host.adminData.bkSaveKey).toBeNull();
  });

  it("keeps editing state and sets bkError when save returns non-ok", async () => {
    const host = createHost();
    setBkEditingKey(host, "wanding_selector", "draft");
    const fetchMock = vi.fn(async () => ({
      ok: false,
      status: 500,
      text: async () => "save failed",
    }));
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const ok = await saveBkItem(host, "wanding_selector", "new");

    expect(ok).toBe(false);
    expect(host.adminData.bkSaving).toBe(false);
    expect(host.adminData.bkSaveKey).toBeNull();
    expect(host.adminData.bkError).toContain("save failed");
    expect(host.adminData.bkEditingKey).toBe("wanding_selector");
    expect(host.adminData.bkEditingContent).toBe("draft");
  });

  it("encodes key when saving BK item", async () => {
    const host = createHost();
    const encoded = encodeURIComponent("wanding selector/中文");
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith(`/api/admin/business-knowledge/${encoded}`)) {
        return { ok: true, status: 200, json: async () => ({ ok: true }) };
      }
      if (url.endsWith("/api/admin/business-knowledge")) {
        return { ok: true, status: 200, json: async () => ({ items: [] }) };
      }
      throw new Error(`unexpected fetch url: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const ok = await saveBkItem(host, "wanding selector/中文", "content");

    expect(ok).toBe(true);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain(`/api/admin/business-knowledge/${encoded}`);
  });
});
