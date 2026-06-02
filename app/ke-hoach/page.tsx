import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, budgetGroups, deliverySteps } from "@/app/content";

export const metadata: Metadata = {
  title: "Kế hoạch triển khai | Con đường di sản Định Công",
  description: "Kế hoạch triển khai dự án Con đường di sản Phường Định Công qua công nghệ VR360.",
};

export default function PlanPage() {
  return (
    <main className="public-page min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-20">
        <div className="min-w-0 lg:-translate-y-8">
          <p className="public-kicker">Kế hoạch dự án</p>
          <h1 className="mt-4 text-[clamp(2.25rem,10vw,4.8rem)] font-black leading-[0.98] text-[var(--tour-ink)]">
            <span className="public-gradient-text block">Triển khai</span>
            <span className="public-slide-up block" style={{ animationDelay: '200ms' }}>đồng bộ,</span>
            <span className="public-slide-up block" style={{ animationDelay: '400ms' }}>dễ kiểm soát</span>
          </h1>
          <p className="public-fade-in mt-5 max-w-[64ch] text-base leading-7 text-[var(--foreground)]/76" style={{ animationDelay: '600ms' }}>
            Kế hoạch được chia thành các hạng mục rõ ràng để UBND Phường theo dõi phạm vi, tiến độ và dự toán kinh phí.
          </p>
          <div className="public-bounce-in mt-8" style={{ animationDelay: '800ms' }}>
            <Link
              href={activeTour.href}
              className="public-cta"
            >
              Xem tour mẫu ✦
            </Link>
          </div>
        </div>

        <div className="public-media public-float public-shimmer relative min-h-[22rem] overflow-hidden rounded-[16px] lg:min-h-[32rem] lg:translate-x-8">
          <Image
            src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
            alt="Không gian kết nối di tích Định Công"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--tour-gold)]/30 via-transparent to-[var(--tour-jade)]/20 mix-blend-overlay" />
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:py-24">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="public-kicker">
              Luồng triển khai
            </p>
            <h2 className="mt-4 max-w-2xl text-[2.25rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              <span className="block">Đi từ <span className="public-gradient-text">thực địa</span></span>
              <span className="block">đến nền trải nghiệm.</span>
            </h2>
            <p className="mt-5 max-w-[50ch] text-base leading-7 text-[var(--foreground)]/76">
              Mỗi bước có đầu ra rõ ràng để địa phương dễ nghiệm thu, biên tập và mở rộng dữ liệu sau này.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-6">
            {deliverySteps.map((step, index) => (
              <article
                key={step.title}
                className={`public-card public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4 ${
                  index === 0
                    ? "lg:col-span-4 border-[var(--tour-coral)]"
                    : index === 1
                      ? "lg:col-span-2 lg:translate-y-10 border-[var(--tour-gold)]"
                      : index === 2
                        ? "lg:col-span-3 lg:-translate-y-2 border-[var(--tour-jade)]"
                        : "lg:col-span-3 lg:translate-y-8 border-[var(--tour-teal)]"
                }`}
              >
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-[12px] text-white font-black text-xl shadow-lg" style={{ 
                  background: `linear-gradient(135deg, ${index === 0 ? 'var(--tour-coral)' : index === 1 ? 'var(--tour-gold)' : index === 2 ? 'var(--tour-jade)' : 'var(--tour-teal)'}, ${index === 0 ? 'var(--tour-gold)' : index === 1 ? 'var(--tour-jade)' : index === 2 ? 'var(--tour-teal)' : 'var(--tour-purple)'})`
                }}>
                  {index + 1}
                </div>
                <h3 className="text-2xl font-black text-[var(--tour-ink)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="public-media public-drift public-shimmer relative min-h-[24rem] overflow-hidden rounded-[16px] lg:min-h-[40rem] lg:-translate-x-8">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/13 Chính điện Đền thờ Tổ nghề.jpg"
              alt="Chính điện Đền thờ Tổ nghề tại Định Công"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-[var(--tour-coral)]/30 via-transparent to-[var(--tour-teal)]/20 mix-blend-overlay" />
          </div>

          <div className="min-w-0">
            <h2 className="max-w-2xl text-[2.25rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              Dự toán chia theo <span className="public-gradient-text">đầu việc</span>, không dàn đều hình thức.
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-7 text-[var(--foreground)]/76">
              Các nhóm chi phí được trình bày theo logic bàn giao: dữ liệu, nền tảng trải nghiệm và vận hành.
            </p>

            <div className="mt-8 grid gap-4">
              {budgetGroups.map((group, index) => (
                <article
                  key={group.title}
                  className={`public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 border-l-4 ${
                    index === 1 ? "lg:ml-10" : index === 2 ? "lg:mr-14" : ""
                  }`}
                  style={{ 
                    borderLeftColor: index === 0 ? 'var(--tour-coral)' : index === 1 ? 'var(--tour-jade)' : 'var(--tour-teal)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-white font-black shadow-lg" style={{ 
                      background: `linear-gradient(135deg, ${index === 0 ? 'var(--tour-coral)' : index === 1 ? 'var(--tour-jade)' : 'var(--tour-teal)'}, ${index === 0 ? 'var(--tour-gold)' : index === 1 ? 'var(--tour-teal)' : 'var(--tour-purple)'})`
                    }}>
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-black text-[var(--tour-ink)]">{group.title}</h3>
                  </div>
                  <div className="divide-y divide-[var(--surface-border)]">
                    {group.items.map((item, idx) => (
                      <div key={item} className="py-3 flex items-center gap-2">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--tour-jade)] to-[var(--tour-teal)]">
                          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold leading-6 text-[var(--foreground)]/78">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:py-16">
          <div>
            <p className="public-kicker">
              Nguyên tắc bàn giao
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Một nền VR360 có thể <span className="public-gradient-text">mở rộng thêm</span> chùa, đình và tuyến ký ức cộng đồng.
            </h2>
          </div>
          <Link
            href="/giai-phap"
            className="w-fit border-b-2 border-[var(--primary)] pb-1 text-sm font-extrabold text-[var(--tour-ink)] transition-all hover:text-[var(--primary)] hover:border-[var(--tour-jade)]"
          >
            Xem giải pháp công nghệ →
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Lợi ích <span className="public-gradient-text">bền vững</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] text-base leading-7 text-[var(--foreground)]/76">
              Dự án mang lại giá trị lâu dài cho cộng đồng và địa phương
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                title: "Lưu giữ vĩnh viễn", 
                desc: "Dữ liệu số hóa được bảo quản an toàn, không bị ảnh hưởng bởi thời gian và thiên tai",
                icon: "💾",
                color: "var(--tour-coral)"
              },
              { 
                title: "Giáo dục miễn phí", 
                desc: "Học sinh và người dân có thể học tập về lịch sử địa phương mọi lúc, mọi nơi",
                icon: "📚",
                color: "var(--tour-gold)"
              },
              { 
                title: "Quảng bá rộng rãi", 
                desc: "Người nước ngoài và người Việt xa quê có thể tìm hiểu về di sản Định Công",
                icon: "🌏",
                color: "var(--tour-jade)"
              },
              { 
                title: "Dễ mở rộng", 
                desc: "Hệ thống sẵn sàng cho các tuyến di sản mới mà không cần xây dựng lại từ đầu",
                icon: "🚀",
                color: "var(--tour-teal)"
              },
              { 
                title: "Nghiên cứu khoa học", 
                desc: "Nhà nghiên cứu có thể sử dụng dữ liệu cho các công trình học thuật",
                icon: "🔬",
                color: "var(--tour-purple)"
              },
              { 
                title: "Tài liệu mở", 
                desc: "Dữ liệu có thể chia sẻ cho giảng dạy, nghiên cứu và hoạt động văn hóa",
                icon: "📖",
                color: "var(--tour-coral)"
              }
            ].map((benefit, idx) => (
              <article
                key={benefit.title}
                className="public-panel public-stagger-item public-hover-lift rounded-[16px] p-6 border-t-4"
                style={{ borderTopColor: benefit.color }}
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-black text-[var(--tour-ink)]">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{benefit.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="public-panel public-glow public-shimmer mx-auto grid max-w-7xl gap-5 rounded-[16px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8 border-2 border-[var(--primary)]/40">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[var(--tour-ink)] sm:text-4xl">
              Trải nghiệm <span className="public-gradient-text">kế hoạch thực tế</span>
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Tour đầu tiên đã sẵn sàng để kiểm chứng chất lượng và khả năng mở rộng của hệ thống.
            </p>
          </div>
          <Link href={activeTour.href} className="public-cta w-fit">
            Xem tour mẫu ✦
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
