/* @vitest-environment jsdom */

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  initialAdminDataState,
  loadLibraryData,
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
