"use client";

import Marquee from "react-fast-marquee";
import { useCryptoData } from "@/src/hooks/useCryptoData";

const TICKER_CONFIG = {
  REFRESH_INTERVAL: 30000,
  SCROLL_SPEED: 40,
};

const CryptoTicker = () => {
  const { data: cryptoData, loading } = useCryptoData({
    sparkline: false,
    refreshInterval: TICKER_CONFIG.REFRESH_INTERVAL,
  });

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

  // Skeleton loader for crypto ticker
  const TickerSkeleton = () => (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-md border-t border-gray-700/50 overflow-hidden" dir="ltr">
      <Marquee
        gradient={false}
        speed={TICKER_CONFIG.SCROLL_SPEED}
        direction="left"
        className="py-2.5"
        pauseOnHover={true}
        autoFill={true}
      >
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="inline-flex items-center mx-6 text-xs whitespace-nowrap"
            dir="ltr"
          >
            <div className="w-5 h-5 rounded-full bg-gray-600/50 mr-2 animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-600/50 rounded mr-1.5 animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-600/50 rounded mr-2.5 animate-pulse"></div>
            <div className="h-4 w-14 bg-gray-600/50 rounded animate-pulse"></div>
          </div>
        ))}
      </Marquee>
    </div>
  );

  if (loading && cryptoData.length === 0) {
    return <TickerSkeleton />;
  }

  if (cryptoData.length === 0) {
    return null;
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
