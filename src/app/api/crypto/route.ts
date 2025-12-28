import { NextResponse } from 'next/server';
import axios from 'axios';
import config from '@/src/constants/config';

export async function GET() {
  try {
    const response = await axios.get(
      `${config.CRYPTO_API.BASE_URL}${config.CRYPTO_API.ENDPOINTS.MARKET_DATA}`,
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 20,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h',
        },
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching crypto data from CoinGecko:', error);
    return NextResponse.json([], { status: 500 });
  }
}
