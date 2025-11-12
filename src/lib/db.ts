import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined. Set it in your environment before starting the app.");
}

declare global {
  var __weekly_pg_pool__: Pool | undefined;
}

const pool = global.__weekly_pg_pool__ ?? new Pool({
  connectionString,
  ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined,
});

if (process.env.NODE_ENV !== "production") {
  global.__weekly_pg_pool__ = pool;
}

export async function runQuery<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  let client: PoolClient | undefined;

  try {
    client = await pool.connect();
    return await client.query<T>(text, params);
  } finally {
    client?.release();
  }
}
