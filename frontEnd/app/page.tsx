'use client'

import { Suspense } from 'react'
import CurrentWeatherCard from '@/components/CurrentWeatherCard'
import FiveDayForecastCard from '@/components/FiveDayForecastCard'
import TodayAtCard from '@/components/TodayAtCard'
import TodaysHighlightCard from '@/components/TodaysHighlightCard'
import { Component as WeatherChart } from '@/components/TestChart'

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Current Weather Section */}
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Loading current weather...</div>}>
            <CurrentWeatherCard />
          </Suspense>
        </div>

        {/* Weather Chart */}
        <div className="lg:col-span-1">
          <Suspense fallback={<div>Loading weather chart...</div>}>
            <WeatherChart />
          </Suspense>
        </div>

        {/* Today&apos;s Forecast */}
        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading today&apos;s forecast...</div>}>
            <TodayAtCard />
          </Suspense>
        </div>

        {/* Today&apos;s Highlights */}
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Loading highlights...</div>}>
            <TodaysHighlightCard />
          </Suspense>
        </div>

        {/* 5-Day Forecast */}
        <div className="lg:col-span-1">
          <Suspense fallback={<div>Loading 5-day forecast...</div>}>
            <FiveDayForecastCard />
          </Suspense>
        </div>
      </div>
    </main>
  )
}