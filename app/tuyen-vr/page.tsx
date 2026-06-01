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

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:py-20">
        <div className="lg:-translate-y-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">Danh mục VR360</p>
          <h1 className="mt-4 text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-none text-[var(--tour-ink)]">
            Các tuyến tham quan di sản
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-7 text-[var(--foreground)]/76">
            Trang này gom toàn bộ tour đang mở và các tuyến phù hợp để mở rộng trong các giai đoạn tiếp theo.
          </p>
        </div>

        <div className="public-media public-float relative min-h-[20rem] overflow-hidden rounded-[8px] lg:min-h-[28rem] lg:translate-x-8">
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

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="grid gap-4 lg:grid-cols-2">
          {routeCards.map((route) => {
            const content = (
              <>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={route.image}
                    alt={route.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-black text-[var(--tour-jade)]">{route.status}</p>
                  <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--tour-ink)]">{route.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{route.description}</p>
                </div>
              </>
            );

            if (route.href) {
              return (
                <Link
                  key={route.title}
                  href={route.href}
                  className="public-card group overflow-hidden rounded-[8px] transition-transform hover:-translate-y-1"
                >
                  {content}
                </Link>
              );
            }

            return (
              <article
                key={route.title}
                className="public-card group overflow-hidden rounded-[8px]"
              >
                {content}
              </article>
            );
          })}
        </div>

        <div className="public-panel mt-6 rounded-[8px] p-5 lg:-translate-y-8">
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

      <SiteFooter />
    </main>
  );
}
