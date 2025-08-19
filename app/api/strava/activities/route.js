import { getValidToken } from "../../../../lib/strava/tokenManager";

export async function GET() {
  try {
    // Get a valid token
    const accessToken = await getValidToken();
    console.log("Got access token:", accessToken.substring(0, 10) + "...");

    // Calculate timestamp for 30 days ago
    const thirtyDaysAgo = Math.floor(
      (Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000
    );
    const url = `https://www.strava.com/api/v3/athlete/activities?per_page=200&after=${thirtyDaysAgo}`;

    console.log("Fetching activities from:", url);

    // Get recent activities (last 30 days)
    const response = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(
        `Activities API error: ${response.status} - ${errorText}`
      );
    }

    const activities = await response.json();
    console.log("Got activities:", activities.length);

    // Filter for runs only
    const runs = activities.filter((activity) => activity.type === "Run");
    console.log("Filtered runs:", runs.length);

    // Calculate totals
    const totals = runs.reduce(
      (acc, run) => {
        acc.count++;
        acc.distance += run.distance;
        acc.moving_time += run.moving_time;
        acc.elevation_gain += run.total_elevation_gain;
        return acc;
      },
      { count: 0, distance: 0, moving_time: 0, elevation_gain: 0 }
    );

    return Response.json({
      success: true,
      recentActivities: runs.slice(0, 10), // Last 10 runs
      totals: {
        ...totals,
        distance_km: (totals.distance / 1000).toFixed(1),
        moving_time_hours: (totals.moving_time / 3600).toFixed(1),
      },
      debug: {
        totalActivities: activities.length,
        runsFound: runs.length,
        timestamp: thirtyDaysAgo,
        date: new Date(thirtyDaysAgo * 1000).toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
        message: "Failed to fetch recent activities",
      },
      { status: 500 }
    );
  }
}
