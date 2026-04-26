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
export type BkItem = { id: number; key: string; content: string; updated_at: string };

export type AdminDataState = {
  token: string | null;
  loginError: string | null;
  loginLoading: boolean;
  activeSubTab: "library" | "business-knowledge";
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
  libraryNewColumns: LibraryColumnDef[];
  librarySchemaLoading: boolean;
  librarySchemaError: string | null;
  librarySchemaOpen: boolean;
  bkItems: BkItem[];
  bkLoading: boolean;
  bkError: string | null;
  bkSaving: boolean;
  bkSaveKey: string | null;
  bkEditingKey: string | null;
  bkEditingContent: string;
};

/** 须为带 @state() adminData 的组件实例（如 OpenClawApp），以便 patch 赋值触发重渲染 */
export type AdminDataHost = {
  basePath: string;
  adminData: AdminDataState;
};
