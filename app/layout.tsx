import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VR360 Đình Làng Nhà thờ tổ nghề Kim Hoàn",
  description:
    "Trải nghiệm số hóa VR360 di tích Đình Làng và Nhà thờ tổ nghề Kim Hoàn tại phường Định Công.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
