from fastapi import APIRouter, HTTPException
from typing import Dict, Optional
from datetime import datetime, timedelta

from app.services.weather_service import weather_service
from app.services.hazard_detection import heatwave_detector
from app.models.schemas import (
    Region,
    HazardAnalysisRequest,
    HazardTrendAnalysis,
    HazardType
)

router = APIRouter()

@router.post("/analyze", response_model=HazardTrendAnalysis)
async def analyze_hazard_trends(request: HazardAnalysisRequest) -> HazardTrendAnalysis:
    """
    Analyze historical hazard trends for a region
    """
    try:
        # Fetch historical weather data
        df = await weather_service.fetch_yearly_data(
            request.region,
            request.start_year,
            request.end_year
        )
        
        # Get region name for display
        region_name = await weather_service.get_location_name(request.region)
        
        if request.hazard_type == HazardType.HEATWAVE:
            # Analyze heatwave trends
            trend_analysis = heatwave_detector.analyze_trends(df)
            
            # Detect individual heatwave events
            events = heatwave_detector.detect_heatwaves(df)
            
            # Generate time series data
            df['year'] = df['date'].dt.year
            annual_stats = df.groupby('year').agg({
                'temp_max': ['count', 'mean', 'max']
            }).reset_index()
            
            annual_frequency = [
                {"date": str(year), "value": count}
                for year, count in zip(annual_stats['year'], 
                                     annual_stats[('temp_max', 'count')])
            ]
            
            annual_avg_intensity = [
                {"date": str(year), "value": temp}
                for year, temp in zip(annual_stats['year'], 
                                    annual_stats[('temp_max', 'mean')])
            ]
            
            # Generate insights based on the analysis
            insights = []
            if trend_analysis['percent_change'] > 0:
                insights.append(
                    f"Heatwave frequency has increased by {trend_analysis['percent_change']:.1f}% " 
                    f"between {request.start_year} and {request.end_year}"
                )
            if trend_analysis['avg_duration'] > 5:
                insights.append(
                    f"Average heatwave duration of {trend_analysis['avg_duration']:.1f} days " 
                    "is significant and may impact public health"
                )
            
            return HazardTrendAnalysis(
                region_name=region_name,
                hazard_type=request.hazard_type,
                time_range=f"{request.start_year}-{request.end_year}",
                total_events=trend_analysis['total_events'],
                avg_duration=trend_analysis['avg_duration'],
                avg_intensity=trend_analysis['avg_intensity'],
                trend_slope=trend_analysis['trend_slope'],
                trend_significance=trend_analysis['trend_significance'],
                percent_change=trend_analysis['percent_change'],
                annual_frequency=annual_frequency,
                annual_avg_duration=[],  # We'll implement this if needed
                annual_avg_intensity=annual_avg_intensity,
                events=events,
                insights=insights
            )
            
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Hazard type {request.hazard_type} not implemented"
            )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
