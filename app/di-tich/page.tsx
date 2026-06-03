import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPinned } from "lucide-react";
import { CulturalSpaceExplorer } from "@/app/components/landing/CulturalSpaceExplorer";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";
import { activeTour, heritageSites } from "@/app/content";

export const metadata: Metadata = {
  title: "Không gian văn hóa | VR360 Định Công",
  description:
    "Danh sách toàn bộ di tích, tour VR360 và địa điểm văn hóa trong dự án số hóa không gian văn hóa phường Định Công.",
};

export default function HeritageListPage() {
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

        <div className="public-subpage-hero-content mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:min-h-[580px] lg:grid-cols-[0.95fr_0.7fr] lg:items-center lg:py-22">
          <div className="public-rise public-hero-rule w-full min-w-0 max-w-4xl">
            <p className="public-kicker">Danh sách di tích và tour VR360</p>
            <h1 className="public-gradient-text public-heading-safe public-subpage-title mt-4 text-[clamp(2.55rem,5.8vw,5.35rem)] font-extrabold">
              Không gian văn hóa Định Công
            </h1>
            <p className="public-subpage-copy mt-6 text-base leading-8 text-[var(--foreground)]/82 sm:text-lg">
              Khám phá các di tích, công trình tâm linh và không gian văn hóa được số hóa bằng công nghệ VR360.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="public-chip">
                <MapPinned className="h-4 w-4" strokeWidth={1.8} />
                {heritageSites.length} địa điểm
              </span>
              <span className="public-chip">
                <MapPinned className="h-4 w-4" strokeWidth={1.8} />
                {heritageSites.filter((site) => site.isAvailable).length} tour đang mở
              </span>
            </div>
          </div>

          <div className="public-image-stage public-hero-photo public-stagger-item hidden lg:block">
            <Image
              src="/images-tour/Chùa Liên Hoa/1 Trước Cổng.jpg"
              alt="Không gian văn hóa Định Công"
              fill
              sizes="38vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <CulturalSpaceExplorer sites={heritageSites} />

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="public-panel public-glow mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <p className="public-kicker">Đề xuất địa điểm</p>
            <h2 className="public-heading-safe mt-2 text-3xl font-bold text-[var(--tour-ink)] sm:text-4xl">
              Bạn muốn đề xuất thêm địa điểm văn hóa?
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Gửi thông tin, hình ảnh hoặc câu chuyện liên quan để cùng hoàn thiện kho tư liệu số của phường Định Công.
            </p>
          </div>
          <Link href="/lien-he" className="public-cta w-fit">
            <Mail className="h-4 w-4" strokeWidth={1.8} />
            Liên hệ với chúng tôi
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
