import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour } from "@/app/content";

export const metadata: Metadata = {
  title: "Giới thiệu - Con đường di sản Định Công",
  description:
    "Tìm hiểu về dự án Con đường di sản Định Công - kết nối cộng đồng với lịch sử và văn hóa địa phương qua công nghệ VR360.",
};

export default function AboutPage() {
  return (
    <main className="public-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-b border-[var(--surface-border)]">
        <Image
          src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.12] blur-[1px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(10_6_4_/_0.98)_0%,rgb(20_12_8_/_0.88)_48%,rgb(8_5_3_/_0.62)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--tour-coral)]/20 via-transparent to-[var(--tour-jade)]/20 mix-blend-overlay" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
          <div className="public-rise mx-auto max-w-4xl text-center">
            <p className="public-kicker">Về dự án</p>
            <h1 className="public-gradient-text mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.94]">
              Con đường di sản Định Công
            </h1>
            <p className="public-slide-up mx-auto mt-6 max-w-[58ch] text-lg font-medium leading-8 text-[var(--foreground)]/78" style={{ animationDelay: '200ms' }}>
              Một nền tảng số hóa di sản văn hóa, kết nối người dân với lịch sử và di tích của Phường Định Công thông qua trải nghiệm VR360.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
          <div className="public-media public-rotate-in relative min-h-[28rem] overflow-hidden rounded-[16px] lg:min-h-[38rem]">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/6 Trung Đình.jpg"
              alt="Trung đình Định Công"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--tour-coral)]/30 via-transparent to-[var(--tour-teal)]/20 mix-blend-overlay" />
          </div>

          <div className="min-w-0">
            <h2 className="text-[2rem] font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Bảo tồn di sản qua <span className="public-gradient-text">công nghệ</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[var(--foreground)]/78">
              <p className="public-fade-in" style={{ animationDelay: '200ms' }}>
                Dự án <strong className="font-bold text-[var(--tour-jade)]">Con đường di sản Định Công</strong> được khởi xướng nhằm số hóa và lưu giữ các di tích văn hóa, lịch sử tại Phường Định Công, quận Hoàng Mai, Hà Nội.
              </p>
              <p className="public-fade-in" style={{ animationDelay: '400ms' }}>
                Thông qua công nghệ chụp ảnh VR360, chúng tôi tạo ra những tour tham quan ảo cho phép người dân, học sinh và du khách khám phá di sản văn hóa mọi lúc mọi nơi, góp phần gìn giữ và lan tỏa giá trị lịch sử.
              </p>
              <p className="public-fade-in" style={{ animationDelay: '600ms' }}>
                Dự án không chỉ dừng lại ở việc số hóa hình ảnh mà còn xây dựng hệ thống thuyết minh âm thanh, tư liệu ảnh lịch sử và câu chuyện cộng đồng, tạo nên một bức tranh toàn diện về di sản địa phương.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-[2rem] font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Mục tiêu <span className="public-gradient-text">dự án</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] text-base leading-7 text-[var(--foreground)]/76">
              Kết nối cộng đồng với di sản thông qua trải nghiệm số
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4 border-[var(--tour-coral)]">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-br from-[var(--tour-coral)] to-[var(--tour-gold)] text-white shadow-lg">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[var(--tour-ink)]">Bảo tồn di sản</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                Số hóa và lưu giữ hình ảnh, âm thanh, dữ liệu không gian của các di tích văn hóa với độ phân giải cao.
              </p>
            </article>

            <article className="public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4 border-[var(--tour-gold)]">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-br from-[var(--tour-gold)] to-[var(--tour-jade)] text-white shadow-lg">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[var(--tour-ink)]">Giáo dục cộng đồng</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                Tạo công cụ học tập và tìm hiểu lịch sử địa phương cho học sinh, người dân và du khách quan tâm.
              </p>
            </article>

            <article className="public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4 border-[var(--tour-jade)]">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-br from-[var(--tour-jade)] to-[var(--tour-teal)] text-white shadow-lg">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[var(--tour-ink)]">Kết nối cộng đồng</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                Xây dựng nền tảng để người dân chia sẻ câu chuyện, ký ức và tư liệu về di sản địa phương.
              </p>
            </article>

            <article className="public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4 border-[var(--tour-teal)]">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-br from-[var(--tour-teal)] to-[var(--tour-purple)] text-white shadow-lg">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[var(--tour-ink)]">Truy cập toàn cầu</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                Cho phép người Việt xa quê, người nước ngoài và các nhà nghiên cứu truy cập di sản từ xa.
              </p>
            </article>

            <article className="public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4 border-[var(--tour-purple)]">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-br from-[var(--tour-purple)] to-[var(--tour-coral)] text-white shadow-lg">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[var(--tour-ink)]">Mở rộng linh hoạt</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                Hệ thống được thiết kế để dễ dàng bổ sung thêm các tuyến di sản mới khi có nhu cầu.
              </p>
            </article>

            <article className="public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4 border-[var(--tour-gold)]">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[12px] bg-gradient-to-br from-[var(--tour-gold)] to-[var(--tour-coral)] text-white shadow-lg">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[var(--tour-ink)]">Tài liệu mở</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                Dữ liệu số hóa có thể được chia sẻ cho nghiên cứu, giảng dạy và các hoạt động văn hóa cộng đồng.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:items-center">
          <div className="min-w-0">
            <h2 className="text-[2rem] font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Công nghệ <span className="public-gradient-text">VR360</span> cho di sản
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-[var(--foreground)]/78">
              <p className="public-fade-in" style={{ animationDelay: '100ms' }}>
                Công nghệ chụp ảnh VR360 cho phép ghi lại toàn bộ không gian ba chiều của di tích với độ chi tiết cao, tạo trải nghiệm tham quan chân thực như đang đứng tại hiện trường.
              </p>
              <p className="public-fade-in" style={{ animationDelay: '300ms' }}>
                Mỗi điểm tham quan được ghi nhận bằng ảnh 360 độ độ phân giải cao, kèm theo thông tin thuyết minh âm thanh và các điểm chuyển cảnh cho phép di chuyển giữa các không gian khác nhau.
              </p>
              <p className="public-fade-in" style={{ animationDelay: '500ms' }}>
                Người tham quan có thể tự do xoay xem mọi hướng, phóng to chi tiết kiến trúc, nghe thuyết minh và di chuyển theo lộ trình tham quan được thiết kế sẵn.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { text: "Ảnh 360 độ phân giải cao", color: "var(--tour-coral)" },
                { text: "Thuyết minh âm thanh", color: "var(--tour-gold)" },
                { text: "Điểm chuyển cảnh linh hoạt", color: "var(--tour-jade)" },
                { text: "Tối ưu mọi thiết bị", color: "var(--tour-teal)" }
              ].map((item, idx) => (
                <div key={item.text} className="public-bounce-in flex items-start gap-3" style={{ animationDelay: `${700 + idx * 100}ms` }}>
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: item.color }}>
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[var(--tour-ink)]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="public-media public-float relative min-h-[28rem] overflow-hidden rounded-[16px] lg:min-h-[38rem]">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/13 Chính điện Đền thờ Tổ nghề.jpg"
              alt="Đền thờ Tổ nghề Kim hoàn"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-[var(--tour-jade)]/30 via-transparent to-[var(--tour-coral)]/20 mix-blend-overlay" />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="public-panel public-glow public-shimmer mx-auto grid max-w-7xl gap-5 rounded-[16px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8 border-2 border-[var(--primary)]/40">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Khám phá <span className="public-gradient-text">di sản Định Công</span>
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Bắt đầu trải nghiệm với tour đầu tiên về Đình Làng và Đền thờ Tổ nghề Kim hoàn.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            Tham quan ngay ✦
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
