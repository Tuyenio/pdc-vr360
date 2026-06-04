import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Globe2, Landmark, PlayCircle, School, Sparkles } from "lucide-react";
import { BackToTopButton } from "@/app/components/landing/BackToTopButton";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { HeroShaderBackground } from "@/app/components/ui/hero-shader-background";
import { activeTour, heritageSites } from "@/app/content";

export const metadata: Metadata = {
  title: "Trang chủ | VR360 Định Công",
  description:
    "Landing page chính thức giới thiệu dự án VR360 số hóa di tích, không gian văn hóa và giá trị truyền thống phường Định Công.",
};

const availableSites = heritageSites.filter((site) => site.isAvailable);
const upcomingSites = heritageSites.filter((site) => !site.isAvailable);

const benefits = [
  {
    title: "Tham quan trực tuyến mọi lúc",
    detail: "Người xem có thể tiếp cận không gian văn hóa ngay trên điện thoại hoặc máy tính.",
    icon: Globe2,
  },
  {
    title: "Lưu giữ giá trị văn hóa",
    detail: "Ảnh 360 độ, thuyết minh và tư liệu được tổ chức thành kho dữ liệu dễ mở rộng.",
    icon: Landmark,
  },
  {
    title: "Trải nghiệm không gian 360 độ",
    detail: "Các điểm chuyển cảnh giúp người xem di chuyển mạch lạc giữa từng không gian.",
    icon: Box,
  },
  {
    title: "Hỗ trợ giáo dục địa phương",
    detail: "Tư liệu trực quan phục vụ học sinh, người dân, du khách và hoạt động truyền thông.",
    icon: School,
  },
];

export default function Home() {
  return (
    <main className="public-page landing-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <HeroShaderBackground imageSrc={activeTour.heroImage}>
        <section className="public-hero-inner relative z-10 mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 pb-14 pt-16 sm:px-6 lg:grid-cols-[0.92fr_0.78fr] lg:pb-18">
          <div className="public-rise min-w-0">
            <p className="public-kicker">VR360 số hóa di tích phường Định Công</p>
            <h1 className="public-gradient-text public-heading-safe mt-5 max-w-[18ch] text-[clamp(2.85rem,5.35vw,5rem)] font-extrabold">
              Khám phá không gian văn hóa Định Công qua trải nghiệm VR360
            </h1>
            <p className="mt-6 max-w-[58ch] text-base leading-8 text-[var(--foreground)]/82 sm:text-lg">
              Hành trình số hóa các di tích, không gian văn hóa và giá trị truyền thống của phường Định Công bằng công nghệ tham quan thực tế ảo 360 độ.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/di-tich" className="public-cta">
                <PlayCircle className="h-4 w-4" strokeWidth={1.8} />
                Khám phá ngay
              </Link>
              <Link href="/gioi-thieu" className="public-cta-secondary">
                Tìm hiểu dự án
              </Link>
            </div>
          </div>

          <div className="public-image-stage public-stagger-item relative hidden min-h-[31rem] lg:block">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
              alt="Không gian văn hóa Định Công được số hóa VR360"
              fill
              priority
              sizes="42vw"
              className="object-cover"
            />
          </div>
        </section>
      </HeroShaderBackground>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-20">
        <div className="min-w-0">
          <p className="public-kicker">Giới thiệu nhanh</p>
          <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
            Dự án số hóa di tích phường Định Công
          </h2>
        </div>
        <div className="grid gap-4 text-base leading-7 text-[var(--foreground)]/78">
          <p>
            Dự án VR360 Định Công được xây dựng nhằm bảo tồn tư liệu, quảng bá văn hóa địa phương và tạo điều kiện để người dân, học sinh, du khách tham quan trực tuyến các di tích tiêu biểu.
          </p>
          <p>
            Mỗi không gian được giới thiệu bằng hình ảnh thật, điểm tương tác, thuyết minh tiếng Việt và cấu trúc nội dung dễ theo dõi để phục vụ lâu dài cho truyền thông văn hóa.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="public-kicker">Di tích nổi bật</p>
              <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
                Hai không gian đang mở tour VR360.
              </h2>
            </div>
            <Link href="/di-tich" className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--tour-ink)] transition hover:text-[var(--primary)]">
              Xem toàn bộ không gian
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {availableSites.map((site) => (
              <HomeSiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="max-w-3xl">
          <p className="public-kicker">Sắp ra mắt</p>
          <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
            Các điểm đang bổ sung tư liệu.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {upcomingSites.map((site) => (
            <HomeSiteCard key={site.id} site={site} />
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="public-kicker">Điểm nổi bật</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Giá trị của nền tảng VR360.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="public-panel public-stagger-item rounded-[8px] p-5">
                  <Icon className="h-7 w-7 text-[var(--primary)]" strokeWidth={1.8} />
                  <h3 className="mt-5 text-xl font-bold text-[var(--tour-ink)]">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{benefit.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="public-panel public-glow mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <p className="public-kicker">Bắt đầu khám phá</p>
            <h2 className="public-heading-safe mt-2 text-3xl font-bold text-[var(--tour-ink)] sm:text-4xl">
              Bắt đầu hành trình khám phá Định Công
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Mở danh sách không gian văn hóa để tìm kiếm, lọc và lựa chọn điểm tham quan phù hợp.
            </p>
          </div>
          <Link href="/di-tich" className="public-cta w-fit">
            <Sparkles className="h-4 w-4" strokeWidth={1.8} />
            Xem không gian văn hóa
          </Link>
        </div>
      </section>

      <SiteFooter />
      <BackToTopButton />
    </main>
  );
}

function HomeSiteCard({ site }: { site: (typeof heritageSites)[number] }) {
  return (
    <article className="public-card public-stagger-item group grid overflow-hidden rounded-[8px] md:grid-cols-[0.92fr_1.08fr]">
      <div className="relative min-h-[18rem]">
        <Image
          src={site.image}
          alt={site.name}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
      </div>
      <div className="flex min-h-[18rem] flex-col p-5 sm:p-6">
        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-extrabold ${
            site.isAvailable
              ? "border-[rgb(14_52_39_/_0.18)] bg-[rgb(14_92_62_/_0.12)] text-[var(--tour-ink)]"
              : "border-[rgb(142_95_11_/_0.18)] bg-[rgb(142_95_11_/_0.1)] text-[var(--primary)]"
          }`}
        >
          {site.status}
        </span>
        <p className="mt-4 text-sm font-bold text-[var(--primary)]">{site.type}</p>
        <h3 className="mt-2 text-2xl font-extrabold leading-tight text-[var(--tour-ink)]">{site.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{site.shortDescription}</p>
        <Link href={site.isAvailable ? site.vrUrl ?? site.detailUrl : site.detailUrl} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-extrabold text-[var(--tour-ink)] transition hover:text-[var(--primary)]">
          {site.isAvailable ? "Khám phá VR360" : "Xem thông tin"}
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      </div>
    </article>
  );
}
