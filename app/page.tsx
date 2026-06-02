import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { HeroShaderBackground } from "@/app/components/ui/hero-shader-background";
import { activeTour, capabilities, deliverySteps, routeCards } from "@/app/content";

export const metadata: Metadata = {
  title: "Con đường di sản Định Công",
  description:
    "Landing page dự án Con đường di sản Phường Định Công, kết nối người dân với di sản qua trải nghiệm tham quan số.",
};

export default function Home() {
  return (
    <main className="public-page landing-page min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <HeroShaderBackground imageSrc={activeTour.heroImage}>
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-end px-4 pb-12 pt-20 sm:px-6 lg:min-h-[620px] lg:pb-16">
          <div className="public-rise max-w-[42rem]">
            <p className="public-kicker">Con đường di sản Định Công</p>
            <h1 className="mt-4 max-w-[10ch] text-[clamp(2.8rem,5.9vw,5.4rem)] font-semibold leading-[0.98] text-[var(--tour-ink)]">
              Lối vào di sản Định Công.
            </h1>
            <p className="mt-5 max-w-[36ch] text-base font-normal leading-7 text-[var(--foreground)]/78 sm:text-lg">
              Khám phá đình, đền và tuyến ký ức qua không gian 360 cùng lời dẫn tiếng Việt.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={activeTour.href} className="public-cta">
                Bắt đầu tour
              </Link>
            </div>
          </div>
        </div>
      </HeroShaderBackground>

      <section id="routes" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_1.55fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <h2 className="text-[2rem] font-semibold leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Các tuyến tham quan.
            </h2>
            <p className="mt-4 max-w-[45ch] text-base leading-7 text-[var(--foreground)]/76">
              Từ tour mẫu hiện có, dự án có thể mở rộng thành một bản đồ ký ức của khu vực Định Công.
            </p>
            <Link href="/ke-hoach" className="mt-6 inline-flex border-b border-[var(--primary)] pb-1 text-sm font-semibold text-[var(--tour-ink)] transition-colors hover:text-[var(--primary)]">
              Xem kế hoạch triển khai
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {routeCards.map((route, index) => {
              const content = (
                <>
                  <div className={`relative overflow-hidden ${index === 0 ? "aspect-[4/3] md:aspect-auto md:min-h-[25rem]" : "aspect-[16/10]"}`}>
                    <Image
                      src={route.image}
                      alt={route.title}
                      fill
                      sizes={index === 0 ? "(max-width: 768px) 100vw, 36vw" : "(max-width: 768px) 100vw, 24vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-[var(--primary)]">{route.status}</p>
                    <h3 className="mt-2 text-2xl font-semibold leading-tight text-[var(--tour-ink)]">{route.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{route.description}</p>
                  </div>
                </>
              );

              const className = `public-card public-stagger-item group rounded-[14px] ${
                index === 0 ? "md:row-span-2" : ""
              }`;

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
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div className="public-media relative min-h-[24rem] overflow-hidden rounded-[14px] lg:min-h-[34rem]">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
              alt="Không gian kết nối di tích Định Công"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-[2rem] font-semibold leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Một nền tảng để kể chuyện và bàn giao.
            </h2>
            <div className="mt-6 grid gap-3">
              {capabilities.map((capability, idx) => (
                <p
                  key={capability}
                  className="public-line-item public-stagger-item text-sm font-medium leading-6 text-[var(--tour-ink)]"
                  style={{ "--stagger-index": idx } as React.CSSProperties}
                >
                  {capability}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="min-w-0">
            <h2 className="text-[2rem] font-semibold leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Từ khảo sát đến vận hành.
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-7 text-[var(--foreground)]/76">
              Quy trình giữ nội dung trong tầm kiểm soát của địa phương, đồng thời sẵn sàng cho các tuyến mới.
            </p>
          </div>

          <div className="grid gap-4">
            {deliverySteps.map((step, idx) => (
              <article
                key={step.title}
                className="public-stagger-item grid gap-3 border-t border-[var(--surface-border)] pt-5 sm:grid-cols-[9rem_1fr]"
                style={{ "--stagger-index": idx } as React.CSSProperties}
              >
                <h3 className="text-xl font-semibold text-[var(--tour-ink)]">{step.title}</h3>
                <p className="text-sm leading-6 text-[var(--muted-foreground)]">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="public-panel mx-auto grid max-w-7xl gap-5 rounded-[14px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Mở tour mẫu trên dữ liệu thật.
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Trải nghiệm ảnh không gian, điểm chuyển cảnh và lời thuyết minh trước khi mở rộng thêm tuyến.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            Tham quan
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
