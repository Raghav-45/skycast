import pandas as pd
import numpy as np
from typing import List, Dict, Any
from datetime import datetime, timedelta

class HeatwaveDetector:
    def __init__(self, consecutive_days: int = 3, percentile_threshold: float = 95.0):
        """
        Initialize heatwave detector
        
        Args:
            consecutive_days: Number of consecutive days required for a heatwave
            percentile_threshold: Temperature percentile threshold for heatwave
        """
        self.consecutive_days = consecutive_days
        self.percentile_threshold = percentile_threshold
    
    def detect_heatwaves(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """
        Detect heatwaves in temperature data
        
        Args:
            df: DataFrame with columns ['date', 'temp_max']
            
        Returns:
            List of heatwave events with start date, end date, duration, and intensity
        """
        # Calculate temperature threshold based on percentile
        temp_threshold = np.percentile(df['temp_max'], self.percentile_threshold)
        
        # Create boolean mask for days above threshold
        hot_days = df['temp_max'] > temp_threshold
        
        # Initialize variables for tracking heatwaves
        heatwaves = []
        in_heatwave = False
        start_idx = 0
        
        for i in range(len(df)):
            if not in_heatwave and hot_days.iloc[i:i+self.consecutive_days].all():
                # Start of new heatwave
                in_heatwave = True
                start_idx = i
            elif in_heatwave and not hot_days.iloc[i]:
                # End of heatwave
                if i - start_idx >= self.consecutive_days:
                    heatwave_period = df.iloc[start_idx:i]
                    heatwaves.append({
                        'start_date': heatwave_period.iloc[0]['date'].strftime('%Y-%m-%d'),
                        'end_date': heatwave_period.iloc[-1]['date'].strftime('%Y-%m-%d'),
                        'duration': len(heatwave_period),
                        'max_intensity': float(heatwave_period['temp_max'].max()),
                        'avg_intensity': float(heatwave_period['temp_max'].mean())
                    })
                in_heatwave = False
        
        # Check for ongoing heatwave at end of data
        if in_heatwave and len(df) - start_idx >= self.consecutive_days:
            heatwave_period = df.iloc[start_idx:]
            heatwaves.append({
                'start_date': heatwave_period.iloc[0]['date'].strftime('%Y-%m-%d'),
                'end_date': heatwave_period.iloc[-1]['date'].strftime('%Y-%m-%d'),
                'duration': len(heatwave_period),
                'max_intensity': float(heatwave_period['temp_max'].max()),
                'avg_intensity': float(heatwave_period['temp_max'].mean())
            })
        
        return heatwaves
    
    def analyze_trends(self, df: pd.DataFrame) -> Dict[str, Any]:
        """
        Analyze heatwave trends over time
        
        Args:
            df: DataFrame with temperature data
            
        Returns:
            Dictionary with trend analysis statistics
        """
        # Detect all heatwaves
        heatwaves = self.detect_heatwaves(df)
        
        # Convert to DataFrame for analysis
        if not heatwaves:
            return {
                'total_events': 0,
                'avg_duration': 0,
                'avg_intensity': 0,
                'trend_slope': 0,
                'trend_significance': 0,
                'percent_change': 0
            }
            
        hw_df = pd.DataFrame(heatwaves)
        hw_df['year'] = pd.to_datetime(hw_df['start_date']).dt.year
        
        # Calculate annual statistics
        annual_stats = hw_df.groupby('year').agg({
            'duration': ['count', 'mean'],
            'avg_intensity': 'mean'
        }).reset_index()
        
        # Calculate trends
        if len(annual_stats) > 1:
            from scipy import stats
            years = annual_stats['year'].values
            freq = annual_stats[('duration', 'count')].values
            
            slope, intercept, r_value, p_value, std_err = stats.linregress(years, freq)
            
            first_decade = annual_stats[annual_stats['year'] <= annual_stats['year'].min() + 10]
            last_decade = annual_stats[annual_stats['year'] >= annual_stats['year'].max() - 10]
            
            percent_change = ((last_decade[('duration', 'count')].mean() - 
                             first_decade[('duration', 'count')].mean()) / 
                            first_decade[('duration', 'count')].mean() * 100)
        else:
            slope = 0
            p_value = 1
            percent_change = 0
        
        return {
            'total_events': len(heatwaves),
            'avg_duration': float(hw_df['duration'].mean()),
            'avg_intensity': float(hw_df['avg_intensity'].mean()),
            'trend_slope': float(slope),
            'trend_significance': float(p_value),
            'percent_change': float(percent_change)
        }

# Create singleton instance
heatwave_detector = HeatwaveDetector()
