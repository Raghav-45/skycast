import json
import redis
import logging
from app.core.config import settings
from typing import Any, Optional, Union

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RedisClient:
    def __init__(self):
        self.redis_client = None
        if settings.REDIS_URL:
            try:
                # Parse Redis URL components
                url = settings.REDIS_URL.replace("rediss://", "").replace("redis://", "").split(":")[0]
                
                self.redis_client = redis.Redis(
                    host=url,
                    port=6379,
                    password=settings.REDIS_PASSWORD,
                    ssl=True,
                    ssl_cert_reqs=None,  # Required for Upstash
                    decode_responses=True,
                    socket_timeout=5.0  # 5 second timeout
                )
                
                # Test connection
                self.redis_client.ping()
                logger.info("Successfully connected to Redis")
                
            except redis.ConnectionError as e:
                logger.warning(f"Failed to connect to Redis: {e}")
                self.redis_client = None
            except Exception as e:
                logger.warning(f"Error initializing Redis client: {e}")
                self.redis_client = None
        
    async def set_data(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Store data in Redis with optional TTL"""
        if not self.redis_client:
            return False
            
        try:
            # Serialize data to JSON
            serialized_value = json.dumps(value)
            # Set value with TTL
            self.redis_client.setex(key, ttl or settings.CACHE_TTL, serialized_value)
            logger.debug(f"Successfully cached data for key: {key}")
            return True
        except Exception as e:
            logger.error(f"Redis error while setting data: {e}")
            return False
    
    async def get_data(self, key: str) -> Union[Any, None]:
        """Retrieve data from Redis"""
        if not self.redis_client:
            return None
            
        try:
            data = self.redis_client.get(key)
            if data:
                logger.debug(f"Cache hit for key: {key}")
                return json.loads(data)
            logger.debug(f"Cache miss for key: {key}")
            return None
        except Exception as e:
            logger.error(f"Redis error while getting data: {e}")
            return None
    
    async def delete_data(self, key: str) -> bool:
        """Delete data from Redis"""
        if not self.redis_client:
            return False
            
        try:
            self.redis_client.delete(key)
            logger.debug(f"Successfully deleted key: {key}")
            return True
        except Exception as e:
            logger.error(f"Redis error while deleting data: {e}")
            return False
    
    async def health_check(self) -> bool:
        """Check if Redis connection is healthy"""
        if not self.redis_client:
            return False
            
        try:
            self.redis_client.ping()
            return True
        except Exception as e:
            logger.error(f"Redis health check failed: {e}")
            return False

# Create a singleton instance
redis_client = RedisClient()