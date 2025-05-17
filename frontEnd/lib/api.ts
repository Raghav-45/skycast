import axios from 'axios';
import type { WeatherData, WeatherResponse } from './types';

const API_BASE_URL = 'http://localhost:8001/api';

export const fetchWeatherData = async (lat: number = 51.5074, lon: number = -0.1278): Promise<WeatherData> => {
  try {
    const [currentWeather, dailyForecast] = await Promise.all([
      axios.get<WeatherResponse>(`${API_BASE_URL}/weather/current/${lat}/${lon}`),
      axios.get<WeatherResponse>(`${API_BASE_URL}/weather/daily/${lat}/${lon}`)
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
