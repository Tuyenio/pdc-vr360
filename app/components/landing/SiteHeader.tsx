import Link from "next/link";
import { activeTour, navigation } from "@/app/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--surface-border)] bg-[rgb(18_12_8_/_0.78)] shadow-[0_16px_60px_rgb(0_0_0_/_0.24)] backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Con đường di sản Định Công">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-[rgb(166_124_82_/_0.28)] bg-[var(--card)] text-sm font-black text-[var(--tour-jade)]">
            DC
          </span>
          <span className="truncate text-sm font-extrabold text-[var(--tour-ink)] sm:text-base">
            Con đường di sản Định Công
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold text-[var(--muted-foreground)] lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} className="transition-colors hover:text-[var(--tour-jade)]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href={activeTour.href}
          className="rounded-[8px] border border-[var(--surface-border)] bg-[var(--surface-glass)] px-4 py-2 text-sm font-bold text-[var(--tour-ink)] shadow-[0_12px_32px_rgb(0_0_0_/_0.16)] transition-colors hover:bg-[var(--surface-glass-strong)]"
        >
          Tour
        </Link>
      </nav>

      <div className="border-t border-[var(--surface-border)] px-4 py-2 lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-[8px] border border-[var(--surface-border)] bg-[var(--surface-glass)] px-3 py-2 text-xs font-bold text-[var(--tour-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
