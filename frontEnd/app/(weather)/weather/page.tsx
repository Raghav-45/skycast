'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CurrentWeatherCard from '@/components/CurrentWeatherCard'
import TodaysHighlightCard from '@/components/TodaysHighlightCard'
import TodayAtCard from '@/components/TodayAtCard'
import FiveDayForecastCard from '@/components/FiveDayForecastCard'
import { fetchWeatherData } from '@/lib/api'
import type { WeatherData } from '@/lib/types'

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : 51.5074 // London's latitude
        const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : -0.1278 // London's longitude
        
        const data = await fetchWeatherData(lat, lng)
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      } finally {
        setLoading(false)
      }
    }

    getWeatherData()
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-110px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#B5A1E5]"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-8 container max-w-[1600px] px-9 mx-auto">
      <div className="grid grid-cols-[360px_minmax(0,1fr)] gap-8 w-full">
        <div className="flex flex-col gap-4">
          <CurrentWeatherCard data={weatherData?.current} />
          <FiveDayForecastCard data={weatherData?.forecast} />
        </div>
        <div className="flex flex-col gap-4">
          <TodaysHighlightCard data={weatherData?.current} />
          <TodayAtCard data={weatherData?.current} />
        </div>
      </div>
    </div>
  )
}
