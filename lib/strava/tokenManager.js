import fs from "fs";
import path from "path";
import stravaConfig from "../config/stravaConfig";

// Path to store the token file
const TOKEN_FILE_PATH = path.join(process.cwd(), "lib", "strava", "token.json");

// Function to read the token from file
const readTokenFromFile = () => {
  try {
    if (fs.existsSync(TOKEN_FILE_PATH)) {
      const tokenData = fs.readFileSync(TOKEN_FILE_PATH, "utf8");
      return JSON.parse(tokenData);
    }
  } catch (error) {
    console.error("Error reading token file:", error);
  }
  return null;
};

// Function to write the token to file
const writeTokenToFile = (tokenData) => {
  try {
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokenData, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing token file:", error);
    return false;
  }
};

// Function to check if token is expired
const isTokenExpired = (tokenData) => {
  if (!tokenData || !tokenData.expires_at) return true;

  // Add a 5-minute buffer to ensure we refresh before actual expiration
  const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  return Date.now() >= tokenData.expires_at * 1000 - bufferTime;
};

// Function to refresh the token
const refreshToken = async () => {
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    client_id: stravaConfig.clientId,
    client_secret: stravaConfig.clientSecret,
    refresh_token: stravaConfig.refreshToken,
    grant_type: "refresh_token",
  });

  try {
    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "post",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to refresh token: ${response.status} ${response.statusText}`
      );
    }

    const tokenData = await response.json();

    // Store the new token
    writeTokenToFile(tokenData);

    return tokenData;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Main function to get a valid token
const getValidToken = async () => {
  // Try to read the token from file
  let tokenData = readTokenFromFile();

  // If token doesn't exist or is expired, refresh it
  if (!tokenData || isTokenExpired(tokenData)) {
    tokenData = await refreshToken();
  }

  return tokenData.access_token;
};

export { getValidToken, refreshToken };
