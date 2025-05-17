import os
from pydantic_settings import BaseSettings
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # API key for Open-Meteo (if needed in the future)
    OPEN_METEO_API_KEY: Optional[str] = None
    
    # Redis connection settings
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    REDIS_PASSWORD: Optional[str] = os.getenv("REDIS_PASSWORD")
    
    # Cache settings
    CACHE_TTL: int = int(os.getenv("CACHE_TTL", "86400"))  # 24 hours default
    
    # API rate limiting
    RATE_LIMIT_CALLS: int = int(os.getenv("RATE_LIMIT_CALLS", "100"))
    RATE_LIMIT_PERIOD: int = int(os.getenv("RATE_LIMIT_PERIOD", "3600"))  # 1 hour
    
    # Weather data defaults
    DEFAULT_START_YEAR: int = 1990
    DEFAULT_END_YEAR: int = 2023
    
    # Heatwave detection parameters
    HEATWAVE_CONSECUTIVE_DAYS: int = 3
    HEATWAVE_PERCENTILE_THRESHOLD: float = 95.0
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()