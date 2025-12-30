"use client";

import CryptoTicker from "@/src/components/CryptoTicker";
import HomeContent from "@/src/components/pages/home/HomeContent";
import HomeImage from "@/src/components/pages/home/HomeImage";
import RealTimePricesChart from "@/src/components/pages/home/RealTimePricesChart";

export default function HomePage() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <HomeContent />
          <HomeImage />
        </div>
        <RealTimePricesChart />
      </div>
      <CryptoTicker />
    </section>
  );
}
