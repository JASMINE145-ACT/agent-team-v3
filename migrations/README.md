# Database Migrations

## Overview

This folder contains manual database migration scripts for the Agent Team v3 project.

## Background

The application uses SQLAlchemy with automatic schema creation via `Base.metadata.create_all()`. However, for existing databases (especially production PostgreSQL/Neon instances), adding new columns requires explicit migration.

## Current Migrations

### 1. `add_quote_spec_column.sql` (2026-03-17)

**Purpose:** Add `quote_spec` column to `quotation_draft_lines` table to support separate display of:
- `specification`: Inquiry specification (from customer request)
- `quote_spec`: Quotation product specification (parsed from matched product name)

**Why needed:**
- The SQLAlchemy model already defines `quote_spec` field
- Auto-migration code in `data_service.py` was initially SQLite-only
- PostgreSQL/Neon production databases were missing this column
- Caused runtime error: `column "quote_spec" of relation "quotation_draft_lines" does not exist`

**How to apply:**

For **PostgreSQL/Neon**:
```bash
# Option 1: Using psql
psql -h <your-neon-host> -U <username> -d <database> -f migrations/add_quote_spec_column.sql

# Option 2: Direct SQL execution in Neon console
# Copy and paste the SQL content from add_quote_spec_column.sql
```

For **SQLite** (local development):
```bash
# The auto-migration in data_service.py handles this automatically
# No manual action needed
```

**Verification:**
```sql
-- Check if column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'quotation_draft_lines' 
AND column_name = 'quote_spec';

-- Expected output:
-- column_name | data_type
-- ------------+-----------
-- quote_spec  | character varying
```

## Auto-Migration System

Starting from 2026-03-17, the `_migrate_add_columns_if_needed()` method in `data_service.py` now supports **both SQLite and PostgreSQL**:

- **SQLite**: Uses `PRAGMA table_info()` to check existing columns
- **PostgreSQL**: Uses `information_schema.columns` to check existing columns

**Tables covered by auto-migration:**
1. `out_of_stock_records` - Email tracking columns, upload_batch_id, is_deleted
2. `shortage_records` - Email tracking columns
3. `quotation_draft_lines` - quote_spec column

**When it runs:**
- Automatically on application startup (in `DataService.__init__`)
- Safe to run multiple times (checks for existence before adding)
- Logs info messages when columns are added

## Manual Migration Best Practices

1. **Always backup production database before migration**
   ```bash
   # For Neon, use their backup feature or pg_dump
   pg_dump -h <host> -U <user> -d <db> > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Test migration on staging/dev first**
   - Never run untested migrations on production
   - Verify the SQL syntax and behavior

3. **Use idempotent migrations**
   - All migrations should check for existence before creating/altering
   - Should be safe to run multiple times

4. **Document each migration**
   - Add date, purpose, and verification steps
   - Include rollback instructions if applicable

## Rollback

To rollback the `quote_spec` column (not recommended unless data is corrupted):

```sql
-- WARNING: This will delete all quote_spec data
ALTER TABLE quotation_draft_lines DROP COLUMN quote_spec;
```

## Future Migrations

When adding new migrations:

1. Create a new `.sql` file in this directory
2. Use descriptive naming: `<date>_<description>.sql`
3. Include existence checks (idempotent)
4. Document in this README
5. Update `data_service.py` auto-migration if needed

## Related Files

- `backend/tools/oos/services/data_service.py` - Auto-migration logic
- `backend/tools/oos/services/data_service.py:104` - QuotationDraftLineDB model
- `backend/tools/quotation/spec_extract.py` - Specification parsing logic
- `control-ui/src/ui/types.ts:410` - Frontend type definitions
