import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Gem, Landmark, MapPinned, Trees, Waves } from "lucide-react";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, heritageValues, routeCards, upcomingTour } from "@/app/content";

export const metadata: Metadata = {
  title: "Di tích | Con đường di sản Định Công",
  description:
    "Danh mục di tích trong dự án VR360 Phường Định Công, gồm tour Đình Làng Định Công Thượng, Đền thờ Tổ nghề Kim hoàn và Chùa Liên Hoa.",
};

const currentHighlights = [
  {
    title: "Đình Làng Định Công Thượng",
    detail: "Không gian đình làng, sân lễ, chính điện và các điểm quan sát được tổ chức thành tuyến tham quan 360 độ.",
    image: activeTour.heroImage,
    icon: Landmark,
  },
  {
    title: "Đền thờ Tổ nghề Kim hoàn",
    detail: "Lớp nội dung giới thiệu không gian thờ Tổ nghề và ký ức nghề truyền thống của cộng đồng Định Công.",
    image: activeTour.shrineImage,
    icon: Gem,
  },
  {
    title: "Cảnh quan kết nối",
    detail: "Các điểm hồ, sân, lối dẫn và không gian chuyển tiếp giúp người xem hiểu cấu trúc quần thể di tích.",
    image: activeTour.coverImage,
    icon: Trees,
  },
];

export default function HeritageListPage() {
  return (
    <main className="public-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="public-subpage-hero relative isolate overflow-hidden border-b border-[var(--surface-border)]">
        <Image
          src={activeTour.gateImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="public-subpage-hero-image object-cover"
        />

        <div className="public-subpage-hero-content mx-auto grid max-w-7xl gap-10 px-4 py-18 sm:px-6 lg:min-h-[640px] lg:grid-cols-[0.9fr_0.75fr] lg:items-center lg:py-24">
          <div className="public-rise public-hero-rule w-full min-w-0 max-w-4xl">
            <p className="public-kicker">Danh mục di tích</p>
            <h1 className="public-gradient-text public-heading-safe public-subpage-title mt-4 text-[clamp(2.55rem,6vw,5.7rem)] font-extrabold">
              Di tích Định Công trong không gian VR360.
            </h1>
            <p className="public-subpage-copy mt-6 text-base leading-8 text-[var(--foreground)]/82 sm:text-lg">
              Trang này trình bày các tuyến di tích của Phường Định Công theo trạng thái rõ ràng: tour đã sẵn sàng, tuyến đã mở và các lớp tư liệu có thể mở rộng.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="public-chip">
                <Landmark className="h-4 w-4" strokeWidth={1.8} />
                Di tích trọng tâm
              </span>
              <span className="public-chip">
                <MapPinned className="h-4 w-4" strokeWidth={1.8} />
                Trạng thái minh bạch
              </span>
              <span className="public-chip">
                <Gem className="h-4 w-4" strokeWidth={1.8} />
                Ký ức nghề Kim hoàn
              </span>
            </div>
          </div>

          <div className="public-image-stage public-hero-photo public-stagger-item hidden lg:block">
            <Image
              src={activeTour.gateImage}
              alt="Cổng Đình Làng Định Công Thượng"
              fill
              sizes="42vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-9 lg:grid-cols-[0.38fr_1fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="public-kicker">Trạng thái tuyến</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Các điểm di tích trọng tâm của giai đoạn hiện tại.
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-7 text-[var(--foreground)]/76">
              {activeTour.title} và {upcomingTour.title} đều đã có tour VR360 để người xem mở trực tiếp, nghe thuyết minh và di chuyển theo đúng tuyến tham quan.
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
                    <p className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
                      <MapPinned className="h-4 w-4" strokeWidth={1.8} />
                      {route.status}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight text-[var(--tour-ink)]">{route.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-[var(--foreground)]/72">{route.subtitle}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{route.description}</p>
                    <p className="mt-4 text-sm font-bold text-[var(--tour-ink)]">{route.detail}</p>
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
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="public-kicker">Tour hiện có</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Các cấu phần chính trong tour Đình Làng và Đền thờ.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {currentHighlights.map((heritage) => {
              const Icon = heritage.icon;

              return (
                <article key={heritage.title} className="public-card public-stagger-item group rounded-[8px]">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={heritage.image}
                      alt={heritage.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="p-5">
                    <Icon className="h-6 w-6 text-[var(--primary)]" strokeWidth={1.8} />
                    <h3 className="mt-4 text-xl font-bold text-[var(--tour-ink)]">{heritage.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{heritage.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="public-media relative min-h-[24rem] overflow-hidden rounded-[8px] lg:min-h-[36rem]">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/3 Tả Hồ.jpg"
              alt="Không gian hồ trong quần thể di tích Định Công"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="public-kicker">Giá trị nội dung</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Mỗi di tích cần được kể bằng hình ảnh, âm thanh và ngữ cảnh phù hợp.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {heritageValues.map((value, index) => (
                <article key={value.title} className="border-t border-[var(--surface-border)] pt-5">
                  <div className="flex items-center gap-3">
                    {index === 0 ? <Building2 className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.8} /> : null}
                    {index === 1 ? <Gem className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.8} /> : null}
                    {index === 2 ? <Waves className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.8} /> : null}
                    {index === 3 ? <MapPinned className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.8} /> : null}
                    <h3 className="text-lg font-bold text-[var(--tour-ink)]">{value.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{value.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {routeCards.map((route) => (
              <article key={route.title} className="public-panel public-stagger-item rounded-[8px] p-5">
                <p className="text-sm font-bold text-[var(--primary)]">{route.status}</p>
                <h3 className="mt-3 text-xl font-bold leading-tight text-[var(--tour-ink)]">{route.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{route.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="public-panel public-glow public-shimmer mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="public-heading-safe text-3xl font-bold text-[var(--tour-ink)] sm:text-4xl">
              Tour đang mở đã sẵn sàng tham quan.
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Truy cập {activeTour.title} và {activeTour.subtitle} để xem bản mẫu hoàn thiện đầu tiên của dự án.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            Mở tour
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
