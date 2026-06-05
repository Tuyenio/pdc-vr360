import type { Metadata } from "next";
import VirtualTour from "@/app/components/VirtualTour";

export const metadata: Metadata = {
  title: "VR360 Đình Làng Định Công Thượng",
  description:
    "Trải nghiệm VR360 Đình Làng Định Công Thượng và Đền thờ Tổ nghề Kim hoàn.",
};

export default function DinhLangDinhCongTourPage() {
  return <VirtualTour />;
}
