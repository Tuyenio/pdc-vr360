import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Clock, FileText, Mail, MapPin, Phone, Send, Upload } from "lucide-react";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour } from "@/app/content";

export const metadata: Metadata = {
  title: "Liên hệ | VR360 Định Công",
  description:
    "Gửi góp ý, đề xuất tư liệu hoặc liên hệ hợp tác phát triển không gian văn hóa số phường Định Công.",
};

const contactInfo = [
  {
    label: "Đơn vị phụ trách",
    value: "Ban quản trị dự án VR360 phường Định Công",
    icon: Building2,
  },
  {
    label: "Khu vực",
    value: "Phường Định Công, Hà Nội",
    icon: MapPin,
  },
  {
    label: "Email",
    value: "Đang cập nhật",
    icon: Mail,
  },
  {
    label: "Số điện thoại",
    value: "Đang cập nhật",
    icon: Phone,
  },
  {
    label: "Thời gian phản hồi",
    value: "Trong giờ hành chính",
    icon: Clock,
  },
];

export default function ContactPage() {
  return (
    <main className="public-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="public-subpage-hero public-subpage-hero--compact relative isolate overflow-hidden border-b border-[var(--surface-border)]">
        <Image
          src={activeTour.gateImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="public-subpage-hero-image object-cover"
        />

        <div className="public-subpage-hero-content mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:min-h-[540px] lg:grid-cols-[0.95fr_0.7fr] lg:items-center lg:py-20">
          <div className="public-rise public-hero-rule w-full min-w-0 max-w-4xl">
            <p className="public-kicker">Liên hệ và góp ý</p>
            <h1 className="public-gradient-text public-heading-safe public-subpage-title mt-4 text-[clamp(2.55rem,5.8vw,5.35rem)] font-extrabold">
              Liên hệ
            </h1>
            <p className="public-subpage-copy mt-6 text-base leading-8 text-[var(--foreground)]/82 sm:text-lg">
              Gửi góp ý, đề xuất tư liệu hoặc liên hệ hợp tác phát triển không gian văn hóa số phường Định Công.
            </p>
          </div>

          <div className="public-image-stage public-hero-photo public-stagger-item hidden lg:block">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/13 Chính điện Đền thờ Tổ nghề.jpg"
              alt="Không gian thờ tự tại Định Công"
              fill
              sizes="38vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:py-20">
        <div className="grid gap-4">
          <div className="public-panel rounded-[8px] p-6">
            <p className="public-kicker">Thông tin liên hệ</p>
            <h2 className="public-heading-safe mt-3 text-2xl font-bold text-[var(--tour-ink)]">
              Đầu mối tiếp nhận thông tin dự án.
            </h2>
            <div className="mt-6 grid gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="grid gap-2 border-t border-[var(--surface-border)] pt-4 sm:grid-cols-[2rem_1fr]">
                    <Icon className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.8} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--primary)]">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-[var(--tour-ink)]">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="public-panel rounded-[8px] p-6">
            <Upload className="h-7 w-7 text-[var(--primary)]" strokeWidth={1.8} />
            <h2 className="public-heading-safe mt-4 text-2xl font-bold text-[var(--tour-ink)]">
              Đề xuất tư liệu
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
              Nếu bạn có hình ảnh, tư liệu lịch sử, câu chuyện hoặc thông tin liên quan đến các di tích tại Định Công, hãy gửi cho chúng tôi để cùng hoàn thiện kho tư liệu số.
            </p>
          </div>
        </div>

        <form className="public-card rounded-[8px] p-5 sm:p-6">
          <p className="public-kicker">Form liên hệ</p>
          <h2 className="public-heading-safe mt-3 text-2xl font-bold text-[var(--tour-ink)]">
            Gửi liên hệ
          </h2>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[var(--tour-ink)]">Họ và tên</span>
              <input className="h-12 rounded-[8px] border border-[var(--surface-border)] bg-white/82 px-4 text-sm font-semibold text-[var(--tour-ink)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgb(142_95_11_/_0.12)]" placeholder="Nhập họ và tên" />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[var(--tour-ink)]">Số điện thoại hoặc email</span>
              <input className="h-12 rounded-[8px] border border-[var(--surface-border)] bg-white/82 px-4 text-sm font-semibold text-[var(--tour-ink)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgb(142_95_11_/_0.12)]" placeholder="Nhập thông tin liên hệ" />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[var(--tour-ink)]">Chủ đề liên hệ</span>
              <input className="h-12 rounded-[8px] border border-[var(--surface-border)] bg-white/82 px-4 text-sm font-semibold text-[var(--tour-ink)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgb(142_95_11_/_0.12)]" placeholder="Góp ý, đề xuất tư liệu, hợp tác" />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[var(--tour-ink)]">Nội dung</span>
              <textarea className="min-h-36 rounded-[8px] border border-[var(--surface-border)] bg-white/82 px-4 py-3 text-sm font-semibold leading-6 text-[var(--tour-ink)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgb(142_95_11_/_0.12)]" placeholder="Nhập nội dung cần trao đổi" />
            </label>
          </div>

          <button type="button" className="public-cta mt-6 w-full sm:w-fit">
            <Send className="h-4 w-4" strokeWidth={1.8} />
            Gửi liên hệ
          </button>
        </form>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-20">
          <div className="min-w-0">
            <p className="public-kicker">Bản đồ</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Bản đồ khu vực phường Định Công
            </h2>
            <p className="mt-4 max-w-[56ch] text-base leading-7 text-[var(--foreground)]/76">
              Khu vực bản đồ có thể tích hợp bản đồ số trong giai đoạn phát triển tiếp theo để hiển thị vị trí các điểm văn hóa.
            </p>
          </div>

          <div className="public-panel grid min-h-[22rem] place-items-center rounded-[8px] p-6 text-center">
            <div>
              <MapPin className="mx-auto h-10 w-10 text-[var(--primary)]" strokeWidth={1.8} />
              <p className="mt-4 text-lg font-bold text-[var(--tour-ink)]">Bản đồ khu vực phường Định Công</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Placeholder bản đồ số</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="public-panel public-glow mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <p className="public-kicker">Tiếp nhận góp ý</p>
            <h2 className="public-heading-safe mt-2 text-3xl font-bold text-[var(--tour-ink)] sm:text-4xl">
              Cùng hoàn thiện không gian văn hóa số Định Công.
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Mọi tư liệu và góp ý phù hợp sẽ giúp dự án được đầy đủ, chính xác và gần hơn với cộng đồng.
            </p>
          </div>
          <FileText className="hidden h-14 w-14 text-[var(--primary)] lg:block" strokeWidth={1.6} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
