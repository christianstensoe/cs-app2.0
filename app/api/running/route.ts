import { NextResponse } from "next/server";
import { getRunningStats } from "@/lib/strava";

// Cache the response for ~15 min; the client polls this to pick up new runs.
export const revalidate = 900;

export async function GET() {
  try {
    const stats = await getRunningStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[/api/running] failed to load Strava stats:", error);
    return NextResponse.json(
      { error: "Failed to load running stats" },
      { status: 502 },
    );
  }
}
