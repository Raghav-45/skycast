'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { format } from 'date-fns'

const chartConfig = {
  temperature: {
    label: 'Temperature (°C)',
    color: 'hsl(var(--chart-1))',
  },
  humidity: {
    label: 'Humidity (%)',
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

  const chartData = data.hourly.time.map((time, index) => {
    const date = new Date(time)
    return {
      time: time, // Keep original ISO timestamp
      formattedTime: format(date, 'PPPp'), // Format for tooltip: "May 18th, 2025 at 12:00 PM"
      formattedDate: format(date, 'MMM d'), // Format for X-axis: "May 18"
      dateForGrouping: format(date, 'yyyy-MM-dd'), // For grouping unique dates
      temperature: data.hourly.temperature_2m[index],
      humidity: data.hourly.relative_humidity_2m[index],
    }
  })

  // Extract unique dates for X-axis ticks
  const uniqueDates = [
    ...new Set(chartData.map((item) => item.dateForGrouping)),
  ].map((dateStr) => {
    const index = chartData.findIndex(
      (item) => item.dateForGrouping === dateStr
    )
    return {
      dateForGrouping: dateStr,
      formattedDate: chartData[index].formattedDate,
    }
  })

  // Custom tooltip label formatter to show the PPPp formatted date
  const customLabelFormatter = (label, payload) => {
    if (payload && payload.length > 0) {
      const dataItem = chartData.find((item) => item.time === label)
      return dataItem ? dataItem.formattedTime : label
    }
    return label
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="bg-black/15 rounded-2xl col-span-4 h-[180px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 24,
          left: 36,
          right: 36,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine
          axisLine={false}
          tickMargin={9}
          // Show only unique dates
          ticks={
            uniqueDates
              .map(
                (d) =>
                  chartData.find(
                    (item) => item.dateForGrouping === d.dateForGrouping
                  )?.time
              )
              .filter(Boolean) as string[]
          }
          tickFormatter={(value) => {
            const dataItem = chartData.find((item) => item.time === value)
            return dataItem ? dataItem.formattedDate : ''
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent labelFormatter={customLabelFormatter} />
          }
        />
        <defs>
          <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-temperature)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-temperature)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillHumidity" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-humidity)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-humidity)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="temperature"
          type="natural"
          fill="url(#fillTemperature)"
          fillOpacity={0.4}
          stroke="var(--color-temperature)"
          stackId="a"
        />
        <Area
          dataKey="humidity"
          type="natural"
          fill="url(#fillHumidity)"
          fillOpacity={0.4}
          stroke="var(--color-humidity)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
