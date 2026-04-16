-- 自定义数据库注册表（Neon PostgreSQL）
-- 由 repository.setup_tables() 在启动时执行

CREATE TABLE IF NOT EXISTS data_libraries (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    table_name  TEXT NOT NULL UNIQUE,
    columns     JSONB NOT NULL DEFAULT '[]',
    row_count   INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);
