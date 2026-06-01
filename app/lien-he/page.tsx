import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour } from "@/app/content";

const contactPoints = [
  {
    title: "Đơn vị đề xuất",
    detail: "Công ty Cổ phần An ninh mạng Quốc tế - ICS",
  },
  {
    title: "Địa bàn triển khai",
    detail: "Phường Định Công, Hà Nội",
  },
  {
    title: "Nội dung trao đổi",
    detail: "Phạm vi số hóa, danh mục điểm di tích, phương án vận hành và dự toán kinh phí.",
  },
];

export const metadata: Metadata = {
  title: "Liên hệ | Con đường di sản Định Công",
  description: "Thông tin liên hệ và đầu mối trao đổi dự án Con đường di sản Phường Định Công qua VR360.",
};

export default function ContactPage() {
  return (
    <main className="public-page min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:py-20">
        <div className="lg:-translate-y-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">Liên hệ dự án</p>
          <h1 className="mt-4 text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-none text-[var(--tour-ink)]">
            Trao đổi triển khai cùng ICS
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-7 text-[var(--foreground)]/76">
            Trang này dành cho đầu mối làm việc về phạm vi dự án, kế hoạch triển khai và các tuyến di sản cần bổ sung.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ke-hoach"
              className="rounded-[8px] bg-[var(--tour-jade)] px-5 py-3 text-sm font-extrabold text-[#101812] shadow-[0_18px_48px_rgb(120_169_150_/_0.22)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Xem kế hoạch
            </Link>
            <Link
              href="/tuyen-vr"
              className="rounded-[8px] border border-[var(--surface-border)] bg-[var(--surface-glass)] px-5 py-3 text-sm font-extrabold text-[var(--tour-ink)] transition-colors hover:bg-[var(--surface-glass-strong)]"
            >
              Xem tuyến VR
            </Link>
          </div>
        </div>

        <div className="public-media public-float relative min-h-[22rem] overflow-hidden rounded-[8px] lg:min-h-[32rem] lg:translate-x-8">
          <Image
            src={activeTour.gateImage}
            alt="Cổng Đình Làng Định Công Thượng"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {contactPoints.map((point) => (
            <article
              key={point.title}
              className="public-card rounded-[8px] p-6"
            >
              <h2 className="text-2xl font-black text-[var(--tour-ink)]">{point.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{point.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
