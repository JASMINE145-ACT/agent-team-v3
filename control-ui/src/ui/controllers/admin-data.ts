import type {
  AdminDataState,
  AdminDataHost,
  LibraryMeta,
  LibraryRow,
  MappingRow,
  PriceRow,
} from "./admin-data.types.ts";

export type {
  AdminDataState,
  AdminDataHost,
  LibraryMeta,
  LibraryRow,
  MappingRow,
  PriceRow,
} from "./admin-data.types.ts";

function apiUrl(basePath: string, path: string, params?: Record<string, string | number>): string {
  const prefix = basePath?.trim() ? basePath.trim().replace(/\/$/, "") : "";
  const base = prefix ? `${prefix}${path}` : path;
  if (!params || Object.keys(params).length === 0) {
    return base;
  }
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    search.set(k, String(v));
  }
  return `${base}?${search.toString()}`;
}

function authHeaders(token: string): Record<string, string> {
  return { "X-Admin-Token": token, "Content-Type": "application/json" };
}

function patch(host: AdminDataHost, partial: Partial<AdminDataState>) {
  host.adminData = { ...host.adminData, ...partial };
}

export function initialAdminDataState(): AdminDataState {
  let token: string | null = null;
  if (typeof sessionStorage !== "undefined") {
    token = sessionStorage.getItem("admin_token");
  }
  return {
    token,
    loginError: null,
    loginLoading: false,
    activeSubTab: "price",
    priceItems: [],
    priceTotal: 0,
    pricePage: 1,
    pricePageSize: 100,
    priceQuery: "",
    priceLoading: false,
    priceError: null,
    priceUploading: false,
    mappingItems: [],
    mappingTotal: 0,
    mappingPage: 1,
    mappingPageSize: 100,
    mappingQuery: "",
    mappingLoading: false,
    mappingError: null,
    mappingUploading: false,
    libraries: [],
    librariesLoading: false,
    librariesError: null,
    libraryUploading: false,
    libraryUploadWarnings: [],
    activeLibraryId: null,
    libraryData: [],
    libraryDataTotal: 0,
    libraryDataPage: 1,
    libraryDataQuery: "",
    libraryDataLoading: false,
    libraryDataError: null,
  };
}

export async function adminLogin(host: AdminDataHost, password: string): Promise<void> {
  patch(host, { loginLoading: true, loginError: null });
  try {
    const res = await fetch(apiUrl(host.basePath, "/api/admin/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json().catch(() => ({}))) as { detail?: unknown; token?: string };
    if (res.status === 503) {
      patch(host, {
        loginError: "管理功能未启用（服务端未配置 ADMIN_PASSWORD）",
        loginLoading: false,
      });
      return;
    }
    if (!res.ok) {
      const d = data.detail;
      const msg =
        typeof d === "string"
          ? d
          : Array.isArray(d) && d[0] && typeof (d[0] as { msg?: string }).msg === "string"
            ? (d[0] as { msg: string }).msg
            : "登录失败";
      patch(host, { loginError: msg, loginLoading: false });
      return;
    }
    if (data.token) {
      sessionStorage.setItem("admin_token", data.token);
      patch(host, { token: data.token, loginLoading: false, loginError: null });
    } else {
      patch(host, { loginError: "未返回 token", loginLoading: false });
    }
  } catch (e) {
    patch(host, { loginError: String(e), loginLoading: false });
  }
}

export function adminLogout(host: AdminDataHost): void {
  sessionStorage.removeItem("admin_token");
  patch(host, { token: null });
}

export async function loadPriceLibrary(host: AdminDataHost): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { priceLoading: true, priceError: null });
  try {
    const params: Record<string, string | number> = {
      q: host.adminData.priceQuery,
      page: host.adminData.pricePage,
      page_size: host.adminData.pricePageSize,
    };
    const res = await fetch(apiUrl(host.basePath, "/api/admin/price-library", params), {
      headers: authHeaders(tok),
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (res.status === 503) {
      patch(host, {
        priceLoading: false,
        priceError: "管理功能未启用（服务端未配置 ADMIN_PASSWORD）",
      });
      return;
    }
    if (!res.ok) {
      const t = await res.text();
      patch(host, { priceLoading: false, priceError: t || `HTTP ${res.status}` });
      return;
    }
    const data = (await res.json()) as { items: AdminDataState["priceItems"]; total: number };
    patch(host, {
      priceItems: data.items,
      priceTotal: data.total,
      priceLoading: false,
    });
  } catch (e) {
    patch(host, { priceLoading: false, priceError: String(e) });
  }
}

export function patchPriceItem(host: AdminDataHost, index: number, partial: Partial<PriceRow>): void {
  const items = host.adminData.priceItems.slice();
  if (index < 0 || index >= items.length) return;
  items[index] = { ...items[index], ...partial };
  patch(host, { priceItems: items });
}

export function addPriceRow(host: AdminDataHost): void {
  patch(host, {
    priceItems: [
      ...host.adminData.priceItems,
      {
        material: "",
        description: "",
        price_a: null,
        price_b: null,
        price_c: null,
        price_d: null,
      },
    ],
  });
}

export async function savePriceRow(host: AdminDataHost, row: PriceRow): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  try {
    const isNew = row.id == null;
    const url = isNew
      ? apiUrl(host.basePath, "/api/admin/price-library")
      : apiUrl(host.basePath, `/api/admin/price-library/${row.id}`);
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: authHeaders(tok),
      body: JSON.stringify({
        material: row.material,
        description: row.description,
        price_a: row.price_a,
        price_b: row.price_b,
        price_c: row.price_c,
        price_d: row.price_d,
      }),
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { priceError: await res.text() });
      return;
    }
    await loadPriceLibrary(host);
  } catch (e) {
    patch(host, { priceError: String(e) });
  }
}

