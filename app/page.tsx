import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, capabilities, deliverySteps, routeCards } from "@/app/content";

export const metadata: Metadata = {
  title: "Con đường di sản Định Công qua công nghệ VR360",
  description:
    "Landing page dự án Con đường di sản Phường Định Công, kết nối người dân với di sản qua trải nghiệm VR360.",
};

export default function Home() {
  return (
    <main className="public-page landing-page min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="relative isolate overflow-hidden">
        <Image
          src={activeTour.coverImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.16] blur-[2px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(23_16_12_/_0.94)_0%,rgb(34_23_15_/_0.82)_42%,rgb(12_8_6_/_0.42)_100%)]" />

        <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-center lg:py-16">
          <div className="min-w-0 max-w-2xl lg:-translate-y-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">
              Con đường di sản
            </p>
            <h1 className="mt-4 text-[clamp(2.35rem,10vw,5.3rem)] font-black leading-[0.98] text-[var(--tour-ink)]">
              <span className="block">Định Công</span>
              <span className="block">qua VR360</span>
            </h1>
            <p className="mt-5 max-w-[54ch] text-base font-medium leading-7 text-[var(--foreground)]/78 sm:text-lg">
              Cổng tham quan số giúp Phường Định Công bảo tồn, giới thiệu và mở rộng dữ liệu di tích.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={activeTour.href}
                className="rounded-[8px] bg-[var(--primary)] px-5 py-3 text-sm font-extrabold text-[#17100c] shadow-[0_18px_48px_rgb(199_154_98_/_0.2)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Bắt đầu tham quan
              </Link>
              <Link
                href="/ke-hoach"
                className="rounded-[8px] border border-[var(--surface-border)] bg-[var(--surface-glass)] px-5 py-3 text-sm font-extrabold text-[var(--tour-ink)] transition-colors hover:bg-[var(--surface-glass-strong)]"
              >
                Xem kế hoạch
              </Link>
            </div>

            <dl className="public-panel mt-9 grid w-full max-w-xl grid-cols-1 overflow-hidden rounded-[8px] text-[var(--tour-ink)] sm:grid-cols-3">
              <Metric value={activeTour.sceneCount} label="Điểm quét" />
              <Metric value="VR360" label="Công nghệ lõi" />
              <Metric value="ICS" label="Triển khai" />
            </dl>
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:translate-x-8">
            <Link
              href={activeTour.href}
              className="public-media public-float group relative min-h-[22rem] overflow-hidden rounded-[8px] bg-[var(--tour-wood)] lg:min-h-[34rem]"
            >
              <Image
                src={activeTour.heroImage}
                alt={activeTour.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgb(0_0_0_/_0.72)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                <h2 className="max-w-xl text-3xl font-black leading-tight sm:text-4xl">
                  {activeTour.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-white/78">{activeTour.subtitle}</p>
              </div>
            </Link>

            <aside className="grid gap-4 lg:translate-y-10">
              <div className="public-media public-drift relative min-h-48 overflow-hidden rounded-[8px] lg:min-h-64">
                <Image
                  src={activeTour.gateImage}
                  alt="Cổng Đình Làng Định Công Thượng"
                  fill
                  sizes="(max-width: 1024px) 100vw, 18rem"
                  className="object-cover"
                />
              </div>
              <div className="public-panel rounded-[8px] p-5">
                <p className="text-sm font-black leading-5 text-[var(--tour-ink)]">Mục tiêu dự án</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--foreground)]/78">
                  Kết nối người dân với di sản qua trải nghiệm thực tế ảo và một nền dữ liệu có thể mở rộng.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="routes" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="min-w-0 max-w-3xl">
          <h2 className="text-[2.25rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
            Một trang chủ cho toàn bộ tuyến di sản.
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-7 text-[var(--foreground)]/76">
            Tour đang vận hành được đặt cạnh các tuyến mở rộng để dự án có thể lớn lên theo từng đợt khảo sát và phê duyệt nội dung.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {routeCards.map((route, index) => {
            const className =
              "public-card group overflow-hidden rounded-[8px] transition-transform hover:-translate-y-1";
            const content = (
              <>
                <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/11] lg:aspect-[4/3]" : "aspect-[16/10]"}`}>
                  <Image
                    src={route.image}
                    alt={route.title}
                    fill
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 46vw" : "(max-width: 1024px) 100vw, 27vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-black text-[var(--primary)]">{route.status}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight text-[var(--tour-ink)]">{route.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{route.description}</p>
                </div>
              </>
            );

            if (route.href) {
              return (
                <Link key={route.title} href={route.href} className={`${className} ${index === 0 ? "lg:row-span-2" : ""}`}>
                  {content}
                </Link>
              );
            }

            return (
              <article key={route.title} className={`${className} ${index === 0 ? "lg:row-span-2" : ""}`}>
                {content}
              </article>
            );
          })}

          <div className="public-panel rounded-[8px] p-5 lg:col-span-2">
            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
              {capabilities.map((capability) => (
                <p
                  key={capability}
                  className="border-t border-[var(--surface-border)] pt-3 text-sm font-bold leading-5 text-[var(--tour-ink)]"
                >
                  {capability}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <div className="public-media public-drift relative min-h-[24rem] overflow-hidden rounded-[8px] lg:min-h-[36rem] lg:-translate-x-8">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
              alt="Không gian kết nối di tích Định Công"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-[2.25rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              Từ khảo sát thực địa đến bảo tàng số.
            </h2>
            <p className="mt-5 max-w-[62ch] text-base leading-7 text-[var(--foreground)]/78">
              Kế hoạch được tổ chức theo các bước rõ ràng để UBND Phường dễ kiểm soát phạm vi, nội dung và kinh phí từng hạng mục.
            </p>

            <div className="mt-8 border-l border-[var(--surface-border)] pl-5">
              {deliverySteps.map((step, index) => (
                <article
                  key={step.title}
                  className={`relative py-5 ${index % 2 === 1 ? "lg:translate-x-8" : ""}`}
                >
                  <span className="absolute -left-[1.62rem] top-7 h-3 w-3 rounded-full border border-[var(--primary)] bg-[var(--background)] shadow-[0_0_0_6px_rgb(199_154_98_/_0.08)]" />
                  <h3 className="text-xl font-black text-[var(--tour-ink)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{step.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="public-panel grid gap-6 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Trải nghiệm thử tuyến đầu tiên.
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Dữ liệu hiện có đã đủ để trình diễn cấu trúc nền tảng, cách chuyển cảnh và lớp thuyết minh trong không gian VR360.
            </p>
          </div>
          <Link
            href={activeTour.href}
            className="w-fit rounded-[8px] bg-[var(--primary)] px-5 py-3 text-sm font-extrabold text-[#17100c] shadow-[0_18px_48px_rgb(199_154_98_/_0.2)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Bắt đầu tham quan
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 border-[rgb(199_154_98_/_0.18)] p-4 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0">
      <dt className="text-2xl font-black leading-none">{value}</dt>
      <dd className="mt-2 break-words text-[0.62rem] font-black uppercase tracking-[0.08em] text-[var(--muted-foreground)] sm:text-[0.68rem] sm:tracking-[0.11em]">
        {label}
      </dd>
    </div>
  );
}
