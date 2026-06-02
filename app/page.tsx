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

      <section className="relative isolate overflow-hidden border-b border-[var(--surface-border)]">
        <Image
          src={activeTour.coverImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.18] blur-[1px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(22_15_11_/_0.96)_0%,rgb(31_20_13_/_0.86)_48%,rgb(18_12_8_/_0.58)_100%)]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 px-4 py-10 sm:px-6 lg:min-h-[760px] lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-12">
          <div className="public-rise min-w-0">
            <p className="public-kicker">Con đường di sản Định Công</p>
            <h1 className="mt-4 max-w-[14ch] text-[clamp(2.75rem,5.6vw,5.5rem)] font-black leading-[0.92] text-[var(--tour-ink)]">
              Di sản Định Công qua VR360.
            </h1>
            <p className="mt-5 max-w-[52ch] text-base font-medium leading-7 text-[var(--foreground)]/78 sm:text-lg">
              Một cổng tham quan số để lưu giữ, kể chuyện và mở rộng dữ liệu di tích của Phường Định Công.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={activeTour.href} className="public-cta">
                Tham quan
              </Link>
              <Link href="/tuyen-vr" className="public-cta-secondary">
                Xem tuyến VR
              </Link>
            </div>

            <dl className="mt-8 grid max-w-xl grid-cols-3 border-y border-[var(--surface-border)] py-4 text-[var(--tour-ink)]">
              <Metric value={activeTour.sceneCount} label="Điểm quét" />
              <Metric value="VR360" label="Công nghệ" />
              <Metric value="ICS" label="Đơn vị" />
            </dl>
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end">
            <Link
              href={activeTour.href}
              className="public-media group relative min-h-[24rem] overflow-hidden rounded-[8px] bg-[var(--tour-wood)] lg:min-h-[36rem]"
            >
              <Image
                src={activeTour.heroImage}
                alt={activeTour.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(0_0_0_/_0.74)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                <p className="text-sm font-bold text-[var(--tour-gold-light)]">Tour đang mở</p>
                <h2 className="mt-2 max-w-xl text-3xl font-black leading-tight sm:text-4xl">
                  {activeTour.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-white/78">{activeTour.subtitle}</p>
              </div>
            </Link>

            <aside className="grid gap-4 lg:translate-y-8">
              <div className="public-panel rounded-[8px] p-5">
                <p className="text-sm font-black leading-5 text-[var(--tour-ink)]">Mục tiêu</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--foreground)]/78">
                  Kết nối người dân với di sản qua ảnh 360 độ, tuyến tham quan và lớp thuyết minh.
                </p>
              </div>
              <div className="public-media relative min-h-52 overflow-hidden rounded-[8px] lg:min-h-64">
                <Image
                  src={activeTour.gateImage}
                  alt="Cổng Đình Làng Định Công Thượng"
                  fill
                  sizes="(max-width: 1024px) 100vw, 17rem"
                  className="object-cover"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="routes" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_1.55fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <h2 className="text-[2.25rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              Atlas tuyến di sản.
            </h2>
            <p className="mt-4 max-w-[45ch] text-base leading-7 text-[var(--foreground)]/76">
              Trang chủ gom tour đang vận hành và các tuyến có thể mở rộng khi hoàn tất khảo sát.
            </p>
            <Link href="/ke-hoach" className="mt-6 inline-flex border-b border-[var(--primary)] pb-1 text-sm font-extrabold text-[var(--tour-ink)] transition-colors hover:text-[var(--primary)]">
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

              const className = `public-card group rounded-[8px] transition-transform hover:-translate-y-1 ${
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
          <div className="public-media relative min-h-[24rem] rounded-[8px] lg:min-h-[34rem]">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
              alt="Không gian kết nối di tích Định Công"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-[2.15rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              Nền tảng vừa kể chuyện, vừa bàn giao được.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <p
                  key={capability}
                  className="public-panel rounded-[8px] px-4 py-4 text-sm font-bold leading-5 text-[var(--tour-ink)]"
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
            <h2 className="text-[2.15rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              Từ khảo sát đến vận hành.
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-7 text-[var(--foreground)]/76">
              Quy trình giữ được tính kiểm soát cho địa phương, nhưng vẫn đủ linh hoạt để thêm tuyến mới.
            </p>
          </div>

          <div className="grid gap-4">
            {deliverySteps.map((step) => (
              <article key={step.title} className="grid gap-3 border-t border-[var(--surface-border)] pt-4 sm:grid-cols-[9rem_1fr]">
                <h3 className="text-xl font-black text-[var(--tour-ink)]">{step.title}</h3>
                <p className="text-sm leading-6 text-[var(--muted-foreground)]">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="public-panel mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Mở tour mẫu trên dữ liệu thật.
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Trải nghiệm cấu trúc ảnh 360 độ, điểm chuyển cảnh và thuyết minh trước khi mở rộng thêm tuyến.
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

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 px-3 first:pl-0 not-last:border-r not-last:border-[rgb(208_161_95_/_0.22)]">
      <dt className="text-2xl font-black leading-none sm:text-3xl">{value}</dt>
      <dd className="mt-2 text-[0.68rem] font-black uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
        {label}
      </dd>
    </div>
  );
}
