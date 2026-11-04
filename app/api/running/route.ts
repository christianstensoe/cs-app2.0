import { NextResponse } from "next/server";
import { getRunningStats } from "@/lib/activities";

// Same caching as the /running page; the client polls this to pick up new runs.
export const revalidate = 900;

export async function GET() {
  try {
    const stats = await getRunningStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[/api/running] failed to load running stats:", error);
    return NextResponse.json(
      { error: "Failed to load running stats" },
      { status: 502 },
    );
  }
}
