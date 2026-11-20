import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

/**
 * Drizzle client over Neon's HTTP driver. Returns null when DATABASE_URL is
 * absent so the site (which renders its directory content from the static
 * content module) still builds and runs. Form endpoints degrade gracefully.
 */
export const db = connectionString
  ? drizzle(neon(connectionString), { schema })
  : null;

export { schema };
