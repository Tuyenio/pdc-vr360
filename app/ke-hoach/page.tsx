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
            <span className="block">Triển khai</span>
            <span className="block">đồng bộ,</span>
            <span className="block">dễ kiểm soát</span>
          </h1>
          <p className="mt-5 max-w-[64ch] text-base leading-7 text-[var(--foreground)]/76">
            Kế hoạch được chia thành các hạng mục rõ ràng để UBND Phường theo dõi phạm vi, tiến độ và dự toán kinh phí.
          </p>
          <div className="mt-8">
            <Link
              href={activeTour.href}
              className="public-cta"
            >
              Xem tour mẫu
            </Link>
          </div>
        </div>

        <div className="public-media public-float relative min-h-[22rem] overflow-hidden rounded-[8px] lg:min-h-[32rem] lg:translate-x-8">
          <Image
            src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
            alt="Không gian kết nối di tích Định Công"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:py-24">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="public-kicker">
              Luồng triển khai
            </p>
            <h2 className="mt-4 max-w-2xl text-[2.25rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              <span className="block">Đi từ thực địa</span>
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
                className={`public-card rounded-[8px] p-6 ${
                  index === 0
                    ? "lg:col-span-4"
                    : index === 1
                      ? "lg:col-span-2 lg:translate-y-10"
                      : index === 2
                        ? "lg:col-span-3 lg:-translate-y-2"
                        : "lg:col-span-3 lg:translate-y-8"
                }`}
              >
                <h3 className="text-2xl font-black text-[var(--tour-ink)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="public-media public-drift relative min-h-[24rem] overflow-hidden rounded-[8px] lg:min-h-[40rem] lg:-translate-x-8">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/13 Chính điện Đền thờ Tổ nghề.jpg"
              alt="Chính điện Đền thờ Tổ nghề tại Định Công"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h2 className="max-w-2xl text-[2.25rem] font-black leading-tight text-[var(--tour-ink)] sm:text-5xl">
              Dự toán chia theo đầu việc, không dàn đều hình thức.
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-7 text-[var(--foreground)]/76">
              Các nhóm chi phí được trình bày theo logic bàn giao: dữ liệu, nền tảng trải nghiệm và vận hành.
            </p>

            <div className="mt-8 grid gap-4">
              {budgetGroups.map((group, index) => (
                <article
                  key={group.title}
                  className={`public-panel rounded-[8px] p-6 ${
                    index === 1 ? "lg:ml-10" : index === 2 ? "lg:mr-14" : ""
                  }`}
                >
                  <h3 className="text-2xl font-black text-[var(--tour-ink)]">{group.title}</h3>
                  <div className="mt-4 divide-y divide-[var(--surface-border)]">
                    {group.items.map((item) => (
                      <p key={item} className="py-3 text-sm font-semibold leading-6 text-[var(--foreground)]/78">
                        {item}
                      </p>
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
              Một nền VR360 có thể mở rộng thêm chùa, đình và tuyến ký ức cộng đồng.
            </h2>
          </div>
          <Link
            href="/giai-phap"
            className="w-fit border-b border-[var(--primary)] pb-1 text-sm font-extrabold text-[var(--tour-ink)] transition-colors hover:text-[var(--primary)]"
          >
            Xem giải pháp công nghệ
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
