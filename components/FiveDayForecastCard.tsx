export default function FiveDayForecastCard() {
  return (
    <div className="p-2 text-[#DDDAE5] h-full flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">5 Days Forecast</h2>
      <div className="grid grid-cols-8 gap-4">
        {/* {timeData.map((data, index) => (
          <div
            key={index}
            className="bg-[#1D1C1F] rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <p>{data.time}</p>
            <img
              src={data.image_url}
              width="48"
              height="48"
              loading="lazy"
              alt={data.condition}
              title={data.condition}
            />
            <p>{data.temp}°</p>
          </div>
        ))} */}
      </div>
    </div>
  )
}
