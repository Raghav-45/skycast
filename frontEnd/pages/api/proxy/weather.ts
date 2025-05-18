import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon, type } = req.query;

  if (!lat || !lon || !type || Array.isArray(lat) || Array.isArray(lon) || Array.isArray(type)) {
    return res.status(400).json({ error: 'Invalid parameters. lat, lon, and type are required.' });
  }

  try {
    const response = await axios.get(`http://134.209.151.2/api/weather/${type}/${lat}/${lon}`);
    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({ 
        error: error.response?.data || error.message 
      });
    }
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
