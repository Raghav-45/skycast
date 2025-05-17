import httpx
import pandas as pd
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime, timedelta
import json
import hashlib
from geopy.geocoders import Nominatim

from app.db.redis_client import redis_client
from app.models.schemas import Region, RegionType
from app.core.config import settings

class WeatherService:
    """Service for fetching and processing weather data from Open-Meteo API"""
    
    def __init__(self):
        self.base_url = "https://archive-api.open-meteo.com/v1/archive"
        self.geocoder = Nominatim(user_agent="climate_hazard_analyzer")
        
    async def _generate_cache_key(self, params: Dict[str, Any]) -> str:
        """Generate a unique cache key based on request parameters"""
        param_str = json.dumps(params, sort_keys=True)
        return f"weather_data:{hashlib.md5(param_str.encode()).hexdigest()}"
    
    async def get_coordinates(self, region: Region) -> Tuple[float, float]:
        """Get coordinates for a region"""
        if region.type == RegionType.CUSTOM:
            # For custom region, use center point of the lat-lon box
            lat = (region.lat_min + region.lat_max) / 2
            lon = (region.lon_min + region.lon_max) / 2
            return lat, lon
        else:
            # For city or state, use geocoding
            location = self.geocoder.geocode(region.name)
            if location:
                return location.latitude, location.longitude
            else:
                raise ValueError(f"Could not find coordinates for {region.name}")
    
    async def fetch_historical_data(
        self, 
        region: Region, 
        start_date: str, 
        end_date: str
    ) -> pd.DataFrame:
        """
        Fetch historical weather data from Open-Meteo
        
        Args:
            region: Region object with location information
            start_date: Start date in format YYYY-MM-DD
            end_date: End date in format YYYY-MM-DD
            
        Returns:
            DataFrame with daily weather data
        """
        # Check cache first
        cache_params = {
            "region": region.dict(),
            "start_date": start_date,
            "end_date": end_date
        }
        cache_key = await self._generate_cache_key(cache_params)
        cached_data = await redis_client.get_data(cache_key)
        
        if cached_data:
            print("Using cached weather data")
            return pd.DataFrame(cached_data)
        
        # Get coordinates
        latitude, longitude = await self.get_coordinates(region)
        
        # Define API parameters
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "start_date": start_date,
            "end_date": end_date,
            "daily": ["temperature_2m_max", "temperature_2m_min", "temperature_2m_mean", 
                     "precipitation_sum", "precipitation_hours"],
            "timezone": "auto"
        }
        
        # Make API request
        async with httpx.AsyncClient() as client:
            response = await client.get(self.base_url, params=params)
            
            if response.status_code != 200:
                raise Exception(f"Error fetching data: {response.text}")
            
            data = response.json()
            
        # Process data into a DataFrame
        daily_data = {
            "date": data["daily"]["time"],
            "temp_max": data["daily"]["temperature_2m_max"],
            "temp_min": data["daily"]["temperature_2m_min"],
            "temp_mean": data["daily"]["temperature_2m_mean"],
            "precip_sum": data["daily"]["precipitation_sum"],
            "precip_hours": data["daily"]["precipitation_hours"]
        }
        
        df = pd.DataFrame(daily_data)
        df["date"] = pd.to_datetime(df["date"])
        
        # Cache the data
        await redis_client.set_data(
            cache_key, 
            df.to_dict(orient="records"),
            ttl=settings.CACHE_TTL
        )
        
        return df
    
    async def fetch_yearly_data(self, region: Region, start_year: int, end_year: int) -> pd.DataFrame:
        """
        Fetch data for multiple years and combine into a single DataFrame
        """
        start_date = f"{start_year}-01-01"
        end_date = f"{end_year}-12-31"
        
        df = await self.fetch_historical_data(region, start_date, end_date)
        
        return df
    
    async def get_location_name(self, region: Region) -> str:
        """Get a readable location name for the region"""
        if region.type == RegionType.CUSTOM:
            return f"Custom region (Lat: {(region.lat_min + region.lat_max)/2:.2f}, Lon: {(region.lon_min + region.lon_max)/2:.2f})"
        return region.name

weather_service = WeatherService()