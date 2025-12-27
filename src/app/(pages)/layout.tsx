import Header from "@/src/components/Header";
import { ReactNode } from "react";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen !bg-xcolor5 dark:!bg-black">
      <Header />
      {children}
    </div>
  );
}

