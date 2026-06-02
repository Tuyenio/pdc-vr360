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
    color: "var(--tour-coral)",
  },
  {
    title: "Biên tập lớp thông tin",
    detail: "Tổ chức thuyết minh, hình ảnh và nội dung văn hóa thành trải nghiệm dễ hiểu trên web.",
    color: "var(--tour-gold)",
  },
  {
    title: "Mở rộng theo danh mục",
    detail: "Bổ sung chùa, đình, nghề truyền thống và tư liệu cộng đồng mà không phá cấu trúc nền.",
    color: "var(--tour-jade)",
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
          <h1 className="public-gradient-text mt-4 max-w-[13ch] text-[clamp(2.55rem,5.4vw,5.1rem)] font-black leading-[0.92]">
            Bảo tàng số cho địa phương.
          </h1>
          <p className="public-slide-up mt-5 max-w-[56ch] text-base leading-7 text-[var(--foreground)]/76" style={{ animationDelay: '200ms' }}>
            Giải pháp chuyển không gian di tích thành trải nghiệm trực tuyến, dễ truy cập và dễ mở rộng.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_0.72fr] md:items-end">
          <div className="public-media public-shimmer public-scale-in relative min-h-[24rem] rounded-[16px] lg:min-h-[34rem]">
            <Image
              src={activeTour.heroImage}
              alt={activeTour.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--tour-coral)]/30 via-transparent to-[var(--tour-jade)]/20 mix-blend-overlay" />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:py-20">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className={`public-card public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4 ${index === 1 ? "lg:translate-y-8" : ""}`}
              style={{ borderTopColor: principle.color }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[12px] text-white font-black text-xl shadow-lg" style={{ background: `linear-gradient(135deg, ${principle.color}, ${principle.color}dd)` }}>
                {index + 1}
              </div>
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
              Năng lực nền tảng <span className="public-gradient-text">được đóng gói rõ</span>.
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-7 text-[var(--foreground)]/76">
              Những module này là phần lõi để vận hành tour đầu tiên và mở thêm tuyến trong các giai đoạn sau.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability, idx) => (
              <div
                key={capability}
                className="public-panel public-stagger-item public-hover-lift rounded-[12px] px-4 py-4 text-sm font-bold leading-5 text-[var(--tour-ink)] border-l-4"
                style={{ 
                  borderLeftColor: idx === 0 ? 'var(--tour-coral)' : idx === 1 ? 'var(--tour-gold)' : idx === 2 ? 'var(--tour-jade)' : idx === 3 ? 'var(--tour-teal)' : 'var(--tour-purple)'
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--tour-coral)] to-[var(--tour-jade)] text-white text-xs font-black">
                    ✓
                  </div>
                  <span>{capability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-center">
            <div className="public-media public-float relative min-h-[24rem] overflow-hidden rounded-[16px] lg:min-h-[36rem]">
              <Image
                src="/images-tour/Đình Làng-Đền Thờ/9 Chính điện Đình làng.jpg"
                alt="Chính điện Đình làng"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-[var(--tour-gold)]/30 via-transparent to-[var(--tour-teal)]/20 mix-blend-overlay" />
            </div>

            <div className="min-w-0">
              <h2 className="text-[2rem] font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
                Trải nghiệm <span className="public-gradient-text">tương tác đầy đủ</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-[var(--foreground)]/78">
                <p className="public-fade-in" style={{ animationDelay: '100ms' }}>
                  Mỗi tour VR360 không chỉ là ảnh tĩnh mà là một hành trình tương tác đầy đủ với điểm chuyển cảnh, thuyết minh âm thanh và thông tin chi tiết về từng không gian.
                </p>
                <p className="public-fade-in" style={{ animationDelay: '300ms' }}>
                  Người dùng có thể tự do khám phá, di chuyển giữa các điểm, xem 360 độ, phóng to chi tiết và nghe giới thiệu về lịch sử và kiến trúc của từng khu vực.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Tự do khám phá", icon: "🔍" },
                  { label: "Di chuyển linh hoạt", icon: "🚶" },
                  { label: "Thuyết minh âm thanh", icon: "🎧" },
                  { label: "Phóng to chi tiết", icon: "🔎" }
                ].map((item, idx) => (
                  <div key={item.label} className="public-bounce-in flex items-center gap-3 rounded-[12px] bg-[var(--surface-glass)] border border-[var(--surface-border)] px-4 py-3" style={{ animationDelay: `${500 + idx * 100}ms` }}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-bold text-[var(--tour-ink)]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="public-panel public-glow public-shimmer mx-auto grid max-w-7xl gap-5 rounded-[16px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8 border-2 border-[var(--primary)]/40">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Xem giải pháp trên <span className="public-gradient-text">dữ liệu thật</span>.
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Tour mẫu thể hiện cách ảnh 360 độ, điểm chuyển cảnh và thuyết minh hoạt động cùng nhau.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            Mở tour ✦
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
