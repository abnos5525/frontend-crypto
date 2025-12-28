export default {
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:9000',
  
  CRYPTO_API: {
    BASE_URL: 'https://api.coingecko.com/api/v3',
    ENDPOINTS: {
      MARKET_DATA: '/coins/markets',
    },
  },
} as const;
