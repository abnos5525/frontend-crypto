"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Button } from "antd";

export default function OfflinePage() {
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    const checkOnlineStatus = () => {
      if (navigator.onLine) {
        router.push('/');
      }
    };

    window.addEventListener('online', checkOnlineStatus);

    return () => {
      window.removeEventListener('online', checkOnlineStatus);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-primary">
      <div className="text-center space-y-6 card-light-dark p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-primary">{t.pages.offline.title}</h1>
        <p className="text-secondary">{t.pages.offline.message}</p>
        <Button 
          type="primary" 
          size="large"
          onClick={() => {
            if (navigator.onLine) {
              router.push("/");
            }
          }}
        >
          {t.pages.offline.backToHome}
        </Button>
      </div>
    </div>
  );
}

