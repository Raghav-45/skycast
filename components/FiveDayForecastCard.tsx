import Image from 'next/image'

interface ForecastDay {
  date: string
  day: string
  image_url: string
  condition: string
  temp_max: number
  temp_min: number
}

const forecastData: ForecastDay[] = [
  {
    date: '18 May',
    day: 'Sunday',
    image_url: '/weather_icons/01d.png',
    condition: 'clear sky',
    temp_max: 19,
    temp_min: 9,
  },
  {
    date: '19 May',
    day: 'Monday',
    image_url: '/weather_icons/01d.png',
    condition: 'clear sky',
    temp_max: 20,
    temp_min: 10,
  },
  {
    date: '20 May',
    day: 'Tuesday',
    image_url: '/weather_icons/04d.png',
    condition: 'broken clouds',
    temp_max: 21,
    temp_min: 11,
  },
  {
    date: '21 May',
    day: 'Wednesday',
    image_url: '/weather_icons/04d.png',
    condition: 'broken clouds',
    temp_max: 24,
    temp_min: 14,
  },
  {
    date: '22 May',
    day: 'Thursday',
    image_url: '/weather_icons/04d.png',
    condition: 'broken clouds',
    temp_max: 22,
    temp_min: 12,
  },
]

export default function FiveDayForecastCard() {
  return (
    <div className="pt-2 text-[#DDDAE5] flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">5 Days Forecast</h2>
      <div className="flex flex-col gap-y-3 bg-[#1D1C1F] rounded-3xl px-8 py-6">
        {forecastData.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={day.image_url}
                height={36}
                width={36}
                loading="lazy"
                alt={day.condition}
                title={day.condition}
              />
              <div className="w-[100px]">
                <p className="text-[#7B7980] font-semibold">{day.day}</p>
                <p className="text-sm">{day.date}</p>
              </div>
            </div>
            <p className="text-lg font-semibold">{day.temp_max}°</p>
          </div>
        ))}
      </div>
    </div>
  )
}
