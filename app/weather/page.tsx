'use client'

import { useState } from 'react'
import Header from '@/components/site-header'
import { CalendarIcon, Loader2, MapPinIcon } from 'lucide-react'
import CurrentWeatherCard from '@/components/CurrentWeatherCard'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="flex flex-col gap-y-8 container max-w-[1600px] px-9 mx-auto">
      <div className="grid grid-cols-[360px_minmax(0,1fr)] gap-8 w-full">
        <CurrentWeatherCard />
        <div className="">Right Content</div>
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
