import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, routeCards } from "@/app/content";

export const metadata: Metadata = {
  title: "Di tích - Con đường di sản Định Công",
  description:
    "Khám phá các di tích văn hóa và lịch sử tại Phường Định Công qua tour tham quan VR360.",
};

const heritageIntro = {
  title: "Di tích văn hóa Định Công",
  description:
    "Phường Định Công lưu giữ nhiều di tích văn hóa quan trọng, từ đình làng, đền thờ đến các không gian nghề truyền thống. Mỗi di tích đều mang trong mình câu chuyện riêng về lịch sử hình thành và phát triển của cộng đồng.",
};

const heritageHighlights = [
  {
    title: "Đình Làng Định Công Thượng",
    period: "Thế kỷ 17-18",
    description:
      "Trung tâm sinh hoạt cộng đồng và tín ngưỡng của làng xưa, nơi thờ Thành hoàng bổn cảnh và tổ chức các lễ hội truyền thống.",
    features: ["Kiến trúc Bắc Bộ truyền thống", "Hệ thống hồ nước", "Không gian lễ nghi"],
    image: "/images-tour/Đình Làng-Đền Thờ/6 Trung Đình.jpg",
  },
  {
    title: "Đền thờ Tổ nghề Kim hoàn",
    period: "Thế kỷ 19",
    description:
      "Nơi thờ phụng tổ sư nghề kim hoàn, ghi nhận vai trò quan trọng của nghề truyền thống trong đời sống cộng đồng Định Công.",
    features: ["Không gian thờ phụng", "Tư liệu nghề kim hoàn", "Kiến trúc đền thờ"],
    image: "/images-tour/Đình Làng-Đền Thờ/13 Chính điện Đền thờ Tổ nghề.jpg",
  },
  {
    title: "Hệ thống cảnh quan",
    period: "Truyền thống",
    description:
      "Hồ nước, vườn cảnh và không gian kết nối giữa các di tích tạo nên một quần thể kiến trúc cảnh quan hài hòa.",
    features: ["Hồ Tả - Hữu", "Vườn cảnh phía Đông", "Lối dẫn kết nối"],
    image: "/images-tour/Đình Làng-Đền Thờ/3 Tả Hồ.jpg",
  },
];

const heritageValues = [
  {
    icon: "building",
    title: "Giá trị kiến trúc",
    description: "Kiến trúc truyền thống Bắc Bộ với hệ thống cấu kiện gỗ, trang trí tinh xảo và bố cục không gian hài hòa.",
    color: "var(--tour-coral)",
  },
  {
    icon: "history",
    title: "Giá trị lịch sử",
    description: "Ghi dấu quá trình hình thành, phát triển và văn hóa cộng đồng làng xã Việt Nam qua nhiều thế kỷ.",
    color: "var(--tour-gold)",
  },
  {
    icon: "culture",
    title: "Giá trị văn hóa",
    description: "Lưu giữ tín ngưỡng thờ Thành hoàng, tổ nghề và các tập tục văn hóa truyền thống của cộng đồng.",
    color: "var(--tour-jade)",
  },
  {
    icon: "community",
    title: "Giá trị cộng đồng",
    description: "Không gian sinh hoạt chung, tổ chức lễ hội và duy trì sự gắn kết của cộng đồng địa phương.",
    color: "var(--tour-teal)",
  },
];

