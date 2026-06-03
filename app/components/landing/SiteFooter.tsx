import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { activeTour, navigation, upcomingTour } from "@/app/content";

export function SiteFooter() {
  return (
    <footer id="contact" className="px-4 pb-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-[var(--surface-border)] pt-8 lg:grid-cols-[1.15fr_0.85fr_0.8fr]">
        <div className="min-w-0">
          <p className="text-lg font-bold text-[var(--tour-ink)]">Con đường di sản Định Công</p>
          <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--muted-foreground)]">
            Website giới thiệu trải nghiệm VR360 cho di tích Phường Định Công, phục vụ truyền thông di sản, giáo dục cộng đồng và bàn giao dữ liệu theo từng giai đoạn.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={activeTour.href} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--tour-ink)] hover:text-[var(--primary)]">
              Tour đang mở
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
            <Link href={upcomingTour.href} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--tour-ink)] hover:text-[var(--primary)]">
              Tour {upcomingTour.title}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        <nav className="grid gap-2 text-sm" aria-label="Liên kết chân trang">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit text-[var(--muted-foreground)] transition-colors hover:text-[var(--tour-ink)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="grid gap-3 text-sm leading-6 text-[var(--muted-foreground)] lg:text-right">
          <p className="font-bold text-[var(--tour-ink)]">Đầu mối phối hợp dự án VR360</p>
          <p className="inline-flex items-center gap-2 lg:justify-end">
            <MapPin className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.8} />
            Phường Định Công, Hà Nội
          </p>
          <Link href="/lien-he" className="inline-flex items-center gap-2 font-semibold text-[var(--tour-ink)] hover:text-[var(--primary)] lg:justify-end">
            <Mail className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.8} />
            Liên hệ phối hợp
          </Link>
        </div>
      </div>
    </footer>
  );
}