export async function deletePriceRow(host: AdminDataHost, id: number): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  try {
    const res = await fetch(apiUrl(host.basePath, `/api/admin/price-library/${id}`), {
      method: "DELETE",
      headers: { "X-Admin-Token": tok },
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { priceError: (await res.text()) || `HTTP ${res.status}` });
      return;
    }
    await loadPriceLibrary(host);
  } catch (e) {
    patch(host, { priceError: String(e) });
  }
}

export async function uploadPriceLibrary(host: AdminDataHost, file: File): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { priceUploading: true, priceError: null });
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(apiUrl(host.basePath, "/api/admin/price-library/upload"), {
      method: "POST",
      headers: { "X-Admin-Token": tok },
      body: form,
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { priceError: await res.text(), priceUploading: false });
      return;
    }
    await loadPriceLibrary(host);
    patch(host, { priceUploading: false });
  } catch (e) {
    patch(host, { priceError: String(e), priceUploading: false });
  }
}

export async function loadProductMapping(host: AdminDataHost): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { mappingLoading: true, mappingError: null });
  try {
    const params: Record<string, string | number> = {
      q: host.adminData.mappingQuery,
      page: host.adminData.mappingPage,
      page_size: host.adminData.mappingPageSize,
    };
    const res = await fetch(apiUrl(host.basePath, "/api/admin/product-mapping", params), {
      headers: authHeaders(tok),
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (res.status === 503) {
      patch(host, {
        mappingLoading: false,
        mappingError: "管理功能未启用（服务端未配置 ADMIN_PASSWORD）",
      });
      return;
    }
    if (!res.ok) {
      patch(host, { mappingLoading: false, mappingError: await res.text() });
      return;
    }
    const data = (await res.json()) as { items: AdminDataState["mappingItems"]; total: number };
    patch(host, {
      mappingItems: data.items,
      mappingTotal: data.total,
      mappingLoading: false,
    });
  } catch (e) {
    patch(host, { mappingLoading: false, mappingError: String(e) });
  }
}

export function patchMappingItem(host: AdminDataHost, index: number, partial: Partial<MappingRow>): void {
  const items = host.adminData.mappingItems.slice();
  if (index < 0 || index >= items.length) return;
  items[index] = { ...items[index], ...partial };
  patch(host, { mappingItems: items });
}

export function addMappingRow(host: AdminDataHost): void {
  patch(host, {
    mappingItems: [
      ...host.adminData.mappingItems,
      {
        inquiry_name: "",
        spec: "",
        product_code: "",
        quotation_name: "",
      },
    ],
  });
}

export async function saveMappingRow(host: AdminDataHost, row: MappingRow): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  try {
    const isNew = row.id == null;
    const url = isNew
      ? apiUrl(host.basePath, "/api/admin/product-mapping")
      : apiUrl(host.basePath, `/api/admin/product-mapping/${row.id}`);
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: authHeaders(tok),
      body: JSON.stringify({
        inquiry_name: row.inquiry_name,
        spec: row.spec,
        product_code: row.product_code,
        quotation_name: row.quotation_name,
      }),
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { mappingError: await res.text() });
      return;
    }
    await loadProductMapping(host);
  } catch (e) {
    patch(host, { mappingError: String(e) });
  }
}

export async function deleteMappingRow(host: AdminDataHost, id: number): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  try {
    const res = await fetch(apiUrl(host.basePath, `/api/admin/product-mapping/${id}`), {
      method: "DELETE",
      headers: { "X-Admin-Token": tok },
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { mappingError: (await res.text()) || `HTTP ${res.status}` });
      return;
    }
    await loadProductMapping(host);
  } catch (e) {
    patch(host, { mappingError: String(e) });
  }
}

export async function uploadProductMapping(host: AdminDataHost, file: File): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { mappingUploading: true, mappingError: null });
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(apiUrl(host.basePath, "/api/admin/product-mapping/upload"), {
      method: "POST",
      headers: { "X-Admin-Token": tok },
      body: form,
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { mappingError: await res.text(), mappingUploading: false });
      return;
    }
    await loadProductMapping(host);
    patch(host, { mappingUploading: false });
  } catch (e) {
    patch(host, { mappingError: String(e), mappingUploading: false });
  }
}

