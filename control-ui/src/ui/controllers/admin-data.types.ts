export type PriceRow = {
  id?: number;
  material: string;
  description: string;
  price_a: number | null;
  price_b: number | null;
  price_c: number | null;
  price_d: number | null;
};

export type MappingRow = {
  id?: number;
  inquiry_name: string;
  spec: string;
  product_code: string;
  quotation_name: string;
};

export type LibraryColumnDef = {
  name: string;
  type: "TEXT" | "NUMERIC";
  original_name: string;
  warnings: string[];
};

export type LibraryMeta = {
  id: number;
  name: string;
  table_name: string;
  columns: LibraryColumnDef[];
  row_count: number;
  created_at: string;
};

export type LibraryRow = Record<string, unknown> & { id?: number; _row_index?: number };

export type AdminDataState = {
  token: string | null;
  loginError: string | null;
  loginLoading: boolean;
  activeSubTab: "price" | "mapping" | "library";
  priceItems: PriceRow[];
  priceTotal: number;
  pricePage: number;
  pricePageSize: number;
  priceQuery: string;
  priceLoading: boolean;
  priceError: string | null;
  priceUploading: boolean;
  mappingItems: MappingRow[];
  mappingTotal: number;
  mappingPage: number;
  mappingPageSize: number;
  mappingQuery: string;
  mappingLoading: boolean;
  mappingError: string | null;
  mappingUploading: boolean;
  libraries: LibraryMeta[];
  librariesLoading: boolean;
  librariesError: string | null;
  libraryUploading: boolean;
  libraryUploadWarnings: string[];
  activeLibraryId: number | null;
  libraryData: LibraryRow[];
  libraryDataTotal: number;
  libraryDataPage: number;
  libraryDataQuery: string;
  libraryDataLoading: boolean;
  libraryDataError: string | null;
};

/** 须为带 @state() adminData 的组件实例（如 OpenClawApp），以便 patch 赋值触发重渲染 */
export type AdminDataHost = {
  basePath: string;
  adminData: AdminDataState;
};
