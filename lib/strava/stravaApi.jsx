import { getValidToken } from "./tokenManager";

export default async function StravaComponent() {
  try {
    // Get a valid token (will refresh if needed)
    const accessToken = await getValidToken();
    console.log("Using access token:", accessToken.substring(0, 10) + "...");

    // First, get the authenticated athlete's ID and gear
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
      console.error(
        `Athlete API error: ${athleteResponse.status} ${athleteResponse.statusText}`
      );
      throw new Error(`Athlete API error: ${athleteResponse.status}`);
    }

    const athleteData = await athleteResponse.json();
    const athleteId = athleteData.id;
    const shoes = athleteData.shoes || [];

    console.log(`Authenticated as athlete ID: ${athleteId}`);
    console.log("Found shoes:", shoes);

    // Now get the stats using the authenticated athlete's ID
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
      console.error(
        `Stats API error: ${statsResponse.status} ${statsResponse.statusText}`
      );
      throw new Error(`Stats API error: ${statsResponse.status}`);
    }

    const statsData = await statsResponse.json();

    // Return combined data
    return {
      ...statsData,
      gear: shoes,
    };
  } catch (error) {
    console.error("Error fetching Strava data:", error);
    // Return a more user-friendly error message
    return {
      error: true,
      message: "Unable to fetch Strava data. Please try again later.",
      details: error.message,
    };
  }
}
