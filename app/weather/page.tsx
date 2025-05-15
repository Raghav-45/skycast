'use client'

import { useState } from 'react'
import CurrentWeatherCard from '@/components/CurrentWeatherCard'
import TodaysHighlightCard from '@/components/TodaysHighlightCard'
import TodayAtCard from '@/components/TodayAtCard'

export default function Home() {
  return (
    <div className="flex flex-col gap-y-8 container max-w-[1600px] px-9 mx-auto">
      <div className="grid grid-cols-[360px_minmax(0,1fr)] gap-8 w-full">
        <CurrentWeatherCard />
        <div className='flex flex-col gap-8'>
          <TodaysHighlightCard />
          <TodayAtCard />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-[360px]">
          <CurrentWeatherCard />
        </div>
        <div className="w-[360px]"></div>
      </div>
    </div>
  )
}
