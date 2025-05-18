'use client'

import { Search, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useMemo } from 'react'
import { ChangeEvent, FormEvent, MouseEvent } from 'react'

interface SearchResult {
  id: string
  name: string
  region: string
  lat: number
  lon: number
}

interface GeocodingResponse {
  name: string
  local_names?: {
    en?: string
    [key: string]: string | undefined
  }
  lat: number
  lon: number
  country: string
  state?: string
}

function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | undefined

  return function (...args: Parameters<F>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function SiteHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const fetchSearchResults = async (value: string) => {
    if (!value) return

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          value
        )}&limit=5&appid=ed2e30593db614e47ce92c4ab1586d55`
      )
      const data: GeocodingResponse[] = await response.json()

      const formattedResults: SearchResult[] = data.map((item) => ({
        id: `${item.lat}-${item.lon}`,
        name: item.local_names?.en || item.name,
        region: [
          item.state || '',
          item.country || '',
        ].filter(Boolean).join(', '),
        lat: item.lat,
        lon: item.lon,
      }))

      setSearchResults(formattedResults)
      setShowResults(true)
    } catch (error) {
      console.error('Error fetching search results:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchInput = useMemo(() => {
    const search = (value: string) => {
      if (value.length >= 2) {
        fetchSearchResults(value)
      } else {
        setShowResults(false)
        setSearchResults([])
      }
    }
    return debounce(search, 300)
  }, [])

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery) return

    if (searchResults.length > 0) {
      const firstResult = searchResults[0]
      router.push(`/?lat=${firstResult.lat}&lng=${firstResult.lon}`)
      setShowResults(false)
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    handleSearchInput(value)
  }

  const handleResultClick = (result: SearchResult) => {
    router.push(`/?lat=${result.lat}&lng=${result.lon}`)
    setSearchQuery(result.name)
    setShowResults(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | Event) => {
      if (searchRef.current && event.target instanceof Node && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
        <div className="w-[500px] relative" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              placeholder="Search city..."
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              className="w-full h-12 pl-12 pr-4 bg-[#1D1C1F] rounded-full outline-none placeholder:text-[#B9B6BF] text-[#DDDAE5]"
            />
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#DDDAE5] w-5 h-5" />
          </form>

          {showResults && searchResults.length > 0 && (
            <div className="absolute w-full mt-1 bg-[#1D1C1F] rounded-lg overflow-hidden z-50 py-1 shadow-xl">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="flex items-center px-4 py-3 hover:bg-[#2A292D] cursor-pointer"
                >
                  <div className="mr-3 flex items-center justify-center">
                    <MapPin className="text-[#DDDAE5] w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[#DDDAE5] text-sm font-medium">
                      {result.name}
                    </div>
                    <div className="text-[#8E8B94] text-xs">
                      {result.region}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showResults && isLoading && (
            <div className="absolute w-full mt-1 bg-[#1D1C1F] rounded-lg overflow-hidden z-50 py-4 shadow-xl flex justify-center">
              <div className="text-[#DDDAE5] text-sm">Loading...</div>
            </div>
          )}

          {showResults && !isLoading && searchResults.length === 0 && (
            <div className="absolute w-full mt-1 bg-[#1D1C1F] rounded-lg overflow-hidden z-50 py-4 shadow-xl flex justify-center">
              <div className="text-[#DDDAE5] text-sm">No results found</div>
            </div>
          )}
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
