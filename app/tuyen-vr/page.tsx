import type { Metadata } from "next";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { Feature73 } from "@/app/components/ui/feature-73";
import { routeCards } from "@/app/content";

export const metadata: Metadata = {
  title: "Tuyến VR | VR360 Định Công",
  description: "Danh sách các tuyến tham quan VR360 của dự án số hóa không gian văn hóa phường Định Công.",
};

export default function RoutesPage() {
  // Transform routeCards to Feature73 format
  const tourFeatures = routeCards.map((route) => ({
    id: route.title,
    title: route.title,
    description: route.description,
    image: route.image,
  }));

  return (
    <main className="public-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <Feature73
        heading="Các tuyến tham quan"
        description="Từ tour mẫu hiện có, dự án có thể mở rộng thành một bản đồ ký ức của khu vực Định Công."
        linkUrl="/ke-hoach"
        linkText="Xem kế hoạch triển khai"
        features={tourFeatures}
      />

      <SiteFooter />
    </main>
  );
}
