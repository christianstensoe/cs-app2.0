import { useState, useEffect } from "react";
import axios from "axios";
import { StravaActivity, StravaTokenResponse } from "@/types/api";

export function useStrava() {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await axios.get<StravaActivity[]>(
        "/api/strava/activities"
      );
      setActivities(response.data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch activities"
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post<StravaTokenResponse>(
        "/api/strava/refresh"
      );
      return response.data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to refresh token"
      );
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    refreshToken,
    refetch: fetchActivities,
  };
}
