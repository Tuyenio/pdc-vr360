"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, PlayCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { activeTour, navigation } from "@/app/content";

const dinhCongLogo = encodeURI("/images/định công.png");

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="public-header sticky top-0 z-50 border-b border-[var(--surface-border)] bg-[rgb(255_255_255_/_0.82)] shadow-[0_16px_46px_rgb(37_75_54_/_0.08)] backdrop-blur-[18px]">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="VR360 Định Công"
        >
          <span className="public-logo-mark grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[rgb(142_95_11_/_0.24)] bg-[linear-gradient(135deg,rgb(255_255_255_/_0.94),rgb(232_219_176_/_0.74))] p-1 shadow-[0_10px_24px_rgb(37_75_54_/_0.1),inset_0_1px_0_rgb(255_255_255_/_0.92)]">
            <Image
              src={dinhCongLogo}
              alt="Logo phường Định Công"
              width={36}
              height={36}
              priority
              className="h-full w-full rounded-full object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold leading-tight text-[var(--tour-ink)] sm:text-base">
              VR360 Định Công
            </span>
            <span className="hidden truncate text-xs leading-5 text-[var(--muted-foreground)] sm:block">
              Không gian văn hóa số
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                className={`public-nav-link text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--tour-ink)]"
                }`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={activeTour.href}
            className="public-header-cta hidden min-h-10 items-center gap-2 rounded-full border border-[rgb(214_180_104_/_0.42)] bg-[rgb(16_57_43_/_0.94)] px-4 text-sm font-bold text-[var(--primary-foreground)] shadow-[0_10px_28px_rgb(37_75_54_/_0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgb(37_75_54_/_0.18)] sm:inline-flex"
          >
            <PlayCircle className="h-4 w-4 text-[var(--tour-gold-light)]" strokeWidth={1.8} />
            Khám phá VR360
          </Link>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-[8px] border border-[var(--surface-border)] bg-[rgb(255_255_255_/_0.8)] text-[var(--tour-ink)] shadow-[0_10px_28px_rgb(37_75_54_/_0.08)] transition-transform active:scale-[0.98] lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" strokeWidth={1.8} /> : <Menu className="h-5 w-5" strokeWidth={1.8} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-[var(--surface-border)] bg-[rgb(255_255_255_/_0.9)] transition-[max-height] duration-240 lg:hidden ${
          mobileMenuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="grid gap-2 px-4 py-4">
          {navigation.map((item) => {
            const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-[8px] border px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[var(--primary)]/35 bg-[var(--surface-glass-strong)] text-[var(--primary)]"
                    : "border-[var(--surface-border)] bg-[var(--surface-glass)] text-[var(--tour-ink)] hover:bg-[var(--surface-glass-strong)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={activeTour.href}
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgb(214_180_104_/_0.42)] bg-[rgb(16_57_43_/_0.94)] px-4 py-3 text-sm font-bold text-[var(--primary-foreground)]"
          >
            <PlayCircle className="h-4 w-4 text-[var(--tour-gold-light)]" strokeWidth={1.8} />
            Khám phá VR360
          </Link>
        </div>
      </div>
    </header>
  );
}
