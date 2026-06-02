import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, capabilities, routeCards } from "@/app/content";

export const metadata: Metadata = {
  title: "Tuyến VR | Con đường di sản Định Công",
  description: "Danh sách các tuyến tham quan VR360 của dự án Con đường di sản Phường Định Công.",
};

export default function RoutesPage() {
  return (
    <main className="public-page min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:py-16">
        <div className="min-w-0">
          <p className="public-kicker">Danh mục VR360</p>
          <h1 className="mt-4 max-w-[12ch] text-[clamp(2.6rem,5.4vw,5.1rem)] font-black leading-[0.92] text-[var(--tour-ink)]">
            Danh mục tuyến VR360.
          </h1>
          <p className="mt-5 max-w-[54ch] text-base leading-7 text-[var(--foreground)]/76">
            Tour đang mở được đặt cạnh các tuyến đề xuất để việc mở rộng có cấu trúc ngay từ đầu.
          </p>
        </div>

        <div className="public-media relative min-h-[22rem] rounded-[8px] lg:min-h-[31rem]">
          <Image
            src={activeTour.coverImage}
            alt="Không gian tham quan Định Công"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 54vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {capabilities.map((capability) => (
            <p key={capability} className="border-t border-[var(--surface-border)] pt-4 text-sm font-bold leading-6 text-[var(--tour-ink)]">
              {capability}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-6">
          {routeCards.map((route, index) => {
            const className = `public-card group rounded-[8px] transition-transform hover:-translate-y-1 ${
              index === 0 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-3"
            }`;
            const content = (
              <>
                <div className={`relative overflow-hidden ${index === 0 ? "aspect-[4/3] lg:min-h-[34rem]" : "aspect-[16/8]"}`}>
                  <Image
                    src={route.image}
                    alt={route.title}
                    fill
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 46vw" : "(max-width: 1024px) 100vw, 42vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-black text-[var(--primary)]">{route.status}</p>
                  <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--tour-ink)]">{route.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{route.description}</p>
                </div>
              </>
            );

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

      <SiteFooter />
    </main>
  );
}
