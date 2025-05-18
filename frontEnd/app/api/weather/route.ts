import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const type = searchParams.get('type')

  if (!lat || !lon || !type) {
    return NextResponse.json(
      { error: 'Invalid parameters. lat, lon, and type are required.' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `http://134.209.151.2/api/weather/${type}/${lat}/${lon}`
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
