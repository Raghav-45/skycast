import Image from 'next/image'

const timeData = [
  {
    time: '7 PM',
    image_url: '/weather_icons/04d.png',
    condition: 'broken clouds',
    temp: 13,
  },
  {
    time: '10 PM',
    image_url: '/weather_icons/04d.png',
    condition: 'broken clouds',
    temp: 12,
  },
  {
    time: '1 AM',
    image_url: '/weather_icons/03n.png',
    condition: 'scattered clouds',
    temp: 9,
  },
  {
    time: '4 AM',
    image_url: '/weather_icons/01n.png',
    condition: 'clear sky',
    temp: 7,
  },
  {
    time: '7 AM',
    image_url: '/weather_icons/01d.png',
    condition: 'clear sky',
    temp: 8,
  },
  {
    time: '10 AM',
    image_url: '/weather_icons/01d.png',
    condition: 'clear sky',
    temp: 15,
  },
  {
    time: '1 PM',
    image_url: '/weather_icons/01d.png',
    condition: 'clear sky',
    temp: 19,
  },
  {
    time: '4 PM',
    image_url: '/weather_icons/01d.png',
    condition: 'clear sky',
    temp: 20,
  },
]

const windData = [
  {
    time: '7 AM',
    image_url: '/weather_icons/direction.png',
    condition: 'direction',
    direction: 90,
    speed: 14,
  },
  {
    time: '10 AM',
    image_url: '/weather_icons/direction.png',
    condition: 'direction',
    direction: 90,
    speed: 12,
  },
  {
    time: '1 PM',
    image_url: '/weather_icons/direction.png',
    condition: 'direction',
    direction: 90,
    speed: 12,
  },
  {
    time: '4 PM',
    image_url: '/weather_icons/direction.png',
    condition: 'direction',
    direction: 90,
    speed: 13,
  },
  {
    time: '7 PM',
    image_url: '/weather_icons/direction.png',
    condition: 'direction',
    direction: 90,
    speed: 13,
  },
  {
    time: '10 PM',
    image_url: '/weather_icons/direction.png',
    condition: 'direction',
    direction: 90,
    speed: 11,
  },
  {
    time: '1 AM',
    image_url: '/weather_icons/direction.png',
    condition: 'direction',
    direction: 90,
    speed: 7,
  },
  {
    time: '4 AM',
    image_url: '/weather_icons/direction.png',
    condition: 'direction',
    direction: 90,
    speed: 7,
  },
]

export default function TodayAtCard() {
  return (
    <div className="pt-2 text-[#DDDAE5] h-full flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">Today At</h2>
      <div className="grid grid-cols-8 gap-4">
        {timeData.map((data, index) => (
          <div
            key={index}
            className="bg-[#1D1C1F] rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <p>{data.time}</p>
            <Image
              src={data.image_url}
              height={48}
              width={48}
              loading="lazy"
              alt={data.condition}
              title={data.condition}
            />
            <p>{data.temp}°</p>
          </div>
        ))}
        {windData.map((data, index) => (
          <div
            key={index}
            className="bg-[#1D1C1F] rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <p>{data.time}</p>
            <Image
              src={data.image_url}
              height={48}
              width={48}
              loading="lazy"
              alt={data.condition}
              title={data.condition}
              style={{
                transform: `rotate(${90 + Math.floor(Math.random() * 90)}deg)`,
              }}
            />
            <p>{data.speed} km/h</p>
          </div>
        ))}
      </div>
    </div>
  )
}
