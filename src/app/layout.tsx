import "../index.css";
import type { Metadata } from "next";
import MainTemplate from "./MainTemplate";
import { fa } from "@/src/langs/fa";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: `${fa.metadata.title} - ${fa.pages.home.title}`,
  description: fa.metadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="m-0 p-0" lang="fa" dir="rtl">
      <body className="m-0 p-0">
        <AntdRegistry>
          <MainTemplate>{children}</MainTemplate>
        </AntdRegistry>
      </body>
    </html>
  );
}
