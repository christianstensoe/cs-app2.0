import React from 'react'
import StravaComponent from '../api/stravaApi'


const StravaPage = () => {
  return (
    <div className='pt-40'>
      <h1 className='text-2xl font-burtons text-center bg-slate-300'>Strava Stats
        <p className='text-sm'>2023</p>
      </h1>

      <StravaComponent/>
    </div>
  )
}

export default StravaPage