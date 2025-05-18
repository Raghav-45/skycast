import axios from 'axios';
import type { WeatherData, WeatherResponse } from './types';

const API_BASE_URL = '/api/proxy';

export const fetchWeatherData = async (lat: number = 51.5074, lon: number = -0.1278): Promise<WeatherData> => {
  try {
    const [currentWeather, dailyForecast] = await Promise.all([
      axios.get<WeatherResponse>(`${API_BASE_URL}/weather`, { params: { lat, lon, type: 'current' } }),
      axios.get<WeatherResponse>(`${API_BASE_URL}/weather`, { params: { lat, lon, type: 'daily' } })
    ]);

    return {
      current: currentWeather.data,
      forecast: dailyForecast.data
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
