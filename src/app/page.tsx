"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spin } from "antd";

export default function RootPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/" || pathname === "") {
      router.replace("/home");
    }
  }, [pathname, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath === "/" || currentPath === "/frontend-crypto" || currentPath === "/frontend-crypto/") {
        window.location.href = "/home";
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="text-center">
        <Spin size="large" className="text-primaryColor" />
      </div>
    </div>
  );
}

