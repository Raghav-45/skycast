import Image from 'next/image'

interface TodayAtProps {
  data?: {
    hourly: {
      time: string[]
      temperature_2m: number[]
      weather_code: number[]
      wind_speed_10m: number[]
      wind_direction_10m: number[]
    }
  }
}

export default function TodayAtCard({ data }: TodayAtProps) {
  if (!data) return null

  const { hourly } = data
  const currentHour = new Date().getHours()
  const next24Hours = Array.from({ length: 24 }, (_, i) => (currentHour + i) % 24)
  const nextHourIndices = next24Hours
    .map((hour) =>
      hourly.time.findIndex((time) => new Date(time).getHours() === hour)
    )
    .filter((i) => i !== -1)

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

  const formatHour = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    })
  }

  return (
    <div className="pt-2 text-[#DDDAE5] h-full flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">Today At</h2>
      <div className="grid grid-cols-8 gap-4">
        {nextHourIndices.slice(0, 8).map((index) => (
          <div
            key={hourly.time[index]}
            className="bg-[#1D1C1F] rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <p>{formatHour(hourly.time[index])}</p>
            <Image
              src={`/weather_icons/${weatherIconMap[hourly.weather_code[index]]}.png`}
              height={48}
              width={48}
              loading="lazy"
              alt={`Weather code ${hourly.weather_code[index]}`}
              title={`Weather code ${hourly.weather_code[index]}`}
            />
            <p>{Math.round(hourly.temperature_2m[index])}°</p>
          </div>
        ))}
        {nextHourIndices.slice(0, 8).map((index) => (
          <div
            key={`wind-${hourly.time[index]}`}
            className="bg-[#1D1C1F] rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <p>{formatHour(hourly.time[index])}</p>
            <Image
              src="/weather_icons/direction.png"
              height={48}
              width={48}
              loading="lazy"
              alt="Wind direction"
              title="Wind direction"
              style={{
                transform: `rotate(${hourly.wind_direction_10m[index]}deg)`,
              }}
            />
            <p>{Math.round(hourly.wind_speed_10m[index])} km/h</p>
          </div>
        ))}
      </div>
    </div>
  )
}
