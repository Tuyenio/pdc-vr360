import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Archive, BookOpen, CheckCircle2, Headphones, PlayCircle, ShieldCheck, Smartphone, Users } from "lucide-react";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, capabilities, projectPillars, upcomingTour } from "@/app/content";

export const metadata: Metadata = {
  title: "Giới thiệu | Con đường di sản Định Công",
  description:
    "Giới thiệu dự án Con đường di sản Định Công, nền tảng VR360 phục vụ số hóa di tích, giáo dục cộng đồng và truyền thông văn hóa địa phương.",
};

const goals = [
  {
    title: "Bảo tồn dữ liệu di tích",
    detail: "Ghi nhận không gian bằng ảnh 360 độ, thuyết minh và điểm chuyển cảnh để hình thành hồ sơ trải nghiệm số.",
    icon: Archive,
  },
  {
    title: "Hỗ trợ giáo dục địa phương",
    detail: "Tạo tư liệu trực quan cho học sinh, người dân và du khách tìm hiểu lịch sử, tín ngưỡng, nghề truyền thống.",
    icon: BookOpen,
  },
  {
    title: "Kết nối cộng đồng",
    detail: "Mở thêm lớp câu chuyện, tư liệu ảnh và ký ức người dân khi các tuyến di sản được bổ sung.",
    icon: Users,
  },
];

const vrFeatures = [
  { title: "Xem không gian 360 độ", icon: Smartphone },
  { title: "Nghe thuyết minh tiếng Việt", icon: Headphones },
  { title: "Nội dung được biên tập rõ ràng", icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <main className="public-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="public-subpage-hero relative isolate overflow-hidden border-b border-[var(--surface-border)]">
        <Image
          src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="public-subpage-hero-image object-cover"
        />

        <div className="public-subpage-hero-content mx-auto grid max-w-7xl gap-10 px-4 py-18 sm:px-6 lg:min-h-[640px] lg:grid-cols-[0.9fr_0.75fr] lg:items-center lg:py-24">
          <div className="public-rise public-hero-rule w-full min-w-0 max-w-4xl">
            <p className="public-kicker">Về dự án</p>
            <h1 className="public-gradient-text public-heading-safe public-subpage-title mt-4 text-[clamp(2.55rem,6vw,5.7rem)] font-extrabold">
              Số hóa di tích Định Công bằng VR360.
            </h1>
            <p className="public-subpage-copy mt-6 text-base leading-8 text-[var(--foreground)]/82 sm:text-lg">
              Con đường di sản Định Công giới thiệu các điểm di tích của phường bằng ảnh 360 độ, thuyết minh tiếng Việt và tuyến tham quan trực tuyến dễ tiếp cận cho người dân, học sinh và du khách.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="public-chip">
                <Smartphone className="h-4 w-4" strokeWidth={1.8} />
                Dễ xem trên điện thoại
              </span>
              <span className="public-chip">
                <Headphones className="h-4 w-4" strokeWidth={1.8} />
                Thuyết minh tiếng Việt
              </span>
              <span className="public-chip">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.8} />
                Nội dung có kiểm soát
              </span>
            </div>
          </div>

          <div className="public-image-stage public-hero-photo public-stagger-item hidden lg:block">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
              alt="Không gian kết nối di tích Định Công"
              fill
              sizes="42vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
        <div className="public-media relative min-h-[25rem] overflow-hidden rounded-[8px] lg:min-h-[38rem]">
          <Image
            src="/images-tour/Đình Làng-Đền Thờ/6 Trung Đình.jpg"
            alt="Không gian Trung Đình tại Đình Làng Định Công Thượng"
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="public-kicker">Cách tiếp cận</p>
          <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
            Không chỉ chụp ảnh, mà tổ chức một hành trình tham quan rõ ràng.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-[var(--foreground)]/78">
            <p>
              Mỗi điểm tham quan được đặt trong một tuyến kể chuyện: người xem có thể di chuyển giữa các không gian, quan sát chi tiết kiến trúc và nghe lớp giới thiệu phù hợp.
            </p>
            <p>
              Nội dung hướng đến ba nhóm chính: người dân địa phương cần nguồn tham khảo tin cậy, học sinh cần tư liệu trực quan, và du khách cần cách tiếp cận di sản trước khi tới thực địa.
            </p>
            <p>
              Khi bổ sung Chùa Liên Hoa, hệ thống tiếp tục mở rộng trên cùng cấu trúc website và cách vận hành tour đã ổn định.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="public-kicker">Mục tiêu</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Một nền tảng phục vụ bảo tồn, truyền thông và bàn giao.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {goals.map((goal) => {
              const Icon = goal.icon;

              return (
                <article key={goal.title} className="public-panel public-stagger-item rounded-[8px] p-5">
                  <Icon className="h-7 w-7 text-[var(--primary)]" strokeWidth={1.8} />
                  <h3 className="mt-5 text-xl font-bold text-[var(--tour-ink)]">{goal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{goal.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:py-20">
        <div className="min-w-0">
          <p className="public-kicker">Sản phẩm VR360</p>
          <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
            Trải nghiệm số được đóng gói cho người xem phổ thông.
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-7 text-[var(--foreground)]/76">
            Giao diện ưu tiên chữ dễ đọc, ảnh thật, hành động rõ ràng và khả năng dùng tốt trên điện thoại.
          </p>
        </div>

        <div className="grid gap-4">
          {capabilities.map((capability) => (
            <div key={capability} className="public-line-item flex items-start gap-3 text-sm font-semibold leading-6 text-[var(--tour-ink)]">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" strokeWidth={1.8} />
              {capability}
            </div>
          ))}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {vrFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="public-soft-list public-stagger-item rounded-[8px] p-4">
                  <Icon className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.8} />
                  <p className="mt-3 text-sm font-bold leading-5 text-[var(--tour-ink)]">{feature.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {projectPillars.map((pillar) => (
              <article key={pillar.title} className="border-t border-[var(--surface-border)] pt-5">
                <h3 className="text-xl font-bold text-[var(--tour-ink)]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{pillar.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="public-panel public-glow public-shimmer mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="public-heading-safe text-3xl font-bold text-[var(--tour-ink)] sm:text-4xl">
              Xem cách dự án vận hành trên tour đầu tiên.
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Tour {activeTour.title} là mẫu hoàn thiện đầu tiên để kiểm chứng chất lượng trải nghiệm và làm nền cho tuyến {upcomingTour.title}.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            <PlayCircle className="h-4 w-4" strokeWidth={1.8} />
            Mở tour VR360
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
