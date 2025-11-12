-- Run this script against the Postgres instance that backs the Weekly app.
-- It creates the tasks table used by the application API and UI.

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    curriculum TEXT NOT NULL,
    task TEXT NOT NULL,
    platform TEXT NOT NULL,
    due_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tasks_updated_at ON tasks;

CREATE TRIGGER trg_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
