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
    title: "Nội dung làm việc",
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

      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-16">
        <div className="min-w-0">
          <p className="public-kicker">Liên hệ dự án</p>
          <h1 className="mt-4 max-w-[13ch] text-[clamp(2.55rem,5.4vw,5.1rem)] font-black leading-[0.92] text-[var(--tour-ink)]">
            Trao đổi triển khai cùng ICS.
          </h1>
          <p className="mt-5 max-w-[56ch] text-base leading-7 text-[var(--foreground)]/76">
            Dành cho đầu mối làm việc về phạm vi dự án, lịch khảo sát và các tuyến di sản cần bổ sung.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/ke-hoach" className="public-cta">
              Kế hoạch
            </Link>
            <Link href="/tuyen-vr" className="public-cta-secondary">
              Tuyến VR
            </Link>
          </div>
        </div>

        <div className="public-media relative min-h-[24rem] rounded-[8px] lg:min-h-[34rem]">
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

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:py-16">
          <div className="grid gap-4">
            {contactPoints.map((point) => (
              <article key={point.title} className="grid gap-3 border-t border-[var(--surface-border)] pt-4 sm:grid-cols-[12rem_1fr]">
                <h2 className="text-xl font-black text-[var(--tour-ink)]">{point.title}</h2>
                <p className="text-sm leading-6 text-[var(--muted-foreground)]">{point.detail}</p>
              </article>
            ))}
          </div>

          <div className="public-panel rounded-[8px] p-6">
            <h2 className="text-2xl font-black leading-tight text-[var(--tour-ink)]">Đầu mối nội dung</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
              Chuẩn bị danh mục điểm di tích, hiện trạng tư liệu và nhu cầu vận hành để chốt phạm vi triển khai.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
