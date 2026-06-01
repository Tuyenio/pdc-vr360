import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, capabilities } from "@/app/content";

const principles = [
  {
    title: "Số hóa không gian thật",
    detail: "Chuyển các điểm di tích thành dữ liệu trực quan để người xem cảm nhận đúng tuyến tham quan.",
  },
  {
    title: "Kể chuyện bằng lớp thông tin",
    detail: "Ghép ảnh 360 độ với thuyết minh, điểm chuyển cảnh và nội dung văn hóa đã biên tập.",
  },
  {
    title: "Mở rộng theo từng tuyến",
    detail: "Cấu trúc nền tảng cho phép bổ sung chùa, nghề truyền thống và tư liệu cộng đồng khi có dữ liệu mới.",
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

      <section className="relative overflow-hidden border-b border-[var(--surface-border)]">
        <Image
          src={activeTour.coverImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.14] blur-[2px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(16_24_18_/_0.95),rgb(16_24_18_/_0.82)_52%,rgb(8_14_10_/_0.46))]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:py-20">
          <div className="lg:-translate-y-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">Công nghệ lõi VR360</p>
            <h1 className="mt-4 text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-none text-[var(--tour-ink)]">
              Bảo tàng số cho di sản địa phương
            </h1>
            <p className="mt-5 max-w-[62ch] text-base leading-7 text-[var(--foreground)]/76">
              Giải pháp giúp chuyển không gian vật lý thành trải nghiệm trực tuyến, dễ truy cập và có khả năng mở rộng theo dữ liệu thực tế.
            </p>
          </div>

          <div className="public-media public-float relative min-h-[22rem] overflow-hidden rounded-[8px] lg:min-h-[32rem] lg:translate-x-8">
            <Image
              src={activeTour.heroImage}
              alt={activeTour.title}
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="public-card rounded-[8px] p-6"
            >
              <h2 className="text-2xl font-black leading-tight text-[var(--tour-ink)]">{principle.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{principle.detail}</p>
            </article>
          ))}
        </div>

        <div className="public-panel mt-6 rounded-[8px] p-5 lg:-translate-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((capability) => (
              <p
                key={capability}
                className="rounded-[8px] border border-[var(--surface-border)] bg-[var(--surface-glass)] p-4 text-sm font-bold leading-5 text-[var(--tour-ink)]"
              >
                {capability}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="public-panel grid gap-6 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Xem giải pháp đang chạy trên dữ liệu thật.
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Tour mẫu thể hiện cách ảnh 360 độ, điểm chuyển cảnh và lớp thuyết minh hoạt động trong cùng một trải nghiệm.
            </p>
          </div>
          <Link
            href={activeTour.href}
            className="w-fit rounded-[8px] bg-[var(--tour-jade)] px-5 py-3 text-sm font-extrabold text-[#101812] shadow-[0_18px_48px_rgb(120_169_150_/_0.22)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Mở tour mẫu
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
