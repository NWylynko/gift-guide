import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { z } from "zod";

import * as driz from "drizzle-orm";
import * as schemas from "./schema";

const env = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
}).parse(process.env)

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn =
  globalForDb.conn ??
  new Pool({
    connectionString: env.DATABASE_URL,
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema: schemas });
const { sql } = driz;
export { schemas, driz, sql };
