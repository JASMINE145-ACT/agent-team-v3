-- Migration: Add quote_spec column to quotation_draft_lines table
-- Date: 2026-03-17
-- Purpose: Support separate display of quotation specification from inquiry specification

-- Check if column exists (PostgreSQL-safe way)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'quotation_draft_lines' 
        AND column_name = 'quote_spec'
    ) THEN
        ALTER TABLE quotation_draft_lines 
        ADD COLUMN quote_spec VARCHAR(500);
        
        RAISE NOTICE 'Column quote_spec added successfully to quotation_draft_lines';
    ELSE
        RAISE NOTICE 'Column quote_spec already exists in quotation_draft_lines';
    END IF;
END $$;
