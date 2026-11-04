import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

/**
 * Postgres client (Neon's HTTP driver — one HTTP request per query, which
 * suits serverless functions). Created lazily so importing this module never
 * throws, e.g. during a build without DATABASE_URL.
 *
 * Always use it as a tagged template — sql`... ${value}` — so values are sent
 * as query parameters, never spliced into the SQL string (no SQL injection).
 */
export function sql(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("Missing required environment variable: DATABASE_URL");
    }
    client = neon(url);
  }
  return client;
}
