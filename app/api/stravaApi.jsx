import stravaConfig from "../config/stravaConfig";

const StravaComponent = async (req, res) => {
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

  const url = "https://www.strava.com/oauth/token";

  const reAuthResponse = await fetch(url, {
    method: "post",
    headers: headers,
    body: body,
  });

  const reAuthJson = await reAuthResponse.json();

  const response = await fetch(
    "https://www.strava.com/api/v3/athletes/18336407/stats?access_token=" +
      reAuthJson.access_token
  );

  const json = await response.json();
  console.log(json);
  const { count, distance } = json.ytd_run_totals;
  const movingTime = json.ytd_run_totals.moving_time;

  const dis = (distance / 1000).toFixed(0);
  const tid = (movingTime / 3600).toFixed(0);

  return (
    <div className="flex justify-around items-center bg-slate-100 py-4">
      <div className="flex flex-col items-center p-4 shadow-lg rounded-lg">
        <h1 className="text-xl font-bold underline mb-2">Runs:</h1>
        <p className="text-lg">{count}</p>
      </div>
      <div className="flex flex-col items-center p-4 shadow-lg rounded-lg">
        <h1 className="text-xl font-bold underline mb-2">Distance:</h1>
        <p className="text-lg">{dis} KM</p>
      </div>
      <div className="flex flex-col items-center p-4 shadow-lg rounded-lg">
        <h1 className="text-xl font-bold underline mb-2">Moving Time:</h1>
        <p className="text-lg">{tid} Timer</p>
      </div>
    </div>
  );
};

export default StravaComponent;
