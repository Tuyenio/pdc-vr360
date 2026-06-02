import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VR360 Đình làng Định Công Thượng & Đền thờ Tổ nghề Kim hoàn",
  description:
    "Trải nghiệm số hóa VR360 di tích Đình làng Định Công Thượng và Đền thờ Tổ nghề Kim hoàn tại phường Định Công.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
