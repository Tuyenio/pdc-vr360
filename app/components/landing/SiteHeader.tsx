"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { activeTour, navigation } from "@/app/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--surface-border)] bg-[rgb(18_21_16_/_0.88)] backdrop-blur-[18px]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="Con đường di sản Định Công"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[var(--surface-border)] bg-[var(--surface-glass)] text-sm font-semibold text-[var(--primary)]">
            ĐC
          </span>
          <span className="truncate text-sm font-semibold leading-tight text-[var(--tour-ink)] sm:text-base">
            Con đường di sản Định Công
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--tour-ink)]"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={activeTour.href}
            className="rounded-[10px] border border-[var(--surface-border)] bg-[var(--surface-glass)] px-4 py-2 text-sm font-semibold text-[var(--tour-ink)] transition-colors hover:bg-[var(--surface-glass-strong)]"
          >
            Tour
          </Link>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-[10px] border border-[var(--surface-border)] bg-[var(--surface-glass)] text-[var(--tour-ink)] lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="grid w-4 gap-1">
              <span className={`h-px bg-current transition-transform ${mobileMenuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-px bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`h-px bg-current transition-transform ${mobileMenuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-[var(--surface-border)] transition-[max-height] duration-240 lg:hidden ${
          mobileMenuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="grid gap-2 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-[10px] border px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[var(--primary)]/35 bg-[var(--surface-glass-strong)] text-[var(--primary)]"
                    : "border-[var(--surface-border)] bg-[var(--surface-glass)] text-[var(--tour-ink)] hover:bg-[var(--surface-glass-strong)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
