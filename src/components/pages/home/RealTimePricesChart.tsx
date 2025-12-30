"use client";

import { useState } from "react";
import { Button } from "antd";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useCryptoData } from "@/src/hooks/useCryptoData";
import Image from "next/image";

type CurrencyType = "tether" | "toman";

const MiniChart = ({
  data,
  isPositive,
}: {
  data: number[];
  isPositive: boolean;
}) => {
  if (!data || data.length === 0) return null;

  const width = 80;
  const height = 30;
  const padding = 2;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
    const y = padding + chartHeight - ((value - min) / range) * chartHeight;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(" L ")}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={pathData}
        fill="none"
        stroke={isPositive ? "#10B981" : "#EF4444"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function RealTimePricesChart() {
  const { t, language } = useLanguage();
  const [currency, setCurrency] = useState<CurrencyType>("tether");

  const { data: cryptoData, loading } = useCryptoData({
    sparkline: true,
    limit: 8,
    refreshInterval: 30000,
  });

  const formatPrice = (price: number) => {
    if (currency === "toman") {
      const tomanPrice = price * 42000;
      return tomanPrice.toLocaleString("fa-IR", {
        maximumFractionDigits: 0,
      });
    }
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(3)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(3)}K`;
    }
    return volume.toFixed(3);
  };

  const formatPercentage = (percentage: number) => {
    const formatted = Math.abs(percentage).toFixed(3);
    return `${percentage >= 0 ? "+" : "-"}${formatted} %`;
  };

  if (loading) {
    return (
      <div className="w-full mt-16 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-xcolor7 dark:bg-xcolor6 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-xcolor7 dark:bg-xcolor6 rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-xcolor7 dark:bg-xcolor6 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    );
  }

  if (!loading && cryptoData.length === 0) {
    return (
      <div className="w-full mt-16">
        <div className="bg-xcolor9 dark:bg-xcolor24/80 rounded-2xl p-8 text-center">
          <p className="text-xcolor6 dark:text-xcolor7 text-lg">
            {t.common.loading}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto my-16">
      <div className="relative flex items-center justify-center mb-2 min-h-[60px]">
        <a
          href="#"
          className="absolute left-0 text-primaryColor hover:text-xcolor12 transition-colors flex items-center gap-2 text-sm lg:text-base"
        >
          {t.pages.home.priceChart.viewAll}
        </a>

        <h2 className="text-2xl lg:text-3xl font-bold text-xcolor1 dark:text-xcolor21 text-center">
          {t.pages.home.priceChart.title}
        </h2>

        <div className="absolute right-0 bg-xcolor5/90 dark:bg-xcolor24/95 rounded-full py-2 px-3 flex items-center gap-1">
          <Button
            type="text"
            onClick={() => setCurrency("tether")}
            className={`px-5 py-2.5 rounded-full text-sm transition-all w-[50%] ${
              currency === "tether"
                ? "bg-primaryColor text-xcolor21 shadow-lg"
                : "bg-transparent text-xcolor6 dark:text-xcolor7 hover:text-xcolor1 dark:hover:text-xcolor21"
            }`}
          >
            {t.pages.home.priceChart.currencyTether}
          </Button>
          <Button
            type="text"
            onClick={() => setCurrency("toman")}
            className={`px-5 py-2.5 rounded-full text-sm transition-all w-[50%] ${
              currency === "toman"
                ? "bg-primaryColor text-xcolor21 shadow-lg"
                : "bg-transparent text-xcolor6 dark:text-xcolor7 hover:text-xcolor1 dark:hover:text-xcolor21"
            }`}
          >
            {t.pages.home.priceChart.currencyToman}
          </Button>
        </div>
      </div>

      <div className="bg-xcolor9 dark:bg-xcolor24/95 rounded-2xl p-6 overflow-x-auto border border-xcolor5 dark:border-xcolor24/30">
        <div className="min-w-full">
          <div className="grid grid-cols-12 bg-xcolor5/90 dark:bg-black gap-4 py-4 px-4 mb-5 border-b border-xcolor5 dark:border-xcolor24/40 text-sm lg:text-base text-xcolor6 dark:text-xcolor7 font-medium items-center rounded-full">
            <div className="col-span-3 lg:col-span-2 flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.name}
            </div>
            <div className="col-span-2 flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.lastPrice}
            </div>
            <div className="col-span-2 flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.change24h}
            </div>
            <div className="col-span-2 hidden sm:flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.volume24h}
            </div>
            <div className="col-span-2 hidden lg:flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.weeklyChart}
            </div>
            <div className="col-span-1 lg:col-span-2"></div>
          </div>

          <div className="space-y-3">
            {cryptoData.map((crypto) => {
              const isPositive = crypto.price_change_percentage_24h >= 0;
              const chartData = crypto.sparkline_in_7d?.price || [];

              return (
                <div
                  key={crypto.id}
                  className="grid grid-cols-12 gap-4 items-center py-4 px-2 hover:bg-xcolor5/20 dark:hover:bg-xcolor24/30 rounded-lg transition-colors"
                >
                  <div className="col-span-3 lg:col-span-2 flex items-center justify-center gap-3 text-center">
                    {language === "en" ? (
                      <>
                        <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-xcolor5/50 dark:bg-xcolor24/50">
                          <Image
                            src={crypto.image}
                            alt={crypto.name}
                            width={44}
                            height={44}
                            className="object-cover rounded-full"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-0.5 flex-1">
                          <span className="text-xcolor1 dark:text-xcolor21 font-semibold text-sm lg:text-base leading-tight">
                            {crypto.name}
                          </span>
                          <span className="text-xcolor6 dark:text-xcolor7 text-xs leading-tight">
                            ({crypto.symbol.toUpperCase()})
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-xcolor5/50 dark:bg-xcolor24/50">
                          <Image
                            src={crypto.image}
                            alt={crypto.name}
                            width={44}
                            height={44}
                            className="object-cover rounded-full"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-0.5 flex-1">
                          <span className="text-xcolor1 dark:text-xcolor21 font-semibold text-sm lg:text-base leading-tight">
                            {crypto.name}
                          </span>
                          <span className="text-xcolor6 dark:text-xcolor7 text-xs leading-tight">
                            ({crypto.symbol.toUpperCase()})
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="col-span-2 text-xcolor1 dark:text-xcolor21 font-medium text-sm lg:text-base justify-center items-center text-center">
                    {formatPrice(crypto.current_price)}{" "}
                    <span className="text-xcolor6 dark:text-xcolor7 items-center">
                      {currency === "tether" ? "USDT" : "تومان"}
                    </span>
                  </div>

                  <div
                    className={`col-span-2 text-center font-semibold text-sm lg:text-base ${
                      isPositive ? "text-xcolor22" : "text-xerror2"
                    }`}
                  >
                    {formatPercentage(crypto.price_change_percentage_24h)}
                  </div>

                  <div className="col-span-2 text-xcolor6 dark:text-xcolor7 text-sm lg:text-base text-center hidden sm:block">
                    {crypto.total_volume
                      ? formatVolume(crypto.total_volume)
                      : "N/A"}
                  </div>

                  <div className="col-span-2 hidden lg:flex justify-center items-center">
                    <MiniChart data={chartData} isPositive={isPositive} />
                  </div>

                  <div className="col-span-1 lg:col-span-2 flex justify-center">
                    <Button
                      type="text"
                      className="!bg-xcolor5/30 dark:!bg-xcolor12 hover:!bg-xcolor5 dark:hover:!bg-xcolor12/80 !border-xcolor5 dark:!border-xcolor24/50 !text-xcolor1 dark:!text-xcolor21 !text-xs lg:!text-sm !px-4 !py-2 !h-auto !rounded-lg !font-medium"
                    >
                      {t.pages.home.priceChart.buySell}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
