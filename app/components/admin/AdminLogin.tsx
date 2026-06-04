"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, LockKeyhole, LogIn, ShieldCheck, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const dinhCongLogo = encodeURI("/images/định công.png");

export function AdminLogin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      router.push("/quan-tri");
    }, 520);
  };

  return (
    <main className="admin-page min-h-[100dvh] bg-[#edf5ec] text-[#0d3327]">
      <section className="relative isolate grid min-h-[100dvh] overflow-hidden px-4 py-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgb(214_180_104_/_0.2),transparent_30rem),radial-gradient(circle_at_88%_78%,rgb(34_95_74_/_0.18),transparent_34rem),linear-gradient(135deg,#f8fbf4,#e4efe3)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.38] [background-image:linear-gradient(90deg,rgb(14_52_39_/_0.08)_1px,transparent_1px),linear-gradient(0deg,rgb(14_52_39_/_0.055)_1px,transparent_1px)] [background-size:84px_84px]" />

        <div className="relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col justify-between rounded-[18px] border border-white/70 bg-[rgb(255_255_255_/_0.46)] p-6 shadow-[0_34px_110px_rgb(23_73_50_/_0.14),inset_0_1px_0_rgb(255_255_255_/_0.78)] backdrop-blur-xl lg:p-8">
          <Link href="/" className="inline-flex w-fit items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-[rgb(142_95_11_/_0.24)] bg-white/80 p-1.5 shadow-[0_12px_30px_rgb(37_75_54_/_0.1)]">
              <Image src={dinhCongLogo} alt="Logo phường Định Công" width={42} height={42} className="h-full w-full rounded-full object-contain" priority />
            </span>
            <span>
              <span className="block text-base font-extrabold">VR360 Định Công</span>
              <span className="block text-xs font-semibold text-[#61766b]">Bảng điều hành di sản số</span>
            </span>
          </Link>

          <div className="mt-16 max-w-2xl lg:mt-0">
            <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#8e5f0b]">Khu vực quản trị</p>
            <h1 className="mt-4 text-[clamp(2.35rem,5vw,4.7rem)] font-black leading-[1.02] tracking-[-0.03em] text-[#0e3427]">
              Quản lý tour VR360 không cần chạm vào mã nguồn.
            </h1>
            <p className="mt-5 max-w-[56ch] text-base font-medium leading-8 text-[#4d6a5e]">
              Tạo địa điểm tham quan, thêm cảnh 360, gắn hotspot, thuyết minh, bản đồ tuyến và xuất bản nội dung từ một giao diện vận hành.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {["Bảo mật phiên đăng nhập", "Quy trình duyệt nội dung", "Mẫu tour từ 2 địa điểm"].map((item) => (
              <div key={item} className="rounded-[14px] border border-[rgb(14_52_39_/_0.1)] bg-white/64 p-4 text-sm font-bold text-[#123a2c]">
                <ShieldCheck className="mb-3 h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 grid place-items-center py-8 lg:py-0">
          <form onSubmit={handleSubmit} className="w-full max-w-[30rem] rounded-[22px] border border-white/72 bg-white/86 p-5 shadow-[0_34px_100px_rgb(23_73_50_/_0.18),inset_0_1px_0_rgb(255_255_255_/_0.88)] backdrop-blur-xl sm:p-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-extrabold text-[#8e5f0b]">Đăng nhập quản trị</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#0e3427]">Mở bảng điều hành</h2>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#0e3427] text-white shadow-[0_14px_34px_rgb(14_52_39_/_0.22)]">
                <LockKeyhole className="h-5 w-5" strokeWidth={1.8} />
              </span>
            </div>

            <div className="mt-7 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#123a2c]">Tài khoản</span>
                <span className="grid grid-cols-[1.25rem_1fr] items-center gap-3 rounded-[12px] border border-[rgb(14_52_39_/_0.14)] bg-white px-4 py-3 focus-within:border-[#8e5f0b] focus-within:ring-4 focus-within:ring-[rgb(142_95_11_/_0.12)]">
                  <UserRound className="h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
                  <input defaultValue="admin" className="min-w-0 bg-transparent text-sm font-semibold text-[#0e3427] outline-none" />
                </span>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#123a2c]">Mật khẩu</span>
                <span className="grid grid-cols-[1.25rem_1fr_1.25rem] items-center gap-3 rounded-[12px] border border-[rgb(14_52_39_/_0.14)] bg-white px-4 py-3 focus-within:border-[#8e5f0b] focus-within:ring-4 focus-within:ring-[rgb(142_95_11_/_0.12)]">
                  <LockKeyhole className="h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
                  <input type="password" defaultValue="vr360" className="min-w-0 bg-transparent text-sm font-semibold text-[#0e3427] outline-none" />
                  <Eye className="h-5 w-5 text-[#7d9186]" strokeWidth={1.8} />
                </span>
              </label>
            </div>

            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0e3427] px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_44px_rgb(14_52_39_/_0.24)] transition hover:-translate-y-0.5 hover:bg-[#174b39] active:translate-y-0">
              <LogIn className="h-4 w-4 text-[#e0cf9f]" strokeWidth={1.8} />
              {isSubmitting ? "Đang mở bảng điều hành..." : "Đăng nhập"}
            </button>

            <div className="mt-5 rounded-[14px] border border-[rgb(142_95_11_/_0.18)] bg-[#fff8e8] p-4 text-sm leading-6 text-[#6a5b38]">
              Đây là giao diện đăng nhập mô phỏng để mở trang quản trị. Khi triển khai thật có thể gắn API xác thực, phân quyền và nhật ký thao tác.
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
