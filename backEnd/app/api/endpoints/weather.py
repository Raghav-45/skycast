from fastapi import APIRouter, HTTPException
from typing import Dict, Optional
import httpx
from datetime import datetime, timedelta
import pytz

from app.services.weather_service import weather_service
from app.db.redis_client import redis_client
from app.core.config import settings

router = APIRouter()

async def get_cache_key(lat: float, lon: float, type: str) -> str:
    """Generate a cache key for weather data"""
    return f"weather:{type}:{lat}:{lon}"

@router.get("/current/{lat}/{lon}")
async def get_current_weather(lat: float, lon: float) -> Dict:
    """Get current weather data for a location"""
    cache_key = await get_cache_key(lat, lon, "current")
    
    # Try to get cached data first
    cached_data = await redis_client.get_data(cache_key)
    if cached_data:
        return cached_data
    
    # If no cached data, fetch from Open-Meteo
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", 
                   "precipitation", "weather_code", "pressure_msl", "surface_pressure", 
                   "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
        "hourly": ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", 
                  "wind_direction_10m", "weather_code"],
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", 
                 "sunrise", "sunset", "uv_index_max"],
        "timezone": "auto"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to fetch weather data")
            
        data = response.json()
        
        # Cache the data for 30 minutes
        await redis_client.set_data(cache_key, data, ttl=1800)
        
        return data

@router.get("/daily/{lat}/{lon}")
async def get_daily_forecast(lat: float, lon: float) -> Dict:
    """Get 7-day forecast for a location"""
    cache_key = await get_cache_key(lat, lon, "daily")
    
    # Try to get cached data first
    cached_data = await redis_client.get_data(cache_key)
    if cached_data:
        return cached_data
    
    # If no cached data, fetch from Open-Meteo
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", 
                 "precipitation_probability_max", "wind_speed_10m_max",
                 "wind_direction_10m_dominant"],
        "timezone": "auto"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to fetch forecast data")
            
        data = response.json()
        
        # Cache the data for 1 hour
        await redis_client.set_data(cache_key, data, ttl=3600)
        
        return data
