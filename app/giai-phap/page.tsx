import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, capabilities } from "@/app/content";

const principles = [
  {
    title: "Số hóa không gian thật",
    detail: "Ghi nhận ảnh 360 độ, điểm chuyển cảnh và cấu trúc tuyến tham quan với dữ liệu có thể bàn giao.",
  },
  {
    title: "Biên tập lớp thông tin",
    detail: "Tổ chức thuyết minh, hình ảnh và nội dung văn hóa thành trải nghiệm dễ hiểu trên web.",
  },
  {
    title: "Mở rộng theo danh mục",
    detail: "Bổ sung chùa, đình, nghề truyền thống và tư liệu cộng đồng mà không phá cấu trúc nền.",
  },
];

export const metadata: Metadata = {
  title: "Giải pháp VR360 | Con đường di sản Định Công",
  description: "Tổng quan giải pháp công nghệ lõi VR360 cho dự án số hóa di sản Phường Định Công.",
};

export default function SolutionPage() {
  return (
    <main className="public-page min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:py-16">
        <div className="min-w-0">
          <p className="public-kicker">Công nghệ lõi VR360</p>
          <h1 className="mt-4 max-w-[13ch] text-[clamp(2.55rem,5.4vw,5.1rem)] font-black leading-[0.92] text-[var(--tour-ink)]">
            Bảo tàng số cho địa phương.
          </h1>
          <p className="mt-5 max-w-[56ch] text-base leading-7 text-[var(--foreground)]/76">
            Giải pháp chuyển không gian di tích thành trải nghiệm trực tuyến, dễ truy cập và dễ mở rộng.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_0.72fr] md:items-end">
          <div className="public-media relative min-h-[24rem] rounded-[8px] lg:min-h-[34rem]">
            <Image
              src={activeTour.heroImage}
              alt={activeTour.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
    
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:py-20">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className={`public-card rounded-[8px] p-6 ${index === 1 ? "lg:translate-y-8" : ""}`}
            >
              <h2 className="text-2xl font-black leading-tight text-[var(--tour-ink)]">{principle.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{principle.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="min-w-0">
            <h2 className="text-[2.15rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              Năng lực nền tảng được đóng gói rõ.
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-7 text-[var(--foreground)]/76">
              Những module này là phần lõi để vận hành tour đầu tiên và mở thêm tuyến trong các giai đoạn sau.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <p key={capability} className="public-panel rounded-[8px] px-4 py-4 text-sm font-bold leading-5 text-[var(--tour-ink)]">
                {capability}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="public-panel mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Xem giải pháp trên dữ liệu thật.
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Tour mẫu thể hiện cách ảnh 360 độ, điểm chuyển cảnh và thuyết minh hoạt động cùng nhau.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            Mở tour
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
