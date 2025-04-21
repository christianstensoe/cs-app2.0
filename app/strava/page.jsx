import React from "react";
import StravaComponent from "../../lib/strava/stravaApi";
import { FaRunning, FaStopwatch, FaMountain } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";

export const metadata = {
  title: "Running Stats",
  description: "My Strava running statistics and activities",
  keywords: "strava, running, fitness, stats",
};

async function StatsDisplay() {
  const data = await StravaComponent();

  if (data.error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400">{data.message}</p>
        <p className="text-sm text-red-500 dark:text-red-500 mt-2">
          {data.details}
        </p>
      </div>
    );
  }

  const { ytd_run_totals, recent_run_totals, all_run_totals, gear } = data;

  return (
    <div className="space-y-8">
      {/* YTD Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Year to Date
          </h2>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaRunning className="text-blue-500" />
              <span>
                Runs:{" "}
                <span className="font-semibold">{ytd_run_totals.count}</span>
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaMountain className="text-blue-500" />
              <span>
                Distance:{" "}
                <span className="font-semibold">
                  {(ytd_run_totals.distance / 1000).toFixed(1)} km
                </span>
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaStopwatch className="text-blue-500" />
              <span>
                Time:{" "}
                <span className="font-semibold">
                  {Math.round(ytd_run_totals.moving_time / 3600)} hours
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Recent Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Last 4 Weeks
          </h2>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaRunning className="text-blue-500" />
              <span>
                Runs:{" "}
                <span className="font-semibold">{recent_run_totals.count}</span>
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaMountain className="text-blue-500" />
              <span>
                Distance:{" "}
                <span className="font-semibold">
                  {(recent_run_totals.distance / 1000).toFixed(1)} km
                </span>
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaStopwatch className="text-blue-500" />
              <span>
                Elevation:{" "}
                <span className="font-semibold">
                  {recent_run_totals.elevation_gain} m
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* All Time Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            All Time
          </h2>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaRunning className="text-blue-500" />
              <span>
                Total Runs:{" "}
                <span className="font-semibold">{all_run_totals.count}</span>
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaMountain className="text-blue-500" />
              <span>
                Total Distance:{" "}
                <span className="font-semibold">
                  {(all_run_totals.distance / 1000).toFixed(0)} km
                </span>
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <FaStopwatch className="text-blue-500" />
              <span>
                Total Time:{" "}
                <span className="font-semibold">
                  {Math.round(all_run_totals.moving_time / 3600)} hours
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Running Shoes Section */}
      {gear && gear.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <GiRunningShoe className="text-blue-500" />
            My Running Shoes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gear.map((shoe) => (
              <div
                key={shoe.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {shoe.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-300">
                    Distance: {(shoe.distance / 1000).toFixed(0)} km
                  </p>
                  {shoe.retired && <p className="text-red-500">Retired</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function StravaPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Strava <span className="text-blue-600 dark:text-blue-400">Stats</span>
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
        Track my running activities and statistics from Strava. See my progress,
        achievements, and recent activities.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <StatsDisplay />
      </div>
    </div>
  );
}
