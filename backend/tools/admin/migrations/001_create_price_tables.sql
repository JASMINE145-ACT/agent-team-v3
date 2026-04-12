-- 万鼎价格库 / 产品映射表（Neon PostgreSQL）
-- 由 repository.setup_tables() 在启动时执行；亦可由运维手动 applied。

CREATE TABLE IF NOT EXISTS price_library (
    id          SERIAL PRIMARY KEY,
    material    TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    price_a     NUMERIC,
    price_b     NUMERIC,
    price_c     NUMERIC,
    price_d     NUMERIC,
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_price_library_description_gin
    ON price_library USING gin (to_tsvector('simple', description));

CREATE TABLE IF NOT EXISTS product_mapping (
    id              SERIAL PRIMARY KEY,
    inquiry_name    TEXT NOT NULL DEFAULT '',
    spec            TEXT DEFAULT '',
    product_code    TEXT NOT NULL DEFAULT '',
    quotation_name  TEXT DEFAULT '',
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
