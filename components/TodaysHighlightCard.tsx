import {
  DropletIcon,
  EyeIcon,
  MoonIcon,
  SunIcon,
  ThermometerIcon,
  WavesIcon,
  WindIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function TodaysHighlightCard() {
  return (
    <div className="bg-[#1D1C1F] rounded-3xl p-8 text-[#DDDAE5] h-full flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">
        Todays Highlights
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="relative bg-black/15 rounded-2xl col-span-2 h-[180px] p-6 flex flex-col justify-between">
          <div className="absolute top-5 right-5">
            <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 border-amber-600/60 shadow-none rounded-full">
              {/* <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" /> */}
              Fair
            </Badge>
          </div>
          <h3 className="text-base font-semibold text-[#7B7980]">
            Air Quality Index
          </h3>
          <div className="flex w-full gap-6 items-center my-4">
            <WindIcon className="size-12" />
            <div className="flex flex-row w-full justify-evenly">
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold text-[#7B7980] mb-1">
                  PM2.5
                </p>
                <p className="text-3xl font-semibold text-[#DDDAE5]">4.74</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold text-[#7B7980] mb-1">SO2</p>
                <p className="text-3xl font-semibold text-[#DDDAE5]">6.25</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold text-[#7B7980] mb-1">NO2</p>
                <p className="text-3xl font-semibold text-[#DDDAE5]">8.77</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold text-[#7B7980] mb-1">O3</p>
                <p className="text-3xl font-semibold text-[#DDDAE5]">87.0</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black/15 rounded-2xl col-span-2 h-[180px] p-6 flex flex-col justify-between">
          <h3 className="text-base font-semibold text-[#7B7980]">
            Sunrise & Sunset
          </h3>
          <div className="flex flex-row items-center gap-x-2 my-4">
            <div className="flex w-full gap-6 items-center">
              <SunIcon className="size-12" />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-[#7B7980] mb-1">
                  Sunrise
                </p>
                <p className="text-3xl font-semibold text-[#DDDAE5]">6:00 AM</p>
              </div>
            </div>
            <div className="flex w-full gap-6 items-center">
              <MoonIcon className="size-12" />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-[#7B7980] mb-1">
                  Sunset
                </p>
                <p className="text-3xl font-semibold text-[#DDDAE5]">8:45 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-black/15 rounded-2xl h-[150px] p-6 flex flex-col justify-between">
          <h3 className="text-base font-semibold text-[#7B7980]">Humidity</h3>
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex w-full gap-6 items-center justify-between">
              <DropletIcon className="size-12" />
              <p className="text-3xl text-[#DDDAE5] font-semibold">
                69<span className="text-2xl">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-black/15 rounded-2xl h-[150px] p-6 flex flex-col justify-between">
          <h3 className="text-base font-semibold text-[#7B7980]">Pressure</h3>
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex w-full gap-6 items-center justify-between">
              <WavesIcon className="size-12" />
              <p className="text-3xl text-[#DDDAE5] font-semibold">
                1024<span className="text-2xl">hPa</span>
              </p>
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-black/15 rounded-2xl h-[150px] p-6 flex flex-col justify-between">
          <h3 className="text-base font-semibold text-[#7B7980]">Visibility</h3>
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex w-full gap-6 items-center justify-between">
              <EyeIcon className="size-12" />
              <p className="text-3xl text-[#DDDAE5] font-semibold">
                10<span className="text-2xl">km</span>
              </p>
            </div>
          </div>
        </div>

        {/* Feels Like */}
        <div className="bg-black/15 rounded-2xl h-[150px] p-6 flex flex-col justify-between">
          <h3 className="text-base font-semibold text-[#7B7980]">Feels Like</h3>
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex w-full gap-6 items-center justify-between">
              <ThermometerIcon className="size-12" />
              <p className="text-3xl text-[#DDDAE5] font-semibold">
                12°<span className="text-2xl">c</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
