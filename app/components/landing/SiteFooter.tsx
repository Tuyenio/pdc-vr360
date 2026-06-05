import Link from "next/link";
import { ExternalLink, Globe2, Mail, MapPin } from "lucide-react";
import { navigation } from "@/app/content";

export function SiteFooter() {
  return (
    <footer id="contact" className="px-4 pb-8 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-[var(--surface-border)] pt-8 lg:grid-cols-[1.1fr_0.72fr_0.82fr]">
        <div className="min-w-0">
          <p className="text-lg font-bold text-[var(--tour-ink)]">VR360 Định Công</p>
          <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--muted-foreground)]">
            Nền tảng tham quan và giới thiệu không gian văn hóa phường Định Công bằng công nghệ VR360.
          </p>
        </div>

        <nav className="grid gap-2 text-sm" aria-label="Liên kết nhanh">
          <p className="font-bold text-[var(--tour-ink)]">Liên kết nhanh</p>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit text-[var(--muted-foreground)] transition-colors hover:text-[var(--tour-ink)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="grid gap-3 text-sm leading-6 text-[var(--muted-foreground)] lg:text-right">
          <p className="font-bold text-[var(--tour-ink)]">Thông tin liên hệ</p>
          <p className="inline-flex items-center gap-2 lg:justify-end">
            <MapPin className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.8} />
            Số 1 ngõ 282 Kim Giang, Hanoi, Vietnam, 100000
          </p>
          <a
            href="http://dinhcong.hanoi.gov.vn/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-[var(--tour-ink)] hover:text-[var(--primary)] lg:justify-end"
          >
            <Globe2 className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.8} />
            Cổng thông tin phường Định Công
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61578181220775"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-[var(--tour-ink)] hover:text-[var(--primary)] lg:justify-end"
          >
            <ExternalLink className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.8} />
            Facebook phường Định Công
          </a>
          <Link href="/lien-he" className="inline-flex items-center gap-2 font-semibold text-[var(--tour-ink)] hover:text-[var(--primary)] lg:justify-end">
            <Mail className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.8} />
            Gửi góp ý hoặc tư liệu
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-[var(--surface-border)] pt-5 text-center text-sm font-semibold text-[var(--muted-foreground)]">
        © 2026 VR360 Định Công. All rights reserved.
      </div>
    </footer>
  );
}
