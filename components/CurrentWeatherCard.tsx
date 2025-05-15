import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import Image from 'next/image'

export default function CurrentWeatherCard() {
  return (
    <div className="bg-[#1D1C1F] rounded-3xl p-8 text-[#DDDAE5] h-full flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">Now</h2>
      <div className="flex items-center gap-2">
        <p className="text-7xl text-white font-normal">
          13°<sup className="text-5xl align-bottom">c</sup>
        </p>
        <Image
          height={75}
          width={75}
          src="/weather_icons/04d.png"
          alt="overcast clouds"
          className="mx-auto size-[75px]"
        />
      </div>
      <p className="text-base font-semibold text-[#DDDAE5]">Broken Clouds</p>
      <Separator className="my-1" />
      <ul className="space-y-3">
        <li className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          <p className="text-base font-semibold text-[#7B7980]">
            Thursday 15, May
          </p>
        </li>
        <li className="flex items-center gap-2">
          <MapPinIcon className="h-6 w-6" />
          <p className="text-base font-semibold text-[#7B7980]">London, GB</p>
        </li>
      </ul>
    </div>
  )
}
