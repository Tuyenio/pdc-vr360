import type { Metadata } from "next";
import { AdminLogin } from "@/app/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị | VR360 Định Công",
  description: "Đăng nhập vào bảng điều hành quản trị nội dung VR360 Định Công.",
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
