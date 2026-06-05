"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { HeritageSite } from "@/app/content";

const statusFilters = ["Tất cả", "Đang mở tour", "Đang bổ sung tư liệu"] as const;
const typeFilters = ["Tất cả", "Đình", "Chùa", "Nhà thờ danh nhân", "Địa điểm mở rộng"] as const;

type StatusFilter = (typeof statusFilters)[number];
type TypeFilter = (typeof typeFilters)[number];

export function CulturalSpaceExplorer({ sites }: { sites: HeritageSite[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("Tất cả");
  const [type, setType] = useState<TypeFilter>("Tất cả");

  const filteredSites = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi-VN");

    return sites.filter((site) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        site.name.toLocaleLowerCase("vi-VN").includes(normalizedQuery) ||
        site.type.toLocaleLowerCase("vi-VN").includes(normalizedQuery) ||
        site.shortDescription.toLocaleLowerCase("vi-VN").includes(normalizedQuery);

      const matchesStatus = status === "Tất cả" || site.status === status;
      const matchesType =
        type === "Tất cả" ||
        (type === "Đình" && site.type.includes("Đình")) ||
        (type === "Chùa" && site.type.includes("Chùa")) ||
        (type === "Nhà thờ danh nhân" && site.type.includes("Nhà thờ danh nhân")) ||
        (type === "Địa điểm mở rộng" && site.type.includes("Điểm mở rộng"));

      return matchesQuery && matchesStatus && matchesType;
    });
  }, [query, sites, status, type]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="public-panel rounded-[8px] p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-[var(--tour-ink)]">Tìm kiếm di tích</span>
            <span className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--primary)]" strokeWidth={1.8} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nhập tên di tích, loại địa điểm hoặc từ khóa"
                className="h-12 w-full rounded-[8px] border border-[var(--surface-border)] bg-white/82 pl-11 pr-4 text-sm font-semibold text-[var(--tour-ink)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgb(142_95_11_/_0.12)]"
              />
            </span>
          </label>

          <FilterGroup
            label="Trạng thái"
            options={statusFilters}
            value={status}
            onChange={setStatus}
          />

          <FilterGroup
            label="Loại địa điểm"
            options={typeFilters}
            value={type}
            onChange={setType}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-[var(--muted-foreground)]">
          Hiển thị {filteredSites.length} / {sites.length} địa điểm
        </p>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setStatus("Tất cả");
            setType("Tất cả");
          }}
          className="text-sm font-bold text-[var(--tour-ink)] transition hover:text-[var(--primary)]"
        >
          Xóa bộ lọc
        </button>
      </div>

      {filteredSites.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredSites.map((site) => (
            <article
              id={site.id}
              key={site.id}
              className="public-card public-stagger-item group rounded-[8px]"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={site.image}
                  alt={site.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
              </div>
              <div className="flex min-h-[19rem] flex-col p-5">
                <span
                  className={`w-fit rounded-full border px-3 py-1 text-xs font-extrabold ${
                    site.isAvailable
                      ? "border-[rgb(14_52_39_/_0.18)] bg-[rgb(14_92_62_/_0.12)] text-[var(--tour-ink)]"
                      : "border-[rgb(142_95_11_/_0.18)] bg-[rgb(142_95_11_/_0.1)] text-[var(--primary)]"
                  }`}
                >
                  {site.status}
                </span>
                <p className="mt-4 text-sm font-bold text-[var(--primary)]">{site.type}</p>
                <h2 className="mt-2 text-xl font-extrabold leading-tight text-[var(--tour-ink)]">
                  {site.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                  {site.shortDescription}
                </p>
                <Link href={site.isAvailable ? site.vrUrl ?? site.detailUrl : site.detailUrl} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-extrabold text-[var(--tour-ink)] transition hover:text-[var(--primary)]">
                  {site.isAvailable ? "Khám phá VR360" : "Xem thông tin"}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="public-panel mt-6 rounded-[8px] p-8 text-center">
          <SlidersHorizontal className="mx-auto h-8 w-8 text-[var(--primary)]" strokeWidth={1.8} />
          <p className="mt-4 text-lg font-bold text-[var(--tour-ink)]">
            Không tìm thấy di tích phù hợp. Vui lòng thử lại với từ khóa khác.
          </p>
        </div>
      )}
    </section>
  );
}

function FilterGroup<T extends readonly string[]>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T;
  value: T[number];
  onChange: (value: T[number]) => void;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-bold text-[var(--tour-ink)]">{label}</span>
      <div className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`h-12 shrink-0 rounded-full border px-4 text-sm font-extrabold transition active:scale-[0.98] ${
              value === option
                ? "border-[var(--primary)] bg-[var(--tour-ink)] text-[var(--primary-foreground)]"
                : "border-[var(--surface-border)] bg-white/76 text-[var(--tour-ink)] hover:border-[var(--primary)]/40"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
