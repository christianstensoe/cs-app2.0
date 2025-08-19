import { getValidToken } from "../../../../lib/strava/tokenManager";

export async function GET() {
  try {
    // Get a valid token
    const accessToken = await getValidToken();

    // Test the API connection with a simple athlete call
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

    // Get recent activities data using relative URL
    const activitiesResponse = await fetch("/api/strava/activities");
    const activitiesData = await activitiesResponse.json();

    return Response.json({
      success: true,
      message: "Token and API connection working",
      athlete: {
        id: athleteData.id,
        name: athleteData.firstname + " " + athleteData.lastname,
      },
      activities: activitiesData,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
        message: "Failed to refresh token or fetch data",
      },
      { status: 500 }
    );
  }
}
