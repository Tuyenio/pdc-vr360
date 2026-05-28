import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
