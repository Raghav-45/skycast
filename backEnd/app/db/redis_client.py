import json
import redis
from app.core.config import settings
from typing import Any, Optional, Union

class RedisClient:
    def __init__(self):
        # Connect to Upstash Redis
        self.redis_client = redis.from_url(
            settings.REDIS_URL,
            password=settings.REDIS_PASSWORD,
            decode_responses=True
        )
        
    async def set_data(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """
        Store data in Redis with optional TTL
        """
        if ttl is None:
            ttl = settings.CACHE_TTL
            
        try:
            # Serialize data to JSON
            serialized_value = json.dumps(value)
            # Set value with TTL
            self.redis_client.setex(key, ttl, serialized_value)
            return True
        except Exception as e:
            print(f"Redis error: {e}")
            return False
    
    async def get_data(self, key: str) -> Union[Any, None]:
        """
        Retrieve data from Redis
        """
        try:
            data = self.redis_client.get(key)
            if data:
                return json.loads(data)
            return None
        except Exception as e:
            print(f"Redis error: {e}")
            return None
    
    async def delete_data(self, key: str) -> bool:
        """
        Delete data from Redis
        """
        try:
            self.redis_client.delete(key)
            return True
        except Exception as e:
            print(f"Redis error: {e}")
            return False

# Create a singleton instance
redis_client = RedisClient()