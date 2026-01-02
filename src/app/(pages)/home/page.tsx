"use client";

import CryptoTicker from "@/src/components/CryptoTicker";
import { Features } from "@/src/components/pages/home";
import HomeContent from "@/src/components/pages/home/HomeContent";
import HomeImage from "@/src/components/pages/home/HomeImage";
import RealTimePricesChart from "@/src/components/pages/home/RealTimePricesChart";

export default function HomePage() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-12 pt-8 lg:pt-12">
      <div className="max-w-7xl w-full mx-auto space-y-12 lg:space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          <HomeContent />
          <HomeImage />
        </div>
        <RealTimePricesChart />
        <Features />
      </div>
      <CryptoTicker />
    </section>
  );
}
