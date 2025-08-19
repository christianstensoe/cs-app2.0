import { getValidToken } from "../../../../lib/strava/tokenManager";

export async function GET() {
  try {
    // Get a valid token
    const accessToken = await getValidToken();

    // First get the athlete ID
    const athleteResponse = await fetch(
      "https://www.strava.com/api/v3/athlete",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!athleteResponse.ok) {
      throw new Error(`Athlete API error: ${athleteResponse.status}`);
    }

    const athleteData = await athleteResponse.json();
    const athleteId = athleteData.id;

    // Get athlete stats
    const statsResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!statsResponse.ok) {
      throw new Error(`Stats API error: ${statsResponse.status}`);
    }

    const statsData = await statsResponse.json();

    return Response.json({
      success: true,
      athlete: {
        id: athleteData.id,
        name: athleteData.firstname + " " + athleteData.lastname,
      },
      stats: {
        ytd_run_totals: statsData.ytd_run_totals || {
          count: 0,
          distance: 0,
          moving_time: 0,
          elevation_gain: 0,
        },
        all_run_totals: statsData.all_run_totals || {
          count: 0,
          distance: 0,
          moving_time: 0,
          elevation_gain: 0,
        },
        recent_run_totals: statsData.recent_run_totals || {
          count: 0,
          distance: 0,
          moving_time: 0,
          elevation_gain: 0,
        },
        gear: statsData.gear || [],
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
        message: "Failed to fetch athlete stats",
      },
      { status: 500 }
    );
  }
}
