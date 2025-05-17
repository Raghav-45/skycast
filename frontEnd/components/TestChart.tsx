'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
  { month: 'July', desktop: 180, mobile: 150 },
  { month: 'August', desktop: 220, mobile: 160 },
  { month: 'September', desktop: 195, mobile: 170 },
  { month: 'October', desktop: 240, mobile: 140 },
  { month: 'November', desktop: 190, mobile: 130 },
  { month: 'December', desktop: 210, mobile: 150 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

interface ChartProps {
  data?: {
    hourly: {
      time: string[]
      temperature_2m: number[]
      relative_humidity_2m: number[]
    }
  }
}

export function Component({ data }: ChartProps) {
  if (!data) return null
  return (
    // <div className="relative bg-black/15 rounded-2xl col-span-4 h-[180px] p-6 flex flex-col justify-between">
    //   <h3 className="text-base font-semibold text-[#7B7980]">
    //     Humidity & Temprature Graph
    //   </h3>
    //   <div className="flex w-full items-center my-4">
    <ChartContainer
      config={chartConfig}
      className="bg-black/15 rounded-2xl col-span-4 h-[180px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        // margin={{
        //   left: 12,
        //   right: 12,
        // }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="mobile"
          type="natural"
          fill="url(#fillMobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
    //   </div>
    // </div>
  )
}