export async function loadLibraries(host: AdminDataHost): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { librariesLoading: true, librariesError: null });
  try {
    const res = await fetch(apiUrl(host.basePath, "/api/admin/libraries"), {
      headers: authHeaders(tok),
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { librariesLoading: false, librariesError: await res.text() });
      return;
    }
    const data = (await res.json()) as { items: LibraryMeta[] };
    patch(host, { libraries: data.items, librariesLoading: false });
  } catch (e) {
    patch(host, { librariesLoading: false, librariesError: String(e) });
  }
}

export async function uploadLibrary(host: AdminDataHost, file: File, name: string): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { libraryUploading: true, librariesError: null, libraryUploadWarnings: [] });
  try {
    const form = new FormData();
    form.append("file", file);
    form.append("name", name);
    const res = await fetch(apiUrl(host.basePath, "/api/admin/libraries/upload"), {
      method: "POST",
      headers: { "X-Admin-Token": tok },
      body: form,
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { librariesError: await res.text(), libraryUploading: false });
      return;
    }
    const data = (await res.json()) as { warnings?: string[] };
    patch(host, { libraryUploading: false, libraryUploadWarnings: data.warnings ?? [] });
    await loadLibraries(host);
  } catch (e) {
    patch(host, { librariesError: String(e), libraryUploading: false });
  }
}

export async function loadLibraryData(host: AdminDataHost, libId: number): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { activeLibraryId: libId, libraryDataLoading: true, libraryDataError: null });
  try {
    const params: Record<string, string | number> = {
      q: host.adminData.libraryDataQuery,
      page: host.adminData.libraryDataPage,
      page_size: 100,
    };
    const res = await fetch(apiUrl(host.basePath, `/api/admin/libraries/${libId}/data`, params), {
      headers: authHeaders(tok),
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { libraryDataLoading: false, libraryDataError: await res.text() });
      return;
    }
    const data = (await res.json()) as { items: LibraryRow[]; total: number };
    patch(host, { libraryData: data.items, libraryDataTotal: data.total, libraryDataLoading: false });
  } catch (e) {
    patch(host, { libraryDataLoading: false, libraryDataError: String(e) });
  }
}

export function patchLibraryRow(host: AdminDataHost, index: number, key: string, value: unknown): void {
  const items = host.adminData.libraryData.slice();
  if (index < 0 || index >= items.length) return;
  items[index] = { ...items[index], [key]: value };
  patch(host, { libraryData: items });
}

export function addLibraryRow(host: AdminDataHost, libId: number): void {
  const lib = host.adminData.libraries.find((l) => l.id === libId);
  if (!lib) return;
  const emptyRow: LibraryRow = {};
  for (const col of lib.columns) {
    emptyRow[col.name] = col.type === "NUMERIC" ? null : "";
  }
  patch(host, { libraryData: [...host.adminData.libraryData, emptyRow] });
}

export async function saveLibraryRow(host: AdminDataHost, libId: number, row: LibraryRow): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  try {
    const lib = host.adminData.libraries.find((l) => l.id === libId);
    if (!lib) return;
    const isNew = row.id == null;
    const body: Record<string, unknown> = {};
    for (const col of lib.columns) {
      body[col.name] = row[col.name] ?? (col.type === "NUMERIC" ? null : "");
    }
    const url = isNew
      ? apiUrl(host.basePath, `/api/admin/libraries/${libId}/data`)
      : apiUrl(host.basePath, `/api/admin/libraries/${libId}/data/${row.id}`);
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: authHeaders(tok),
      body: JSON.stringify(body),
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { libraryDataError: await res.text() });
      return;
    }
    await loadLibraryData(host, libId);
  } catch (e) {
    patch(host, { libraryDataError: String(e) });
  }
}

export async function deleteLibraryRow(host: AdminDataHost, libId: number, rowId: number): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  try {
    const res = await fetch(apiUrl(host.basePath, `/api/admin/libraries/${libId}/data/${rowId}`), {
      method: "DELETE",
      headers: { "X-Admin-Token": tok },
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { libraryDataError: (await res.text()) || `HTTP ${res.status}` });
      return;
    }
    await loadLibraryData(host, libId);
  } catch (e) {
    patch(host, { libraryDataError: String(e) });
  }
}

export async function dropLibrary(host: AdminDataHost, libId: number): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  try {
    const res = await fetch(apiUrl(host.basePath, `/api/admin/libraries/${libId}`), {
      method: "DELETE",
      headers: { "X-Admin-Token": tok },
    });
    if (res.status === 401) {
      adminLogout(host);
      return;
    }
    if (!res.ok) {
      patch(host, { librariesError: (await res.text()) || `HTTP ${res.status}` });
      return;
    }
    patch(host, { activeLibraryId: null, libraryData: [] });
    await loadLibraries(host);
  } catch (e) {
    patch(host, { librariesError: String(e) });
  }
}
