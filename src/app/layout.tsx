import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/top-nav";

export const metadata: Metadata = {
  title: "快图帮 SaaS",
  description: "面向广告店/图文店的中文 AI 出图平台",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <TopNav />
        <main className="mx-auto min-h-[calc(100vh-64px)] max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
