import { after, NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { syncActivity } from "@/lib/activities";

/** Shape of a Strava webhook event. It carries IDs only, never activity data. */
type StravaEvent = {
  object_type: "activity" | "athlete";
  object_id: number;
  aspect_type: "create" | "update" | "delete";
  owner_id: number;
  subscription_id: number;
  event_time: number;
};

const ASPECTS = new Set(["create", "update", "delete"]);

/**
 * Subscription check: when the webhook is registered, Strava calls this once
 * with a challenge, which we echo back if the verify token matches ours.
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const expected = process.env.STRAVA_VERIFY_TOKEN;

  if (
    expected &&
    params.get("hub.mode") === "subscribe" &&
    params.get("hub.verify_token") === expected
  ) {
    return NextResponse.json({ "hub.challenge": params.get("hub.challenge") });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

/**
 * Activity events. Strava expects a 200 within 2 seconds and retries
 * otherwise, so we acknowledge immediately and do the work in `after()`.
 *
 * Strava doesn't sign events, so we only act on our own athlete's events and
 * always re-fetch the activity from the Strava API: a forged event can at
 * most trigger a re-sync, never inject data.
 */
export async function POST(request: NextRequest) {
  let event: Partial<StravaEvent>;
  try {
    event = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const isOurActivity =
    event.object_type === "activity" &&
    typeof event.object_id === "number" &&
    ASPECTS.has(event.aspect_type ?? "") &&
    String(event.owner_id) === process.env.STRAVA_ATHLETE_ID;

  // Still 200 for events we ignore (e.g. athlete deauthorisation), otherwise
  // Strava keeps retrying them.
  if (!isOurActivity) {
    return NextResponse.json({ ignored: true });
  }

  const { object_id: id, aspect_type: aspect } = event as StravaEvent;
  after(async () => {
    try {
      await syncActivity(id, aspect);
      revalidatePath("/running");
      revalidatePath("/api/running");
    } catch (error) {
      console.error(`[webhook] failed to sync activity ${id} (${aspect}):`, error);
    }
  });

  return NextResponse.json({ ok: true });
}
