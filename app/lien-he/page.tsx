import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ClipboardList, FileText, MapPin, MessageSquareText, PlayCircle, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, upcomingTour } from "@/app/content";

const contactPoints = [
  {
    title: "Đầu mối phối hợp",
    detail: "Dành cho UBND phường, ban quản lý di tích, tổ dân phố và đơn vị triển khai khi cần thống nhất nội dung số hóa.",
    icon: Building2,
  },
  {
    title: "Địa bàn phục vụ",
    detail: "Các điểm di tích, không gian sinh hoạt văn hóa và tuyến ký ức cộng đồng thuộc Phường Định Công, Hà Nội.",
    icon: MapPin,
  },
  {
    title: "Nội dung làm việc",
    detail: "Phạm vi số hóa, lịch khảo sát, danh mục điểm chụp, lớp thuyết minh, phương án duyệt nội dung và bàn giao.",
    icon: MessageSquareText,
  },
];

const preparationItems = [
  "Danh mục di tích ưu tiên, hiện trạng tư liệu và đầu mối phụ trách từng điểm",
  "Các khu vực cần giới thiệu kỹ, khu vực cần hạn chế ghi hình hoặc cần xin ý kiến trước",
  "Ngôn ngữ trình bày, nhận diện địa phương và quy trình duyệt thuyết minh",
  "Kế hoạch bổ sung tuyến Chùa Liên Hoa và các tư liệu cộng đồng trong giai đoạn tiếp theo",
];

export const metadata: Metadata = {
  title: "Liên hệ | Con đường di sản Định Công",
  description: "Thông tin liên hệ và đầu mối trao đổi dự án VR360 di tích Phường Định Công.",
};

export default function ContactPage() {
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
            <p className="public-kicker">Liên hệ phối hợp</p>
            <h1 className="public-gradient-text public-heading-safe public-subpage-title mt-4 text-[clamp(2.55rem,6vw,5.7rem)] font-extrabold">
              Trao đổi triển khai VR360 di tích Định Công.
            </h1>
            <p className="public-subpage-copy mt-6 text-base leading-8 text-[var(--foreground)]/82 sm:text-lg">
              Trang liên hệ dành cho các đầu mối của phường, ban quản lý di tích và đơn vị triển khai khi cần thống nhất phạm vi số hóa, lịch khảo sát, nội dung thuyết minh và kế hoạch bàn giao.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={activeTour.href} className="public-cta">
                <PlayCircle className="h-4 w-4" strokeWidth={1.8} />
                Xem tour mẫu
              </Link>
              <Link href="/di-tich" className="public-cta-secondary">
                Xem danh mục di tích
              </Link>
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

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:py-20">
          {contactPoints.map((point) => {
            const Icon = point.icon;

            return (
              <article key={point.title} className="public-panel public-stagger-item rounded-[8px] p-5">
                <Icon className="h-6 w-6 text-[var(--primary)]" strokeWidth={1.8} />
                <h2 className="public-heading-safe mt-5 text-xl font-bold text-[var(--tour-ink)]">{point.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{point.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:py-20">
        <div className="min-w-0">
          <p className="public-kicker">Chuẩn bị làm việc</p>
          <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
            Những thông tin giúp chốt phạm vi nhanh và chính xác.
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-7 text-[var(--foreground)]/76">
            Khi có đủ dữ liệu đầu vào, đội triển khai có thể xác định tuyến chụp, nội dung thuyết minh và kế hoạch bàn giao rõ ràng hơn.
          </p>
        </div>

        <div className="grid gap-4">
          {preparationItems.map((item, index) => (
            <article key={item} className="grid gap-3 border-t border-[var(--surface-border)] pt-5 sm:grid-cols-[4rem_1fr]">
              <p className="text-2xl font-bold text-[var(--primary)]">{String(index + 1).padStart(2, "0")}</p>
              <p className="text-sm font-semibold leading-6 text-[var(--tour-ink)]">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20">
          <div className="public-media relative min-h-[22rem] overflow-hidden rounded-[8px] lg:min-h-[32rem]">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/13 Chính điện Đền thờ Tổ nghề.jpg"
              alt="Chính điện Đền thờ Tổ nghề Kim hoàn"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>

          <div className="public-panel public-glow rounded-[8px] p-6">
            <ClipboardList className="h-7 w-7 text-[var(--primary)]" strokeWidth={1.8} />
            <h2 className="public-heading-safe mt-5 text-2xl font-bold text-[var(--tour-ink)]">
              Phạm vi giai đoạn hiện tại
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
              Tour {activeTour.title} và {activeTour.subtitle} đã là dữ liệu mẫu để nghiệm thu trải nghiệm. Tuyến {upcomingTour.title} đang chuẩn bị, cần thống nhất hiện trạng tư liệu, điểm chụp và lớp thuyết minh trước khi hoàn thiện.
            </p>
            <div className="mt-5 grid gap-3">
              <p className="public-line-item flex items-start gap-3 text-sm font-semibold leading-6 text-[var(--tour-ink)]">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" strokeWidth={1.8} />
                Ưu tiên thông tin chính xác, được duyệt bởi đầu mối phụ trách trước khi công bố.
              </p>
              <p className="public-line-item flex items-start gap-3 text-sm font-semibold leading-6 text-[var(--tour-ink)]">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" strokeWidth={1.8} />
                Dữ liệu bàn giao cần rõ ảnh, âm thanh, điểm chuyển cảnh và hướng dẫn vận hành.
              </p>
            </div>
            <Link href="/di-tich" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--tour-ink)] hover:text-[var(--primary)]">
              Xem trạng thái di tích
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="public-panel public-glow public-shimmer mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <h2 className="public-heading-safe text-3xl font-bold text-[var(--tour-ink)] sm:text-4xl">
              Bắt đầu trao đổi từ tour mẫu hiện có.
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Tour đầu tiên là cơ sở trực quan để góp ý giao diện, nội dung, chất lượng ảnh và kế hoạch mở rộng.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            <PlayCircle className="h-4 w-4" strokeWidth={1.8} />
            Mở tour mẫu
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
