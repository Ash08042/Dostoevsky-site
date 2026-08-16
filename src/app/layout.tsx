import type { Metadata } from "next";
import "../../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "陀思妥耶夫斯基 · 数字文学档案馆",
  description: "一座关于陀思妥耶夫斯基的数字文学博物馆。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}<Analytics /></body>
    </html>
  );
}
