import React from "react";
import StravaStatsDisplay from "./StravaStatsDisplay";

export const metadata = {
  title: "Running Stats",
  description: "My Strava running statistics and activities",
  keywords: "strava, running, fitness, stats",
};

export default async function StravaPage() {
  // Fetch both activities and stats data
  const [activitiesResponse, statsResponse] = await Promise.all([
    fetch("http://localhost:3001/api/strava/activities", {
      cache: "no-store",
    }),
    fetch("http://localhost:3001/api/strava/stats", {
      cache: "no-store",
    }),
  ]);

  const activitiesData = await activitiesResponse.json();
  const statsData = await statsResponse.json();

  // Combine the data
  const transformedData = {
    // Recent activities data (last 30 days)
    recent_run_totals: {
      count: activitiesData.totals?.count || 0,
      distance: activitiesData.totals?.distance || 0,
      moving_time: activitiesData.totals?.moving_time || 0,
      elevation_gain: activitiesData.totals?.elevation_gain || 0,
    },
    // YTD stats from Strava
    ytd_run_totals: statsData.stats?.ytd_run_totals || {
      count: 0,
      distance: 0,
      moving_time: 0,
      elevation_gain: 0,
    },
    // All-time stats from Strava
    all_run_totals: statsData.stats?.all_run_totals || {
      count: 0,
      distance: 0,
      moving_time: 0,
      elevation_gain: 0,
    },
    // Gear from stats
    gear: statsData.stats?.gear || [],
    // Recent activities
    recentActivities: activitiesData.recentActivities || [],
  };

  return <StravaStatsDisplay data={transformedData} />;
}
