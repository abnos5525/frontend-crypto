"use client";

import { Spin } from "antd";

export default function Loading() {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-xcolor21 dark:bg-xcolor1 transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        <Spin size="large" className="text-primaryColor" />
      </div>
    </div>
  );
}

