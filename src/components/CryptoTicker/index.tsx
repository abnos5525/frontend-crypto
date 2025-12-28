"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const TICKER_CONFIG = {
  REFRESH_INTERVAL: 30000,
  SCROLL_SPEED: 40,
};

const CryptoTicker = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get('/api/crypto');
      setCryptoData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, TICKER_CONFIG.REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(4)}`;
    }
  };

  const formatPercentage = (percentage: number) => {
    const formatted = percentage.toFixed(2);
    return percentage >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  if (loading || cryptoData.length === 0) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-md border-t border-gray-700/50 h-12 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-75"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-md border-t border-gray-700/50 overflow-hidden" dir="ltr">
      <Marquee
        gradient={false}
        speed={TICKER_CONFIG.SCROLL_SPEED}
        direction="left"
        className="py-2.5"
        pauseOnHover={true}
        autoFill={true}
      >
        {cryptoData.map((crypto, index) => (
          <div
            key={`${crypto.id}-${index}`}
            className="inline-flex items-center mx-6 text-xs whitespace-nowrap"
            dir="ltr"
          >
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-5 h-5 rounded-full mr-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-semibold text-white mr-1.5">
              {crypto.symbol.toUpperCase()}
            </span>
            <span className="text-gray-400 mr-2.5">
              {formatPrice(crypto.current_price)}
            </span>
            <span
              className={`font-semibold text-xs ${
                crypto.price_change_percentage_24h >= 0
                  ? "text-emerald-400"
                  : "text-red-500"
              }`}
            >
              {formatPercentage(crypto.price_change_percentage_24h)}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CryptoTicker;
