import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import config from '@/src/constants/config';

const serverCache = new Map<string, { data: any; expiresAt: number }>();
const CACHE_TTL = 15 * 1000;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sparkline = searchParams.get('sparkline') === 'true';
    const cacheKey = `crypto_${sparkline}`;

    const cached = serverCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) {
      return NextResponse.json(cached.data, {
        headers: {
          'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30',
          'X-Cache': 'HIT',
        },
      });
    }

    const response = await axios.get(
      `${config.CRYPTO_API.BASE_URL}${config.CRYPTO_API.ENDPOINTS.MARKET_DATA}`,
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 20,
          page: 1,
          sparkline: sparkline,
          price_change_percentage: '24h',
        },
        headers: {
          'Accept': 'application/json',
        },
        timeout: 8000,
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response from CoinGecko:', response.data);
      return NextResponse.json(
        { error: 'Invalid response from CoinGecko API' },
        { status: 500 }
      );
    }

    serverCache.set(cacheKey, {
      data: response.data,
      expiresAt: Date.now() + CACHE_TTL,
    });

    if (serverCache.size > 10) {
      const now = Date.now();
      for (const [key, value] of serverCache.entries()) {
        if (now > value.expiresAt) {
          serverCache.delete(key);
        }
      }
    }

    return NextResponse.json(response.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30',
        'X-Cache': 'MISS',
      },
    });
  } catch (error: any) {
    console.error('Error fetching crypto data from CoinGecko:', error);
    
    if (error.response) {
      console.error('CoinGecko API Error Status:', error.response.status);
      console.error('CoinGecko API Error Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received from CoinGecko API');
    } else {
      console.error('Error setting up request:', error.message);
    }

    return NextResponse.json([], { status: 200 });
  }
}
