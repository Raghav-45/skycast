import Image from 'next/image'

interface FiveDayForecastProps {
  data?: {
    daily: {
      time: string[]
      weather_code: number[]
      temperature_2m_max: number[]
      temperature_2m_min: number[]
    }
  }
}

export default function FiveDayForecastCard({ data }: FiveDayForecastProps) {
  if (!data) return null

  const { daily } = data
  const weatherIconMap: { [key: number]: string } = {
    0: '01d', // Clear sky
    1: '02d', // Mainly clear
    2: '03d', // Partly cloudy
    3: '04d', // Overcast
    45: '50d', // Foggy
    48: '50d', // Depositing rime fog
    51: '09d', // Light drizzle
    53: '09d', // Moderate drizzle
    55: '09d', // Dense drizzle
    61: '10d', // Slight rain
    63: '10d', // Moderate rain
    65: '10d', // Heavy rain
    71: '13d', // Slight snow
    73: '13d', // Moderate snow
    75: '13d', // Heavy snow
    77: '13d', // Snow grains
    80: '09d', // Slight rain showers
    81: '09d', // Moderate rain showers
    82: '09d', // Violent rain showers
    85: '13d', // Slight snow showers
    86: '13d', // Heavy snow showers
    95: '11d', // Thunderstorm
    96: '11d', // Thunderstorm with slight hail
    99: '11d', // Thunderstorm with heavy hail
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }
  }

  return (
    <div className="pt-2 text-[#DDDAE5] flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">5 Days Forecast</h2>
      <div className="flex flex-col gap-y-3 bg-[#1D1C1F] rounded-3xl px-8 py-6">
        {daily.time.slice(0, 5).map((time, index) => {
          const formattedDate = formatDate(time)
          return (
            <div key={time} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={`/weather_icons/${weatherIconMap[daily.weather_code[index]]}.png`}
                  height={36}
                  width={36}
                  loading="lazy"
                  alt={`Weather code ${daily.weather_code[index]}`}
                  title={`Weather code ${daily.weather_code[index]}`}
                />
                <div className="w-[100px]">
                  <p className="text-[#7B7980] font-semibold">{formattedDate.day}</p>
                  <p className="text-sm">{formattedDate.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-semibold">{Math.round(daily.temperature_2m_max[index])}°</p>
                <p className="text-lg font-semibold text-[#7B7980]">{Math.round(daily.temperature_2m_min[index])}°</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
