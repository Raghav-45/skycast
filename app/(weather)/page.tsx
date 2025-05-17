'use client'

import CurrentWeatherCard from '@/components/CurrentWeatherCard'
import TodaysHighlightCard from '@/components/TodaysHighlightCard'
import TodayAtCard from '@/components/TodayAtCard'
import FiveDayForecastCard from '@/components/FiveDayForecastCard'

export default function Home() {
  return (
    <div className="flex flex-col gap-y-8 container max-w-[1600px] px-9 mx-auto">
      <div className="grid grid-cols-[360px_minmax(0,1fr)] gap-8 w-full">
        <div className="flex flex-col gap-4">
          <CurrentWeatherCard />
          <FiveDayForecastCard />
        </div>
        <div className="flex flex-col gap-4">
          <TodaysHighlightCard />
          <TodayAtCard />
        </div>
      </div>
    </div>
  )
}
