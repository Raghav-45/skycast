from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import hazards, weather
from app.db.redis_client import redis_client

app = FastAPI(
    title="Climate Hazard Trend Analyzer",
    description="API for analyzing climate hazard trends using historical weather data",
    version="1.0.0",
)

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://skycast-gold.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes for weather and hazards endpoints
app.include_router(weather.router, prefix="/api/weather", tags=["weather"])
app.include_router(hazards.router, prefix="/api/hazards", tags=["hazards"])

@app.get("/")
async def root():
    return {"message": "Climate Hazard Trend Analyzer API"}

@app.get("/health")
async def health_check():
    """Check the health of the API and Redis connection"""
    redis_status = await redis_client.health_check()
    return {
        "status": "healthy" if redis_status else "degraded",
        "redis": "connected" if redis_status else "disconnected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)