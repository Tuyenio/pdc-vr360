import type { Metadata } from "next";
import VirtualTour from "@/app/components/VirtualTour";

export const metadata: Metadata = {
  title: "VR360 Chùa Liên Hoa",
  description:
    "Trải nghiệm VR360 Chùa Liên Hoa với tuyến tham quan từ Cổng Tam Quan, Tiền Đường, Điện Tam Bảo đến Đài Quan Âm và Vườn Tháp Tổ.",
};

export default function ChuaLienHoaTourPage() {
  return <VirtualTour tourId="chua-lien-hoa" />;
}
