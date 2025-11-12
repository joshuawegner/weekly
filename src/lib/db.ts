import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

declare global {
  var __weekly_pg_pool__: Pool | undefined;
}

function getPool(): Pool {
  if (process.env.NODE_ENV !== "production" && global.__weekly_pg_pool__) {
    return global.__weekly_pg_pool__;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined. Set it in your environment before starting the app.");
  }

  const pool = new Pool({
    connectionString,
    ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined,
  });

  if (process.env.NODE_ENV !== "production") {
    global.__weekly_pg_pool__ = pool;
  }

  return pool;
}

export async function runQuery<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  let client: PoolClient | undefined;

  try {
    client = await getPool().connect();
    return await client.query<T>(text, params);
  } finally {
    client?.release();
  }
}
