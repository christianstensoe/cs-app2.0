"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRunning,
  FaStopwatch,
  FaMountain,
  FaTrophy,
  FaCalendarAlt,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaSync,
} from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const StatCard = ({ title, icon: Icon, value, unit, color, delay = 0 }) => (
  <motion.div
    className="glass-effect rounded-3xl p-8 premium-shadow hover:premium-shadow-dark transition-all duration-300"
    variants={fadeInUp}
    whileHover={{ scale: 1.02 }}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    transition={{ delay }}
  >
    <div
      className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6`}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
      {value}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 mb-1">{title}</p>
    <p className="text-sm text-slate-500 dark:text-slate-500">{unit}</p>
  </motion.div>
);

const StatsDisplay = ({ data }) => {
  if (data.error) {
    return (
      <motion.div
        className="glass-effect rounded-3xl p-8 premium-shadow"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaRunning className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Connection Error
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {data.message}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            {data.details}
          </p>
        </div>
      </motion.div>
    );
  }

  const {
    ytd_run_totals,
    recent_run_totals,
    all_run_totals,
    gear,
    recentActivities,
  } = data;

  return (
    <div className="space-y-12">
      {/* Recent Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <StatCard
          title="Recent Runs"
          icon={FaRunning}
          value={recent_run_totals?.count || 0}
          unit="last 30 days"
          color="from-primary-500 to-accent-500"
          delay={0.1}
        />
        <StatCard
          title="Recent Distance"
          icon={FaMountain}
          value={
            recent_run_totals?.distance
              ? (recent_run_totals.distance / 1000).toFixed(1)
              : 0
          }
          unit="kilometers"
          color="from-blue-500 to-cyan-500"
          delay={0.2}
        />
        <StatCard
          title="Recent Time"
          icon={FaStopwatch}
          value={
            recent_run_totals?.moving_time
              ? Math.round(recent_run_totals.moving_time / 3600)
              : 0
          }
          unit="hours"
          color="from-green-500 to-emerald-500"
          delay={0.3}
        />
        <StatCard
          title="Recent Elevation"
          icon={FaTrophy}
          value={recent_run_totals?.elevation_gain || 0}
          unit="meters gained"
          color="from-purple-500 to-pink-500"
          delay={0.4}
        />
        <StatCard
          title="Average Distance"
          icon={FaMountain}
          value={
            recent_run_totals?.count
              ? (
                  recent_run_totals.distance /
                  1000 /
                  recent_run_totals.count
                ).toFixed(1)
              : 0
          }
          unit="km per run"
          color="from-orange-500 to-red-500"
          delay={0.5}
        />
        <StatCard
          title="Average Pace"
          icon={FaCalendarAlt}
          value={
            recent_run_totals?.moving_time && recent_run_totals?.distance
              ? (
                  recent_run_totals.moving_time /
                  60 /
                  (recent_run_totals.distance / 1000)
                ).toFixed(1)
              : 0
          }
          unit="min/km"
          color="from-indigo-500 to-purple-500"
          delay={0.6}
        />
      </motion.div>

      {/* YTD Stats */}
      <motion.div
        className="glass-effect rounded-3xl p-8 premium-shadow"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Year to Date <span className="text-gradient">Stats</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Your running achievements this year
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FaRunning className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {ytd_run_totals?.count || 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">YTD Runs</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FaMountain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {ytd_run_totals?.distance
                ? (ytd_run_totals.distance / 1000).toFixed(0)
                : 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">YTD Kilometers</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FaStopwatch className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {ytd_run_totals?.moving_time
                ? Math.round(ytd_run_totals.moving_time / 3600)
                : 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">YTD Hours</p>
          </div>
        </div>
      </motion.div>

      {/* All Time Stats */}
      <motion.div
        className="glass-effect rounded-3xl p-8 premium-shadow"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            All Time <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Your complete running journey and milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FaRunning className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {all_run_totals?.count || 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">Total Runs</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FaMountain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {all_run_totals?.distance
                ? (all_run_totals.distance / 1000).toFixed(0)
                : 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Total Kilometers
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FaStopwatch className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {all_run_totals?.moving_time
                ? Math.round(all_run_totals.moving_time / 3600)
                : 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">Total Hours</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activities */}
      {recentActivities && recentActivities.length > 0 && (
        <motion.div
          className="glass-effect rounded-3xl p-8 premium-shadow"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Recent <span className="text-gradient">Activities</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Your latest running activities from Strava
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentActivities.slice(0, 6).map((activity, index) => (
              <motion.div
                key={activity.id}
                className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  {activity.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Distance:</span>{" "}
                    {(activity.distance / 1000).toFixed(1)} km
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Time:</span>{" "}
                    {Math.round(activity.moving_time / 60)} min
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Elevation:</span>{" "}
                    {activity.total_elevation_gain} m
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(activity.start_date).toLocaleDateString()}
                  </p>
                  {activity.private && (
                    <p className="text-blue-500 font-medium">
                      Private Activity
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Running Shoes Section */}
      {gear && gear.length > 0 && (
        <motion.div
          className="glass-effect rounded-3xl p-8 premium-shadow"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
              <GiRunningShoe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Running <span className="text-gradient">Gear</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gear.map((shoe, index) => (
              <motion.div
                key={shoe.id}
                className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  {shoe.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Distance:</span>{" "}
                    {shoe.distance ? (shoe.distance / 1000).toFixed(0) : 0} km
                  </p>
                  {shoe.retired && (
                    <p className="text-red-500 font-medium">Retired</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function StravaStatsDisplay({ data }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshMessage("Refreshing data...");

    try {
      const response = await fetch("/api/strava/refresh");
      const result = await response.json();

      if (result.success) {
        setRefreshMessage(
          "Data refreshed successfully! Reload the page to see updates."
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setRefreshMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setRefreshMessage("Failed to refresh data. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-6 py-3 glass-effect text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </motion.button>
            </Link>

            <div className="flex gap-4">
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-6 py-3 glass-effect text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <FaSync
                  className={`mr-3 ${
                    isRefreshing ? "animate-spin" : "group-hover:rotate-180"
                  } transition-all duration-300`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </motion.button>

              <motion.a
                href="https://www.strava.com/athletes/christianstensoe"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300"
              >
                View on Strava
                <FaExternalLinkAlt className="ml-3 group-hover:scale-110 transition-transform duration-300" />
              </motion.a>
            </div>
          </div>

          {refreshMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <p
                className={`text-sm ${
                  refreshMessage.includes("Error")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {refreshMessage}
              </p>
            </motion.div>
          )}

          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              My <span className="text-gradient">Running</span> Journey
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Track my fitness progress, achievements, and running statistics
              from Strava. See my latest activities and performance metrics.
            </p>
          </div>
        </motion.div>

        {/* Stats Display */}
        <StatsDisplay data={data} />
      </div>
    </div>
  );
}
