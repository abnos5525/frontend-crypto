"use client";

import { useLanguage } from "@/src/contexts/LanguageContext";
import { Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "fa" ? "en" : "fa");
  };

  return (
    <Button
      icon={<GlobalOutlined className="text-gray-700 dark:text-gray-300 text-base" />}
      onClick={toggleLanguage}
      type="text"
      size="large"
      className="flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 !h-10 !px-1"
    >
      <span className="text-gray-700 dark:text-gray-300 font-medium text-base">
        {language === "fa" ? "EN" : "FA"}
      </span>
    </Button>
  );
}

