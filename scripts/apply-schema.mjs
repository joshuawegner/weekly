import { readFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { Client } from "pg";

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined. Ensure it is provided before running the schema migration.");
  }

  const sslConfig = process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const schemaPath = resolve(__dirname, "../db/schema.sql");
  const schemaSql = await readFile(schemaPath, "utf-8");

  const client = new Client({ connectionString, ssl: sslConfig });

  try {
    await client.connect();
    await client.query("BEGIN");
    await client.query(schemaSql);
    await client.query("COMMIT");
    console.log("Database schema applied successfully.");
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Failed to rollback transaction", rollbackError);
    }

    console.error("Failed to apply database schema", error);
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
