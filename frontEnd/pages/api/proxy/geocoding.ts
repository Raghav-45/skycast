import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { service, ...params } = req.query;

  try {
    let url;
    switch (service) {
      case 'openweather':
        url = `https://api.openweathermap.org/geo/1.0/direct?q=${params.q}&limit=5&appid=ed2e30593db614e47ce92c4ab1586d55`;
        break;
      case 'nominatim':
        url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${params.lat}&lon=${params.lon}`;
        break;
      default:
        throw new Error('Invalid service');
    }

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'SkyCase Weather App'  // Required by OpenStreetMap
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status((error as import('axios').AxiosError)?.response?.status || 500).json({ error: (error as Error).message });
  }
}
