/**
 * Create the tables (if missing) and do a full import of every Strava
 * activity into Postgres. Safe to re-run any time as a manual re-sync.
 * Run with: npm run db:sync
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { sql } from "@/lib/db";
import { fetchAllActivities, getAccessToken } from "@/lib/strava";
import { getRunningStats, upsertActivity } from "@/lib/activities";

const BATCH_SIZE = 100;

async function main() {
  const db = sql();

  // 1. Schema — the HTTP driver runs one statement per query.
  const schema = readFileSync(join(process.cwd(), "db/schema.sql"), "utf8")
    .replace(/--.*$/gm, "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const statement of schema) await db.query(statement);
  console.log(`Schema ready (${schema.length} statements).`);

  // 2. Fetch everything from Strava.
  const activities = await fetchAllActivities(await getAccessToken());
  console.log(`Fetched ${activities.length} activities from Strava.`);

  // 3. Upsert in batches, each batch in one transaction (one HTTP request).
  for (let i = 0; i < activities.length; i += BATCH_SIZE) {
    await db.transaction(
      activities.slice(i, i + BATCH_SIZE).map((a) => upsertActivity(a)),
    );
  }

  // 4. Remove rows for activities that no longer exist on Strava. Skipped if
  //    Strava returned nothing, so a bad response can't wipe the table.
  if (activities.length === 0) {
    console.log("No activities returned — skipping deletion.");
    return;
  }
  const ids = activities.map((a) => a.id);
  const removed = await db`
    DELETE FROM activities WHERE NOT (id = ANY(${ids}::bigint[])) RETURNING id
  `;
  console.log(`Upserted ${activities.length}, removed ${removed.length}.`);

  // 5. Show what the /running page will display.
  console.log("Running totals:", await getRunningStats());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
