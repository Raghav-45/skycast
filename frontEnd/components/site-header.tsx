'use client'

import { Search, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SiteHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery) return

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      )
      const data = await response.json()

      if (data && data[0]) {
        router.push(`/?lat=${data[0].lat}&lng=${data[0].lon}`)
      }
    } catch (error) {
      console.error('Error searching location:', error)
    }
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          router.push(`/?lat=${latitude}&lng=${longitude}`)
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  return (
    <header className="text-[#EAE6F2]">
      <div className="max-w-[1600px] w-full mx-auto px-8 flex justify-between items-center h-[110px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/weather_icons/01n.png"
            alt="SkyCast"
            height={32}
            width={32}
            className="h-8 w-8"
          />
          <h1 className="text-2xl font-bold">Sky Cast</h1>
        </Link>

        {/* Search Bar */}
        <div className="w-[500px]">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-[#1D1C1F] rounded-full outline-none placeholder:text-[#B9B6BF]"
            />
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#DDDAE5] w-5 h-5" />
          </form>
        </div>

        {/* Current Location Button */}
        <button
          onClick={handleCurrentLocation}
          className="h-12 bg-[#B5A1E5] text-[#100E17] rounded-full flex items-center gap-2 px-6"
        >
          <MapPin className="w-5 h-5" />
          <span className="font-semibold">Current Location</span>
        </button>
      </div>
    </header>
  )
}
