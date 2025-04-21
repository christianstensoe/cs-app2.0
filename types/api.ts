export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  start_date: string;
  start_date_local: string;
  average_speed: number;
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
  average_cadence?: number;
  average_watts?: number;
  max_watts?: number;
  kilojoules?: number;
  device_name?: string;
}

export interface StravaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete: {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    profile: string;
  };
}
