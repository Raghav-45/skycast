import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

import type { WeatherResponse } from '@/lib/types';

interface CurrentWeatherProps {
  data?: WeatherResponse;
}

export default function CurrentWeatherCard({ data }: CurrentWeatherProps) {
  if (!data) return null;

  const current = data.current;
  const temp = Math.round(current.temperature_2m);
  const weatherCode = current.weather_code;
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
  };

  const getWeatherDescription = (code: number): string => {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Unknown';
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-[#1D1C1F] rounded-3xl p-8 text-[#DDDAE5] w-full flex flex-col gap-y-3">
      <h2 className="text-xl font-semibold text-[#DDDAE5]">Now</h2>
      <div className="flex items-center gap-2">
        <p className="text-7xl text-white font-normal">
          {temp}°<sup className="text-5xl align-bottom">c</sup>
        </p>
        <Image
          height={75}
          width={75}
          src={`/weather_icons/${weatherIconMap[weatherCode]}.png`}
          alt={getWeatherDescription(weatherCode)}
          className="mx-auto size-[75px]"
        />
      </div>
      <p className="text-base font-semibold text-[#DDDAE5]">
        {getWeatherDescription(weatherCode)}
      </p>
      <Separator className="my-1" />
      <ul className="space-y-3">
        <li className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          <p className="text-base font-semibold text-[#7B7980]">{today}</p>
        </li>
        <li className="flex items-center gap-2">
          <MapPinIcon className="h-6 w-6" />
          <p className="text-base font-semibold text-[#7B7980]">London, GB</p>
        </li>
      </ul>
    </div>
  );
}