const icons = {
  building: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  history: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  culture: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  community: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

export default function HeritageListPage() {
  return (
    <main className="public-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-b border-[var(--surface-border)]">
        <Image
          src="/images-tour/Đình Làng-Đền Thờ/1 Cổng Đình.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.14] blur-[1px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(10_6_4_/_0.98)_0%,rgb(20_12_8_/_0.88)_48%,rgb(8_5_3_/_0.60)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--tour-gold)]/20 via-transparent to-[var(--tour-jade)]/20 mix-blend-overlay" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
          <div className="public-rise mx-auto max-w-4xl text-center">
            <p className="public-kicker">Di sản văn hóa</p>
            <h1 className="public-gradient-text mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.94]">
              {heritageIntro.title}
            </h1>
            <p className="public-slide-up mx-auto mt-6 max-w-[62ch] text-lg font-medium leading-8 text-[var(--foreground)]/78" style={{ animationDelay: '200ms' }}>
              {heritageIntro.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          {heritageHighlights.map((heritage, index) => {
            const isEven = index % 2 === 0;
            return (
              <article
                key={heritage.title}
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center ${isEven ? "" : "lg:[&>*:first-child]:order-2"}`}
              >
                <div className="public-media public-scale-in relative min-h-[22rem] overflow-hidden rounded-[16px] lg:min-h-[32rem]">
                  <Image
                    src={heritage.image}
                    alt={heritage.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-all duration-700 hover:scale-105 hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--tour-coral)]/20 via-transparent to-[var(--tour-teal)]/15 mix-blend-overlay" />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[var(--tour-coral)] to-[var(--tour-gold)] px-4 py-2 rounded-full text-xs font-black text-white shadow-lg">
                    {heritage.period}
                  </div>
                </div>

                <div className="min-w-0">
                  <h2 className="public-bounce-in text-[2rem] font-black leading-tight text-[var(--tour-ink)] sm:text-4xl" style={{ animationDelay: '100ms' }}>
                    {heritage.title}
                  </h2>
                  <p className="public-fade-in mt-4 text-base leading-7 text-[var(--foreground)]/78" style={{ animationDelay: '200ms' }}>{heritage.description}</p>

                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-black uppercase tracking-wider text-[var(--primary)]">
                      Đặc điểm nổi bật
                    </p>
                    <ul className="space-y-2">
                      {heritage.features.map((feature, idx) => (
                        <li key={feature} className="public-bounce-in flex items-start gap-3" style={{ animationDelay: `${300 + idx * 100}ms` }}>
                          <div className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--tour-jade)] to-[var(--tour-teal)]">
                            <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm font-semibold leading-6 text-[var(--tour-ink)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[2rem] font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Giá trị <span className="public-gradient-text">di sản</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] text-base leading-7 text-[var(--foreground)]/76">
              Di tích Định Công mang nhiều tầng giá trị quan trọng cần được bảo tồn và phát huy
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {heritageValues.map((value, index) => (
              <article key={value.title} className="public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 lg:p-8 border-t-4" style={{ borderTopColor: value.color }}>
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${value.color}, ${value.color}dd)` }}>
                    {icons[value.icon as keyof typeof icons]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-black text-[var(--tour-ink)]">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{value.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2rem] font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
            Khám phá di sản qua <span className="public-gradient-text">VR360</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[56ch] text-base leading-7 text-[var(--foreground)]/76">
            Trải nghiệm các tour tham quan số đã được số hóa và các tuyến đề xuất mở rộng
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {routeCards.map((route, index) => {
            const content = (
              <>
                <div className={`relative overflow-hidden ${index === 0 ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
                  <Image
                    src={route.image}
                    alt={route.title}
                    fill
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 36vw" : "(max-width: 768px) 100vw, 24vw"}
                    className="object-cover transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
                  />
                  {index === 0 && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[var(--tour-coral)] to-[var(--tour-gold)] px-3 py-1.5 rounded-full text-xs font-black text-white shadow-lg">
                      ✦ ĐANG MỞ
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-sm font-black text-[var(--primary)]">{route.status}</p>
                  <h3 className="mt-2 text-xl font-black leading-tight text-[var(--tour-ink)]">{route.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{route.description}</p>
                </div>
              </>
            );

            const className = `public-card public-stagger-item group rounded-[16px] transition-transform hover:-translate-y-2`;

            return route.href ? (
              <Link key={route.title} href={route.href} className={className}>
                {content}
              </Link>
            ) : (
              <article key={route.title} className={className}>
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="public-panel public-glow public-shimmer mx-auto grid max-w-7xl gap-5 rounded-[16px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8 border-2 border-[var(--primary)]/40">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Tham quan <span className="public-gradient-text">tour đang mở</span>
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Bắt đầu khám phá Đình Làng Định Công Thượng và Đền thờ Tổ nghề Kim hoàn ngay bây giờ.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            Tham quan ngay ✦
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
