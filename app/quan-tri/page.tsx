import type { Metadata } from "next";
import { AdminDashboard } from "@/app/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Bảng quản trị | VR360 Định Công",
  description: "Bảng điều hành quản trị địa điểm, cảnh 360, hotspot, thuyết minh và xuất bản tour VR360.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
