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
  size = "default",
}: {
  data: number[];
  isPositive: boolean;
  size?: "small" | "default" | "tiny";
}) => {
  if (!data || data.length === 0) return null;

  let width = 80;
  let height = 30;
  let strokeWidth = "2";

  if (size === "tiny") {
    width = 40;
    height = 16;
    strokeWidth = "1.5";
  } else if (size === "small") {
    width = 50;
    height = 20;
    strokeWidth = "1.5";
  }

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
        strokeWidth={strokeWidth}
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

  // Skeleton loader for price chart
  const PriceChartSkeleton = () => (
    <div className="w-[95%] mx-auto my-16">
      <div className="relative flex flex-col sm:flex-col md:flex-row items-center justify-center mb-2 min-h-[auto] sm:min-h-[auto] md:min-h-[60px] gap-3 sm:gap-3 md:gap-0">
        <div className="h-8 w-48 bg-xcolor5/50 dark:bg-xcolor24/50 rounded-lg animate-pulse"></div>
        
        <div className={`flex items-center justify-between w-full sm:w-full md:w-full gap-3 sm:gap-3 md:gap-0 order-2 sm:order-2 md:order-2 md:absolute md:left-0 md:right-0 ${
          language === "fa" ? "flex-row-reverse sm:flex-row-reverse" : ""
        }`}>
          <div className={`h-6 w-24 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse md:absolute ${
            language === "fa" ? "md:left-0" : "md:right-0"
          }`}></div>

          <div className={`bg-xcolor5/90 dark:bg-xcolor24/95 rounded-full py-1.5 sm:py-1.5 md:py-2 px-2 sm:px-2.5 md:px-3 flex items-center gap-0.5 sm:gap-0.5 md:gap-1 md:absolute ${
            language === "fa" ? "md:right-0" : "md:left-0"
          }`}>
            <div className="h-6 w-16 bg-xcolor5/50 dark:bg-xcolor24/50 rounded-full animate-pulse"></div>
            <div className="h-6 w-16 bg-xcolor5/50 dark:bg-xcolor24/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="bg-xcolor9 dark:bg-xcolor24/95 rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-xcolor5 dark:border-xcolor24/30">
        <div className="min-w-full">
          <div className="grid grid-cols-12 bg-xcolor5/90 dark:bg-black gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 py-2.5 sm:py-3 md:py-4 lg:py-4 px-1.5 sm:px-2 md:px-3 lg:px-4 mb-2.5 sm:mb-3 md:mb-4 lg:mb-5 border-b border-xcolor5 dark:border-xcolor24/40 rounded-full">
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 h-4 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse"></div>
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 h-4 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse"></div>
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 h-4 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse"></div>
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 h-4 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse hidden lg:block"></div>
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-2 h-4 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse hidden sm:block"></div>
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-2 h-4 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse hidden sm:block"></div>
          </div>

          <div className="space-y-2 sm:space-y-2 md:space-y-3 lg:space-y-3">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 items-center py-2 sm:py-3 md:py-3 lg:py-4 px-1.5 sm:px-2"
              >
                <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-xcolor5/50 dark:bg-xcolor24/50 animate-pulse"></div>
                  <div className="hidden sm:block flex-1">
                    <div className="h-4 w-20 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-12 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2">
                  <div className="h-4 w-16 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse mx-auto"></div>
                </div>
                <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2">
                  <div className="h-4 w-12 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse mx-auto"></div>
                </div>
                <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 hidden lg:block">
                  <div className="h-4 w-14 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse mx-auto"></div>
                </div>
                <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-2 hidden sm:flex justify-center">
                  <div className="w-12 h-6 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse"></div>
                </div>
                <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 flex justify-center">
                  <div className="h-6 w-16 bg-xcolor5/50 dark:bg-xcolor24/50 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading && cryptoData.length === 0) {
    return <PriceChartSkeleton />;
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
      <div className="relative flex flex-col sm:flex-col md:flex-row items-center justify-center mb-2 min-h-[auto] sm:min-h-[auto] md:min-h-[60px] gap-3 sm:gap-3 md:gap-0">
        <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-xcolor1 dark:text-xcolor21 text-center order-1 sm:order-1 md:order-2">
          {t.pages.home.priceChart.title}
        </h2>

        <div className={`flex items-center justify-between w-full sm:w-full md:w-full gap-3 sm:gap-3 md:gap-0 order-2 sm:order-2 md:order-2 md:absolute md:left-0 md:right-0 ${
          language === "fa" ? "flex-row-reverse sm:flex-row-reverse" : ""
        }`}>
          <a
            href="#"
            className={`text-primaryColor hover:text-xcolor12 transition-colors flex items-center gap-2 text-sm lg:text-base md:absolute ${
              language === "fa" ? "md:left-0" : "md:right-0"
            }`}
          >
            {t.pages.home.priceChart.viewAll}
          </a>

          <div className={`bg-xcolor5/90 dark:bg-xcolor24/95 rounded-full py-1.5 sm:py-1.5 md:py-2 px-2 sm:px-2.5 md:px-3 flex items-center gap-0.5 sm:gap-0.5 md:gap-1 md:absolute ${
            language === "fa" ? "md:right-0" : "md:left-0"
          }`}>
            <Button
              type="text"
              onClick={() => setCurrency("tether")}
              className={`px-3 sm:px-3.5 md:px-4 lg:px-5 py-1.5 sm:py-1.5 md:py-2 lg:py-2.5 rounded-full text-xs sm:text-xs md:text-sm lg:text-sm transition-all w-[50%] ${
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
              className={`px-3 sm:px-3.5 md:px-4 lg:px-5 py-1.5 sm:py-1.5 md:py-2 lg:py-2.5 rounded-full text-xs sm:text-xs md:text-sm lg:text-sm transition-all w-[50%] ${
                currency === "toman"
                  ? "bg-primaryColor text-xcolor21 shadow-lg"
                  : "bg-transparent text-xcolor6 dark:text-xcolor7 hover:text-xcolor1 dark:hover:text-xcolor21"
              }`}
            >
              {t.pages.home.priceChart.currencyToman}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-xcolor9 dark:bg-xcolor24/95 rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 overflow-x-auto border border-xcolor5 dark:border-xcolor24/30">
        <div className="min-w-full">
          <div className="grid grid-cols-12 bg-xcolor5/90 dark:bg-black gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 py-2.5 sm:py-3 md:py-4 lg:py-4 px-1.5 sm:px-2 md:px-3 lg:px-4 mb-2.5 sm:mb-3 md:mb-4 lg:mb-5 border-b border-xcolor5 dark:border-xcolor24/40 text-[10px] sm:text-xs md:text-sm lg:text-base text-xcolor6 dark:text-xcolor7 font-medium items-center rounded-full">
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.name}
            </div>
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.lastPrice}
            </div>
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.change24h}
            </div>
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 hidden lg:flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.volume24h}
            </div>
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-2 hidden sm:flex items-center justify-center text-center">
              {t.pages.home.priceChart.columns.weeklyChart}
            </div>
            <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-2 hidden sm:flex items-center justify-center text-center">
            </div>
          </div>

          <div className="space-y-2 sm:space-y-2 md:space-y-3 lg:space-y-3">
            {cryptoData.map((crypto) => {
              const isPositive = crypto.price_change_percentage_24h >= 0;
              const chartData = crypto.sparkline_in_7d?.price || [];

              return (
                <div
                  key={crypto.id}
                  className="grid grid-cols-12 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 items-center py-2 sm:py-3 md:py-3 lg:py-4 px-1.5 sm:px-2 hover:bg-xcolor5/20 dark:hover:bg-xcolor24/30 rounded-lg transition-colors"
                >
                  <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2.5 lg:gap-3 text-center">
                    {language === "en" ? (
                      <>
                        <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden flex-shrink-0 bg-xcolor5/50 dark:bg-xcolor24/50">
                          <Image
                            src={crypto.image}
                            alt={crypto.name}
                            width={44}
                            height={44}
                            className="object-cover rounded-full w-full h-full"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <div className="hidden sm:flex flex-col gap-0.5 flex-1 min-w-0">
                          <span className="text-xcolor1 dark:text-xcolor21 font-semibold text-xs sm:text-xs md:text-sm lg:text-base leading-tight truncate">
                            {crypto.name}
                          </span>
                          <span className="text-xcolor6 dark:text-xcolor7 text-[10px] sm:text-[10px] md:text-xs lg:text-xs leading-tight">
                            ({crypto.symbol.toUpperCase()})
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden lg:flex flex-col gap-0.5 flex-1 min-w-0">
                          <span className="text-xcolor1 dark:text-xcolor21 font-semibold text-xs sm:text-xs md:text-sm lg:text-base leading-tight truncate">
                            {crypto.name}
                          </span>
                          <span className="text-xcolor6 dark:text-xcolor7 text-[10px] sm:text-[10px] md:text-xs lg:text-xs leading-tight">
                            ({crypto.symbol.toUpperCase()})
                          </span>
                        </div>
                        <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden flex-shrink-0 bg-xcolor5/50 dark:bg-xcolor24/50">
                          <Image
                            src={crypto.image}
                            alt={crypto.name}
                            width={44}
                            height={44}
                            className="object-cover rounded-full w-full h-full"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 text-xcolor1 dark:text-xcolor21 font-medium text-[9px] sm:text-[10px] md:text-xs lg:text-base justify-center items-center text-center">
                    <div className="flex flex-col gap-0.5 items-center justify-center">
                      <span className="truncate">
                        {formatPrice(crypto.current_price)}
                      </span>
                      <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-xcolor6 dark:text-xcolor7">
                        {currency === "tether" ? "USDT" : "تومان"}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 text-center font-semibold text-[9px] sm:text-xs md:text-sm lg:text-base ${
                      isPositive ? "text-xcolor22" : "text-xerror2"
                    }`}
                  >
                    {formatPercentage(crypto.price_change_percentage_24h)}
                  </div>

                  <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-2 text-xcolor6 dark:text-xcolor7 text-[9px] sm:text-xs md:text-sm lg:text-base text-center hidden lg:block">
                    {crypto.total_volume
                      ? formatVolume(crypto.total_volume)
                      : "N/A"}
                  </div>

                  <div className="col-span-0 sm:col-span-2 md:col-span-3 lg:col-span-2 hidden sm:flex justify-center items-center">
                    <div className="block sm:block md:block lg:hidden">
                      <MiniChart
                        data={chartData}
                        isPositive={isPositive}
                        size="tiny"
                      />
                    </div>
                    <div className="hidden lg:block">
                      <MiniChart
                        data={chartData}
                        isPositive={isPositive}
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 flex justify-center items-center">
                    <Button
                      type="text"
                      className="!bg-xcolor5/30 dark:!bg-xcolor12 hover:!bg-xcolor5 dark:hover:!bg-xcolor12/80 !border-xcolor5 dark:!border-xcolor24/50 !text-xcolor1 dark:!text-xcolor21 !text-[9px] sm:!text-[9px] md:!text-[10px] lg:!text-sm !px-1.5 sm:!px-2 md:!px-2.5 lg:!px-4 !py-1 sm:!py-1 md:!py-1.5 lg:!py-2 !h-auto !rounded-md sm:!rounded-md md:!rounded-md lg:!rounded-lg !font-medium whitespace-nowrap"
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
