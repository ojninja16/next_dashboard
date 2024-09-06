import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
const API_BASE_URL = 'http://py-backend:8000/api';
import { toast } from 'react-toastify';

type Data = {
  message?: string;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query } = req;
  const endpoint = query.endpoint as string;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
  try {
    let response;
    switch (endpoint) {
      case 'candlestick-data':
        response = await axios.get(`${API_BASE_URL}/candlestick-data/`);
        break;
      case 'line-chart-data':
        response = await axios.get(`${API_BASE_URL}/line-chart-data/`);
        break;
      case 'bar-chart-data':
        response = await axios.get(`${API_BASE_URL}/bar-chart-data/`);
        break;
      case 'pie-chart-data':
        response = await axios.get(`${API_BASE_URL}/pie-chart-data/`);
        break;
      default:
        return res.status(404).json({ message: 'Endpoint not found' });
    }
    // Disable caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    return res.status(200).json({ data: response.data });
  } catch (error: any) {
    // toast.error(`Failed to fetch ${endpoint} data`);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
