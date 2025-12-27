import Header from "@/src/components/Header";
import ParticlesBackground from "@/src/components/ParticlesBackground";
import { ReactNode } from "react";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-50">
        <Header />
      </div>
      <div className="relative">
        <div className="relative z-10">{children}</div>
        <ParticlesBackground />
      </div>
    </div>
  );
}
