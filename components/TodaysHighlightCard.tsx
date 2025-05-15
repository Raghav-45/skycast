import { MoonIcon, SunIcon } from 'lucide-react'

export default function TodaysHighlightCard() {
  return (
    <div className="bg-[#1D1C1F] rounded-3xl p-8 text-[#DDDAE5] h-full flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">
        Todays Highlights
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-black/15 rounded-2xl col-span-2 h-[180px] p-6">
          <h3 className="text-base font-semibold text-[#7B7980]">
            Air Quality Index
          </h3>
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
        {/* <div className="rounded-xl h-[150px] p-6">Humidity</div> */}
        <div className="bg-black/15 rounded-2xl h-[150px] p-6 flex flex-col justify-between">
          <h3 className="text-base font-semibold text-[#7B7980]">Humidity</h3>
          <div className="flex flex-row items-center gap-x-2 my-4">
            <div className="flex w-full gap-6 items-center justify-between">
              <SunIcon className="size-12" />
              <p className="text-4xl text-white font-normal">
                69<sup className="text-4xl align-bottom">%</sup>
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl h-[150px] p-6">Pressure</div>
        <div className="rounded-xl h-[150px] p-6">Visibility</div>
        <div className="rounded-xl h-[150px] p-6">Feels Like</div>
      </div>
    </div>
  )
}
