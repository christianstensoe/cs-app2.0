import { NextResponse } from "next/server";
import stravaConfig from "../../../../lib/config/stravaConfig";
import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    // Get the authorization code from the URL parameters
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "No authorization code provided" },
        { status: 400 }
      );
    }

    // Exchange the authorization code for tokens
    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: stravaConfig.clientId,
        client_secret: stravaConfig.clientSecret,
        code: code,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(
        `Failed to exchange code for token: ${tokenResponse.status}`
      );
    }

    const tokenData = await tokenResponse.json();

    // Save the tokens
    const TOKEN_FILE_PATH = path.join(
      process.cwd(),
      "lib",
      "strava",
      "token.json"
    );
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokenData, null, 2));

    // Redirect back to the Strava page
    return NextResponse.redirect(new URL("/strava", request.url));
  } catch (error) {
    console.error("Error in Strava callback:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
