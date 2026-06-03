import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Compass, MapPinned, PlayCircle } from "lucide-react";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { HeroShaderBackground } from "@/app/components/ui/hero-shader-background";
import {
  activeTour,
  capabilities,
  deliverySteps,
  projectPillars,
  routeCards,
  upcomingTour,
} from "@/app/content";

export const metadata: Metadata = {
  title: "Trang chủ | Con đường di sản Định Công",
  description:
    "Landing page giới thiệu sản phẩm VR360 cho di tích Phường Định Công, gồm tour Đình Làng Định Công Thượng, Đền thờ Tổ nghề Kim hoàn và Chùa Liên Hoa.",
};

export default function Home() {
  return (
    <main className="public-page landing-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <HeroShaderBackground imageSrc={activeTour.heroImage}>
        <div className="public-hero-inner relative z-10 mx-auto flex min-h-[640px] max-w-7xl items-center px-4 pb-12 pt-14 sm:px-6 lg:min-h-[700px] lg:pb-16">
          <div className="public-rise w-full min-w-0 max-w-[54rem]">
            <p className="public-kicker">VR360 di tích Phường Định Công</p>
            <h1 className="public-gradient-text public-heading-safe public-hero-title mt-5 text-[clamp(3rem,7vw,6.4rem)] font-extrabold">
              Con đường di sản Định Công
            </h1>
            <p className="mt-5 max-w-[54ch] text-base leading-8 text-[var(--foreground)]/82 sm:text-lg">
              Không gian giới thiệu tour tham quan số cho di tích Phường Định Công, bắt đầu với Đình Làng Định Công Thượng, Đền thờ Tổ nghề Kim hoàn và Chùa Liên Hoa.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={activeTour.href} className="public-cta">
                <PlayCircle className="h-4 w-4" strokeWidth={1.8} />
                Bắt đầu tour VR360
              </Link>
              <Link href="/di-tich" className="public-cta-secondary">
                Xem danh mục di tích
              </Link>
            </div>
          </div>
        </div>
      </HeroShaderBackground>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-9 lg:grid-cols-[0.42fr_1fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="public-kicker">Danh mục số hóa</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Các tour di tích đang mở.
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-7 text-[var(--foreground)]/76">
              Mỗi tuyến được trình bày rõ trạng thái để người dân, học sinh và du khách có thể mở đúng tour đã hoàn thiện và theo dõi các lớp tư liệu sẽ tiếp tục bổ sung.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {routeCards.slice(0, 2).map((route) => {
              const content = (
                <>
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={route.image}
                      alt={route.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 38vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--primary)]">
                      <MapPinned className="h-4 w-4" strokeWidth={1.8} />
                      {route.status}
                    </div>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-[var(--tour-ink)]">{route.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-[var(--foreground)]/72">{route.subtitle}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{route.description}</p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--tour-ink)]">
                      {route.detail}
                      {route.href ? <ArrowRight className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.8} /> : <Clock className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.8} />}
                    </p>
                  </div>
                </>
              );

              return route.href ? (
                <Link key={route.title} href={route.href} className="public-card public-stagger-item group rounded-[8px]">
                  {content}
                </Link>
              ) : (
                <article key={route.title} className="public-card public-stagger-item group rounded-[8px]">
                  {content}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-9 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="public-media relative min-h-[24rem] overflow-hidden rounded-[8px] lg:min-h-[35rem]">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
              alt="Không gian kết nối di tích Định Công"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="public-kicker">Năng lực nền tảng</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Sản phẩm VR360 được thiết kế để bàn giao và mở rộng.
            </h2>
            <div className="mt-6 grid gap-3">
              {capabilities.map((capability) => (
                <p key={capability} className="public-line-item flex items-start gap-3 text-sm font-semibold leading-6 text-[var(--tour-ink)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" strokeWidth={1.8} />
                  {capability}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="min-w-0">
            <p className="public-kicker">Định hướng thiết kế</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Trang trọng, dễ hiểu, dùng được lâu dài.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {projectPillars.map((pillar) => (
              <article key={pillar.title} className="public-panel public-stagger-item rounded-[8px] p-5">
                <Compass className="h-6 w-6 text-[var(--primary)]" strokeWidth={1.8} />
                <h3 className="mt-4 text-xl font-bold text-[var(--tour-ink)]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{pillar.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:py-20">
          <div className="min-w-0">
            <p className="public-kicker">Quy trình</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Từ khảo sát hiện trạng đến vận hành tour.
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-[var(--foreground)]/76">
              Quy trình giữ nội dung trong tầm kiểm soát của đầu mối địa phương và sẵn sàng tiếp nhận tuyến {upcomingTour.title}.
            </p>
          </div>

          <div className="grid gap-4">
            {deliverySteps.map((step, index) => (
              <article
                key={step.title}
                className="public-stagger-item grid gap-3 border-t border-[var(--surface-border)] pt-5 sm:grid-cols-[4rem_1fr]"
              >
                <p className="text-2xl font-bold text-[var(--primary)]">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="text-xl font-bold text-[var(--tour-ink)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="public-panel public-glow public-shimmer mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="public-heading-safe text-3xl font-bold text-[var(--tour-ink)] sm:text-4xl">
              Trải nghiệm tour đầu tiên trên dữ liệu thật.
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Mở tour {activeTour.title} để kiểm tra chất lượng ảnh 360, điểm chuyển cảnh và thuyết minh trước khi mở rộng {upcomingTour.title}.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            <PlayCircle className="h-4 w-4" strokeWidth={1.8} />
            Mở tour
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
