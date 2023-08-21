const StravaComponent = async (req, res) => {


  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  };
        

  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_SECRET,
    refresh_token: process.env.STRAVA_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });

  const url = "https://www.strava.com/oauth/token";

  const reAuthResponse = await fetch(url, {
    method: "post",
    "headers": headers,
    "body": body,
  });

  const reAuthJson = await reAuthResponse.json();

  const response = await fetch(
    "https://www.strava.com/api/v3/athletes/18336407/stats?access_token=" + reAuthJson.access_token
  );

  const json = await response.json();
  console.log(json)
  const { count, distance } =json.ytd_run_totals;
  const movingTime = json.ytd_run_totals.moving_time;

  const dis = (distance / 1000).toFixed(0)
  const tid = (movingTime/3600).toFixed(0)
  
  return(
    <div className="flex justify-between">
      <div className=" flex px-16 bg-slate-100 mx-5 flex-col">
        <h1 className="text-xl font-burtons underline">Runs:</h1>
        <p className=" text-center">{count}</p>
      </div>
      <div className=" flex px-16 bg-slate-100 flex-col">
        <h1 className="text-xl font-burtons underline"> Distance: </h1>
         <p className=" text-center">{dis} KM</p>
      </div>
      <div className=" flex px-16 bg-slate-100 mx-5 flex-col">
        <h1 className="text-xl font-burtons text underline">Moving time</h1>
        <p className=" text-center">{tid} Timer</p>
      </div>
    
      


      
      {/* Count: {count},
      Distance :{distance},
      Moving Time :{movingTime}  */}
    </div>
  )
  


}





export default StravaComponent;