export default function TodayAtCard() {
  return (
    <div className="p-2 text-[#DDDAE5] h-full flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">Today At</h2>
      <div className="grid grid-cols-8 gap-4">
        <div className="bg-[#1D1C1F] rounded-3xl p-8 flex flex-col items-center gap-2">
          <p>7 PM</p>
          <img
            src="/weather_icons/04d.png"
            width="48"
            height="48"
            loading="lazy"
            alt="broken clouds"
            title="broken clouds"
          />
          <p>13°</p>
        </div>
      </div>
    </div>
  )
}
