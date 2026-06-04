"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AudioLines,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock,
  ClipboardCheck,
  Database,
  Download,
  Edit3,
  Eye,
  FileAudio,
  FileImage,
  FileText,
  Flag,
  FolderKanban,
  FolderOpen,
  GalleryHorizontalEnd,
  GitBranch,
  Globe2,
  Grip,
  ImagePlus,
  Landmark,
  Layers3,
  LayoutDashboard,
  ListChecks,
  LogOut,
  LucideIcon,
  Map,
  MessageSquareText,
  MonitorSmartphone,
  MousePointer2,
  Music,
  Navigation,
  PanelLeft,
  PencilRuler,
  Play,
  Plus,
  Radio,
  Route,
  Save,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UploadCloud,
  UserCog,
  Wand2,
} from "lucide-react";
import { useMemo, useState } from "react";

const dinhCongLogo = encodeURI("/images/định công.png");

type AdminSection = "overview" | "sites" | "builder" | "editor" | "media" | "review" | "settings";

type NavigationItem = {
  id: AdminSection;
  label: string;
  detail: string;
  icon: LucideIcon;
};

const navigationItems: NavigationItem[] = [
  { id: "overview", label: "Tổng quan", detail: "Sức khỏe hệ thống", icon: LayoutDashboard },
  { id: "sites", label: "Địa điểm", detail: "Danh mục tour", icon: Landmark },
  { id: "builder", label: "Tạo tour mới", detail: "Wizard vận hành", icon: Sparkles },
  { id: "editor", label: "Studio cảnh", detail: "Cảnh, hotspot, audio", icon: PencilRuler },
  { id: "media", label: "Kho tư liệu", detail: "Ảnh, audio, map", icon: Database },
  { id: "review", label: "Duyệt & xuất bản", detail: "Checklist nội dung", icon: ClipboardCheck },
  { id: "settings", label: "Cấu hình", detail: "Quyền và mẫu tour", icon: Settings },
];

const siteRows = [
  {
    name: "Đình Làng Định Công Thượng",
    type: "Đình làng / Di tích văn hóa",
    image: "/images-tour/Đình Làng-Đền Thờ/6 Trung Đình.jpg",
    route: "/tour/dinh-lang-dinh-cong",
    scenes: 13,
    hotspots: 18,
    narration: 8,
    status: "Đang mở tour",
    health: "Hoàn thiện",
  },
  {
    name: "Chùa Liên Hoa",
    type: "Chùa / Không gian tâm linh",
    image: "/images-tour/Chùa Liên Hoa/7 Tượng bồ tát.jpg",
    route: "/tour/chua-lien-hoa",
    scenes: 8,
    hotspots: 14,
    narration: 10,
    status: "Đang mở tour",
    health: "Đã đồng bộ audio",
  },
  {
    name: "Nhà thờ cụ Nguyễn Văn Siêu",
    type: "Nhà thờ danh nhân",
    image: "/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg",
    route: "/tour/nha-tho-nguyen-van-sieu",
    scenes: 0,
    hotspots: 0,
    narration: 0,
    status: "Bản nháp",
    health: "Chờ tư liệu",
  },
];

const builderSteps = [
  { label: "Thông tin", icon: Landmark, done: true },
  { label: "Ảnh 360", icon: GalleryHorizontalEnd, done: true },
  { label: "Cảnh", icon: Layers3, done: true },
  { label: "Hotspot", icon: MousePointer2, done: false },
  { label: "Thuyết minh", icon: AudioLines, done: false },
  { label: "Xuất bản", icon: Globe2, done: false },
];

const sceneDrafts = [
  { order: "01", title: "Sơn Môn", image: "/images-tour/Chùa Liên Hoa/1 Trước Cổng.jpg", yaw: 115, hotspots: 1, audio: "Điểm 0 + Điểm 1" },
  { order: "02", title: "Tiền Đường", image: "/images-tour/Chùa Liên Hoa/2 Sảnh Chính.jpg", yaw: 0, hotspots: 4, audio: "Điểm 2" },
  { order: "03", title: "Điện Tam Bảo", image: "/images-tour/Chùa Liên Hoa/3 Ban Tam Bảo.jpg", yaw: 0, hotspots: 4, audio: "Điểm 4" },
  { order: "04B", title: "Hành Lang Tả", image: "/images-tour/Chùa Liên Hoa/4b Chi tiết bên trái.jpg", yaw: 0, hotspots: 2, audio: "Chỉ nhạc nền" },
];

const contentChecklist = [
  { label: "Tên địa điểm, loại hình, mô tả ngắn", done: true },
  { label: "Ảnh đại diện và ảnh nền chào tour", done: true },
  { label: "Tối thiểu 3 cảnh 360 có điểm nối", done: true },
  { label: "Mỗi hotspot có nhãn, hướng yaw/pitch và cảnh đích", done: false },
  { label: "Thuyết minh được gắn đúng cảnh và kiểm âm lượng", done: false },
  { label: "Bản đồ tuyến có vị trí tương đối của từng cảnh", done: false },
];

const uploadCards = [
  { title: "Ảnh panorama", count: "32 file", icon: FileImage, tone: "bg-[#e7f0e3]" },
  { title: "Thuyết minh", count: "18 file", icon: FileAudio, tone: "bg-[#fff2d3]" },
  { title: "Ảnh thẻ địa điểm", count: "06 file", icon: ImagePlus, tone: "bg-[#e3eceb]" },
  { title: "Tài liệu nội dung", count: "12 mục", icon: MessageSquareText, tone: "bg-[#f2f5ea]" },
];

const productModules = [
  { title: "Thông tin địa điểm", detail: "Tên, loại hình, mô tả, ảnh đại diện, slug", icon: FileText },
  { title: "Cảnh panorama", detail: "Thứ tự cảnh, ảnh 360, yaw mở đầu, FOV", icon: GalleryHorizontalEnd },
  { title: "Hotspot điều hướng", detail: "Nhãn, yaw/pitch, cảnh đích, góc xoay", icon: Navigation },
  { title: "Điểm thông tin", detail: "Biểu tượng, nội dung Việt/Anh, ảnh minh họa", icon: MessageSquareText },
  { title: "Thuyết minh", detail: "Chuỗi MP3 theo cảnh, tốc độ, âm lượng nền", icon: AudioLines },
  { title: "Bản đồ tuyến", detail: "Tọa độ scene, tuyến nối, nhóm vị trí", icon: Map },
  { title: "Màn chào tour", detail: "Tiêu đề, panorama nền, hai thẻ nổi bật", icon: Sparkles },
  { title: "Xuất bản", detail: "Kiểm duyệt, route, SEO, trạng thái hiển thị", icon: Globe2 },
];

const hotspotRows = [
  { scene: "Tiền Đường", target: "Điện Tam Bảo", label: "Điện Tam Bảo", yaw: 120, pitch: -16, state: "Đạt" },
  { scene: "Điện Tam Bảo", target: "Chính Điện Tam Bảo", label: "Chính điện", yaw: 110, pitch: -39, state: "Cần kiểm" },
  { scene: "Chính Điện Tam Bảo", target: "Vườn Tháp Tổ", label: "Vườn Tháp Tổ", yaw: 205, pitch: -15, state: "Đạt" },
];

const narrationRows = [
  { scene: "01 Sơn Môn", files: "Điểm 0, Điểm 1", mode: "Phát nối tiếp", speed: "1.48x" },
  { scene: "04 Sân Tả Vu", files: "Không thuyết minh", mode: "Nhạc nền", speed: "Nền" },
  { scene: "05 Chính Điện Tam Bảo", files: "Điểm 5, Điểm 6", mode: "Phát nối tiếp", speed: "1.48x" },
  { scene: "07 Đài Quan Âm", files: "Điểm 3, Điểm 9", mode: "Phát nối tiếp", speed: "1.48x" },
];

const permissionRows = [
  { role: "Quản trị viên", rights: "Tạo, sửa, duyệt, xuất bản", members: "Ban quản trị" },
  { role: "Biên tập viên", rights: "Nhập nội dung, upload tư liệu", members: "Tổ nội dung" },
  { role: "Kiểm duyệt", rights: "Xem trước, đánh dấu đạt/chưa đạt", members: "Đại diện phường" },
];

const setupFields = [
  "Tên địa điểm",
  "Loại hình",
  "Slug tour",
  "Ảnh đại diện",
  "Panorama màn chào",
  "Audio nền",
  "Cảnh mặc định",
  "Trạng thái xuất bản",
];

const publishingStates = [
  { label: "Bản nháp", detail: "Chỉ hiển thị trong quản trị", icon: Edit3 },
  { label: "Chờ duyệt", detail: "Khóa chỉnh sửa nội dung chính", icon: ShieldCheck },
  { label: "Đã xuất bản", detail: "Hiển thị trên landing và danh mục", icon: Globe2 },
];

const fileValidationRows = [
  { file: "1 Trước Cổng.jpg", type: "Panorama", status: "Đạt", note: "Đã nhận diện tỷ lệ 2:1" },
  { file: "Điểm 1- Cổng tam quan .mp3", type: "Audio", status: "Đạt", note: "Đã gắn scene 01" },
  { file: "4b Chi tiết bên trái.jpg", type: "Panorama", status: "Cần kiểm", note: "Tên file có khoảng trắng, vẫn dùng được" },
  { file: "thumbnail-cover.png", type: "Ảnh thẻ", status: "Thiếu", note: "Cần bổ sung ảnh đại diện" },
];

const reviewNotes = [
  { title: "Hotspot cảnh 03", detail: "Kiểm tra lại nhãn sang Chính Điện Tam Bảo để thống nhất với tour chùa." },
  { title: "Audio cảnh 04B", detail: "Đã để trống thuyết minh, chỉ phát nhạc nền theo yêu cầu." },
  { title: "Màn chào", detail: "Cần chọn hai cảnh nổi bật cho thẻ truy cập nhanh." },
];

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const activeItem = useMemo(
    () => navigationItems.find((item) => item.id === activeSection) ?? navigationItems[0],
    [activeSection],
  );
  const ActiveIcon = activeItem.icon;

  return (
    <main className="admin-console min-h-[100dvh] bg-[#eef5ec] text-[#0d3327]">
        <aside className="admin-console-sidebar fixed inset-y-0 left-0 z-30 hidden w-[17.5rem] overflow-y-auto border-r border-[rgb(14_52_39_/_0.12)] bg-[rgb(255_255_255_/_0.78)] px-4 py-5 shadow-[12px_0_46px_rgb(37_75_54_/_0.07)] backdrop-blur-xl xl:flex xl:flex-col">
          <Link href="/" className="flex items-center gap-3 rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/80 p-3 shadow-[0_14px_36px_rgb(37_75_54_/_0.08)]">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-[rgb(142_95_11_/_0.22)] bg-[#fff9e9] p-1.5">
              <Image src={dinhCongLogo} alt="Logo phường Định Công" width={42} height={42} className="h-full w-full rounded-full object-contain" priority />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black">VR360 Định Công</span>
              <span className="block truncate text-xs font-semibold text-[#61766b]">Quản trị nội dung</span>
            </span>
          </Link>

          <nav className="mt-6 grid gap-2" aria-label="Điều hướng quản trị">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeSection;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`group grid grid-cols-[2.65rem_1fr_auto] items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition ${
                    isActive
                      ? "border-[#8e5f0b]/30 bg-[#0e3427] text-white shadow-[0_16px_38px_rgb(14_52_39_/_0.22)]"
                      : "border-transparent text-[#4d6a5e] hover:border-[rgb(14_52_39_/_0.1)] hover:bg-white/74 hover:text-[#0e3427]"
                  }`}
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-[12px] ${isActive ? "bg-white/12 text-[#e0cf9f]" : "bg-[#eaf1e7] text-[#8e5f0b]"}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black">{item.label}</span>
                    <span className={`block truncate text-xs font-semibold ${isActive ? "text-white/66" : "text-[#73867d]"}`}>{item.detail}</span>
                  </span>
                  <ChevronRight className={`h-4 w-4 transition ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"}`} strokeWidth={1.8} />
                </button>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[18px] border border-[rgb(142_95_11_/_0.18)] bg-[#fff8e8] p-4">
            <p className="text-xs font-black uppercase tracking-[0.08em] text-[#8e5f0b]">Vai trò</p>
            <p className="mt-2 text-sm font-black text-[#0e3427]">Quản trị viên nội dung</p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#6c765f]">Có quyền tạo nháp, duyệt nội dung và xuất bản tour sau kiểm tra.</p>
          </div>
        </aside>

        <section className="relative min-w-0 overflow-hidden xl:pl-[17.5rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgb(214_180_104_/_0.16),transparent_30rem),radial-gradient(circle_at_95%_18%,rgb(34_95_74_/_0.14),transparent_34rem),linear-gradient(135deg,#f7fbf4,#e6f0e5)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.38] [background-image:linear-gradient(90deg,rgb(14_52_39_/_0.07)_1px,transparent_1px),linear-gradient(0deg,rgb(14_52_39_/_0.05)_1px,transparent_1px)] [background-size:84px_84px]" />

          <header className="sticky top-0 z-20 border-b border-[rgb(14_52_39_/_0.1)] bg-[rgb(247_251_244_/_0.82)] px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <button className="grid h-10 w-10 place-items-center rounded-[12px] border border-[rgb(14_52_39_/_0.12)] bg-white/80 text-[#0e3427] xl:hidden">
                  <PanelLeft className="h-5 w-5" strokeWidth={1.8} />
                </button>
                <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#0e3427] text-[#e0cf9f] shadow-[0_16px_38px_rgb(14_52_39_/_0.22)]">
                  <ActiveIcon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#0e3427]">{activeItem.label}</p>
                  <p className="truncate text-xs font-semibold text-[#61766b]">{activeItem.detail}</p>
                </div>
              </div>

              <div className="hidden min-w-0 flex-1 justify-center md:flex">
                <label className="grid w-full max-w-[28rem] grid-cols-[1.2rem_1fr] items-center gap-2 rounded-full border border-[rgb(14_52_39_/_0.1)] bg-white/76 px-4 py-2.5 text-sm shadow-[0_12px_30px_rgb(37_75_54_/_0.06)]">
                  <Search className="h-4 w-4 text-[#8e5f0b]" strokeWidth={1.8} />
                  <input className="min-w-0 bg-transparent font-semibold text-[#0e3427] outline-none placeholder:text-[#7d9186]" placeholder="Tìm địa điểm, cảnh, audio, hotspot..." />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button className="grid h-10 w-10 place-items-center rounded-full border border-[rgb(14_52_39_/_0.1)] bg-white/78 text-[#0e3427] shadow-[0_10px_24px_rgb(37_75_54_/_0.07)]">
                  <Bell className="h-4 w-4" strokeWidth={1.8} />
                </button>
                <Link href="/" className="hidden items-center gap-2 rounded-full border border-[rgb(14_52_39_/_0.12)] bg-white/78 px-4 py-2.5 text-sm font-black text-[#0e3427] shadow-[0_10px_24px_rgb(37_75_54_/_0.07)] transition hover:text-[#8e5f0b] sm:inline-flex">
                  <LogOut className="h-4 w-4" strokeWidth={1.8} />
                  Thoát
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-3 flex max-w-[1500px] gap-2 overflow-x-auto pb-1 xl:hidden">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeSection;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition ${
                      isActive
                        ? "border-[#8e5f0b]/30 bg-[#0e3427] text-white shadow-[0_10px_24px_rgb(14_52_39_/_0.18)]"
                        : "border-[rgb(14_52_39_/_0.12)] bg-white/78 text-[#0e3427]"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#e0cf9f]" : "text-[#8e5f0b]"}`} strokeWidth={1.8} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </header>

          <div className="relative z-10 mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:py-8">
            {activeSection === "overview" && <OverviewPanel setActiveSection={setActiveSection} />}
            {activeSection === "sites" && <SitesPanel />}
            {activeSection === "builder" && <BuilderPanel />}
            {activeSection === "editor" && <EditorPanel />}
            {activeSection === "media" && <MediaPanel />}
            {activeSection === "review" && <ReviewPanel />}
            {activeSection === "settings" && <SettingsPanel />}
          </div>
        </section>
    </main>
  );
}

function OverviewPanel({ setActiveSection }: { setActiveSection: (section: AdminSection) => void }) {
  return (
    <>
      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[24px] border border-white/72 bg-white/78 p-5 shadow-[0_28px_88px_rgb(37_75_54_/_0.12),inset_0_1px_0_rgb(255_255_255_/_0.88)] backdrop-blur-xl sm:p-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.08em] text-[#8e5f0b]">Bảng điều hành</p>
              <h1 className="mt-3 max-w-[15ch] text-[clamp(2.2rem,4.7vw,4.6rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#0e3427]">
                Vận hành toàn bộ tour VR360.
              </h1>
              <p className="mt-4 max-w-[62ch] text-base font-medium leading-8 text-[#587064]">
                Theo dõi địa điểm, tạo tuyến mới, gắn thuyết minh và xuất bản nội dung từ một màn hình quản trị.
              </p>
            </div>
            <button onClick={() => setActiveSection("builder")} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0e3427] px-5 py-3 text-sm font-black text-white shadow-[0_18px_44px_rgb(14_52_39_/_0.24)] transition hover:-translate-y-0.5">
              <Plus className="h-4 w-4 text-[#e0cf9f]" strokeWidth={1.8} />
              Tạo địa điểm mới
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {[
              { value: "02", label: "tour đang mở", icon: Globe2 },
              { value: "21", label: "cảnh 360", icon: GalleryHorizontalEnd },
              { value: "34", label: "hotspot", icon: MousePointer2 },
              { value: "18", label: "file thuyết minh", icon: AudioLines },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <article key={stat.label} className="rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-[#f8fbf4] p-4">
                  <Icon className="h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
                  <p className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#0e3427]">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold text-[#61766b]">{stat.label}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="rounded-[24px] border border-[rgb(14_52_39_/_0.1)] bg-[#0e3427] p-5 text-white shadow-[0_28px_88px_rgb(14_52_39_/_0.24)] sm:p-6">
          <p className="text-sm font-black uppercase tracking-[0.08em] text-[#e0cf9f]">Quy trình chuẩn</p>
          <div className="mt-5 grid gap-4">
            {builderSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[#e0cf9f]">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-sm font-black">{step.label}</span>
                    <span className="block text-xs font-semibold text-white/56">Bước {String(index + 1).padStart(2, "0")}</span>
                  </span>
                  {step.done ? <CheckCircle2 className="h-5 w-5 text-[#e0cf9f]" /> : <CircleDot className="h-5 w-5 text-white/34" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[1fr_1fr]">
        <OperationalCard title="Tour đang vận hành" icon={FolderKanban}>
          <div className="grid gap-3">
            {siteRows.slice(0, 2).map((site) => (
              <div key={site.name} className="grid gap-4 rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-3 md:grid-cols-[7.4rem_1fr_auto] md:items-center">
                <div className="relative min-h-28 overflow-hidden rounded-[14px] md:min-h-24">
                  <Image src={site.image} alt={site.name} fill sizes="160px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-black text-[#0e3427]">{site.name}</p>
                  <p className="mt-1 text-sm font-semibold text-[#61766b]">{site.scenes} cảnh 360 · {site.hotspots} hotspot · {site.narration} audio</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href={site.route} className="inline-flex items-center gap-1.5 rounded-full bg-[#0e3427] px-3 py-1.5 text-xs font-black text-white">
                      <Play className="h-3.5 w-3.5 text-[#e0cf9f]" strokeWidth={1.8} />
                      Xem tour
                    </Link>
                    <button className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(14_52_39_/_0.12)] bg-white px-3 py-1.5 text-xs font-black text-[#0e3427]">
                      <Edit3 className="h-3.5 w-3.5 text-[#8e5f0b]" strokeWidth={1.8} />
                      Biên tập
                    </button>
                  </div>
                </div>
                <span className="w-fit rounded-full bg-[#e7f0e3] px-3 py-1 text-xs font-black text-[#0e3427]">{site.health}</span>
              </div>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Một sản phẩm VR360 cần có" icon={FolderOpen}>
          <div className="grid gap-3 sm:grid-cols-2">
            {productModules.slice(0, 8).map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.title} className="rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                  <Icon className="h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
                  <p className="mt-3 text-sm font-black text-[#0e3427]">{module.title}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#61766b]">{module.detail}</p>
                </div>
              );
            })}
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-4 2xl:grid-cols-[0.72fr_1.28fr]">
        <OperationalCard title="Lịch vận hành" icon={CalendarDays}>
          <div className="grid gap-3">
            {[
              { time: "Hôm nay", text: "Duyệt lại nhãn cảnh Chùa Liên Hoa 04B" },
              { time: "Tuần này", text: "Chuẩn hóa mẫu tạo tour mới từ hai tour đã hoàn thiện" },
              { time: "Sau duyệt", text: "Mở bản nháp Nhà thờ cụ Nguyễn Văn Siêu" },
            ].map((item) => (
              <div key={item.text} className="rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#8e5f0b]">{item.time}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#0e3427]">{item.text}</p>
              </div>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Luồng dữ liệu khi xuất bản" icon={GitBranch}>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ["Nhập liệu", "Thông tin địa điểm, mô tả, ảnh đại diện"],
              ["Biên tập tour", "Cảnh, hotspot, audio, bản đồ tuyến"],
              ["Kiểm duyệt", "Xem trước, checklist, ghi chú sửa"],
              ["Hiển thị", "Landing, danh mục, route tour VR360"],
            ].map(([title, detail], index) => (
              <div key={title} className="relative rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0e3427] text-xs font-black text-[#e0cf9f]">{index + 1}</span>
                <p className="mt-5 text-sm font-black text-[#0e3427]">{title}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-[#61766b]">{detail}</p>
              </div>
            ))}
          </div>
        </OperationalCard>
      </section>
    </>
  );
}

function SitesPanel() {
  return (
    <div className="grid gap-5">
      <section className="grid gap-4 2xl:grid-cols-3">
        {siteRows.map((site) => (
          <article key={site.name} className="overflow-hidden rounded-[24px] border border-white/72 bg-white/78 shadow-[0_24px_72px_rgb(37_75_54_/_0.1),inset_0_1px_0_rgb(255_255_255_/_0.88)] backdrop-blur-xl">
            <div className="relative min-h-56">
              <Image src={site.image} alt={site.name} fill sizes="(max-width: 1280px) 100vw, 32vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(14_52_39_/_0.72))]" />
              <span className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-black text-[#0e3427] shadow-[0_10px_24px_rgb(14_52_39_/_0.14)]">{site.status}</span>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xl font-black leading-tight text-white">{site.name}</p>
                <p className="mt-1 text-sm font-semibold text-white/74">{site.type}</p>
              </div>
            </div>
            <div className="grid gap-4 p-5">
              <div className="grid grid-cols-3 gap-2">
                <MiniMetric label="Cảnh" value={String(site.scenes)} />
                <MiniMetric label="Hotspot" value={String(site.hotspots)} />
                <MiniMetric label="Audio" value={String(site.narration)} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={site.route} className="inline-flex items-center gap-2 rounded-full bg-[#0e3427] px-4 py-2 text-sm font-black text-white">
                  <Eye className="h-4 w-4 text-[#e0cf9f]" strokeWidth={1.8} />
                  Xem tour
                </Link>
                <button className="inline-flex items-center gap-2 rounded-full border border-[rgb(14_52_39_/_0.12)] bg-white px-4 py-2 text-sm font-black text-[#0e3427]">
                  <Edit3 className="h-4 w-4 text-[#8e5f0b]" strokeWidth={1.8} />
                  Mở quản lý
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <OperationalCard title="Bảng kiểm địa điểm" icon={Landmark} action="Thêm địa điểm">
        <div className="overflow-hidden rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/72">
          <div className="grid min-w-[880px] grid-cols-[1.5fr_0.8fr_0.45fr_0.45fr_0.55fr_0.62fr] gap-4 border-b border-[rgb(14_52_39_/_0.1)] bg-[#f4f8f0] px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-[#61766b]">
            <span>Địa điểm</span>
            <span>Loại hình</span>
            <span>Cảnh</span>
            <span>Hotspot</span>
            <span>Audio</span>
            <span>Trạng thái</span>
          </div>
          <div className="overflow-x-auto">
            {siteRows.map((site) => (
              <div key={site.name} className="grid min-w-[880px] grid-cols-[1.5fr_0.8fr_0.45fr_0.45fr_0.55fr_0.62fr] gap-4 border-b border-[rgb(14_52_39_/_0.08)] px-4 py-4 text-sm last:border-b-0">
                <div>
                  <p className="font-black text-[#0e3427]">{site.name}</p>
                  <p className="mt-1 text-xs font-semibold text-[#73867d]">{site.health}</p>
                </div>
                <p className="font-semibold text-[#4d6a5e]">{site.type}</p>
                <p className="font-black text-[#0e3427]">{site.scenes}</p>
                <p className="font-black text-[#0e3427]">{site.hotspots}</p>
                <p className="font-black text-[#0e3427]">{site.narration}</p>
                <span className="h-fit w-fit rounded-full bg-[#e7f0e3] px-3 py-1 text-xs font-black text-[#0e3427]">{site.status}</span>
              </div>
            ))}
          </div>
        </div>
      </OperationalCard>
    </div>
  );
}

function BuilderPanel() {
  return (
    <div className="grid gap-5">
      <section className="rounded-[24px] border border-white/72 bg-white/78 p-5 shadow-[0_28px_88px_rgb(37_75_54_/_0.12),inset_0_1px_0_rgb(255_255_255_/_0.88)] backdrop-blur-xl sm:p-7">
        <div className="flex flex-col justify-between gap-5 2xl:flex-row 2xl:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.08em] text-[#8e5f0b]">Trình tạo địa điểm mới</p>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3.7rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#0e3427]">
              Tạo tour VR360 từ mẫu đã hoàn thiện.
            </h1>
            <p className="mt-4 max-w-[72ch] text-base font-medium leading-8 text-[#587064]">
              Dùng cấu trúc của Đình Làng và Chùa Liên Hoa làm khuôn mẫu: nhập thông tin, tải ảnh 360, đặt cảnh, gắn hotspot, thêm thuyết minh và duyệt xuất bản.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-full border border-[rgb(14_52_39_/_0.12)] bg-white px-4 py-2.5 text-sm font-black text-[#0e3427]">
              <Eye className="h-4 w-4 text-[#8e5f0b]" strokeWidth={1.8} />
              Xem trước
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#0e3427] px-4 py-2.5 text-sm font-black text-white shadow-[0_18px_44px_rgb(14_52_39_/_0.2)]">
              <Save className="h-4 w-4 text-[#e0cf9f]" strokeWidth={1.8} />
              Lưu bản nháp
            </button>
          </div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-6">
          {builderSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className={`rounded-[18px] border p-4 ${step.done ? "border-[#8e5f0b]/24 bg-[#fff8e8]" : "border-[rgb(14_52_39_/_0.1)] bg-[#f8fbf4]"}`}>
                <div className="flex items-center justify-between gap-2">
                  <Icon className="h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
                  <span className="text-xs font-black text-[#73867d]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-4 text-sm font-black text-[#0e3427]">{step.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 2xl:grid-cols-[0.86fr_1.14fr]">
        <OperationalCard title="Chọn mẫu từ tour đã hoàn thiện" icon={Wand2}>
          <div className="grid gap-3">
            {siteRows.slice(0, 2).map((site, index) => (
              <label key={site.name} className="grid cursor-pointer gap-4 rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-3 transition hover:border-[#8e5f0b]/32 md:grid-cols-[7rem_1fr_auto] md:items-center">
                <div className="relative min-h-24 overflow-hidden rounded-[14px]">
                  <Image src={site.image} alt={site.name} fill sizes="140px" className="object-cover" />
                </div>
                <div>
                  <p className="font-black text-[#0e3427]">{site.name}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#61766b]">
                    Sao chép cấu trúc {site.scenes} cảnh, tuyến hotspot, layout màn chào và checklist xuất bản.
                  </p>
                </div>
                <input type="radio" name="tour-template" defaultChecked={index === 1} className="h-5 w-5 accent-[#0e3427]" />
              </label>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Cấu hình sẽ sinh ra" icon={FileText}>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["TourConfig", "id, title, subtitle, welcome, audio nền"],
              ["TourScene[]", "order, title, image, initialYaw, mapPosition"],
              ["Hotspot[]", "targetId, label, yaw, pitch, rotation, nextYaw"],
              ["InfoMarker[]", "title, eyebrow, iconType, nội dung Việt/Anh"],
              ["sceneNarration", "mỗi cảnh có danh sách file MP3 phát nối tiếp"],
              ["mapRoutes", "tuyến đi giữa các scene trên bản đồ"],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-[#f8fbf4] p-4">
                <p className="font-black text-[#0e3427]">{title}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#61766b]">{detail}</p>
              </div>
            ))}
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-[0.95fr_1.05fr]">
        <OperationalCard title="Thông tin địa điểm" icon={Landmark}>
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Tên địa điểm" value="Nhà thờ cụ Nguyễn Văn Siêu" />
              <AdminField label="Loại hình" value="Di tích cấp quốc gia / Nhà thờ danh nhân" />
            </div>
            <AdminField label="Mô tả ngắn" value="Không gian lưu giữ ký ức danh nhân văn hóa, sẵn sàng số hóa thành tuyến tham quan VR360." multiline />
            <div className="grid gap-4 md:grid-cols-3">
              <AdminField label="Đường dẫn tour" value="/tour/nha-tho-nguyen-van-sieu" />
              <AdminField label="Thời lượng dự kiến" value="10-15 phút" />
              <AdminField label="Trạng thái" value="Bản nháp" />
            </div>
          </div>
        </OperationalCard>

        <OperationalCard title="Upload tư liệu" icon={UploadCloud}>
          <div className="grid gap-3 sm:grid-cols-2">
            {uploadCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className={`rounded-[18px] border border-[rgb(14_52_39_/_0.1)] ${card.tone} p-4`}>
                  <div className="flex items-center justify-between gap-3">
                    <Icon className="h-6 w-6 text-[#8e5f0b]" strokeWidth={1.8} />
                    <span className="rounded-full bg-white/72 px-3 py-1 text-xs font-black text-[#0e3427]">{card.count}</span>
                  </div>
                  <p className="mt-5 text-sm font-black text-[#0e3427]">{card.title}</p>
                  <button className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#8e5f0b]">
                    Tải thêm <UploadCloud className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </button>
                </div>
              );
            })}
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-[0.72fr_1.28fr]">
        <OperationalCard title="Trường bắt buộc" icon={ListChecks}>
          <div className="grid gap-2 sm:grid-cols-2">
            {setupFields.map((field, index) => (
              <div key={field} className="flex items-center gap-3 rounded-[14px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black ${index < 5 ? "bg-[#0e3427] text-[#e0cf9f]" : "bg-[#fff8e8] text-[#8e5f0b]"}`}>
                  {index + 1}
                </span>
                <span className="text-sm font-bold text-[#0e3427]">{field}</span>
              </div>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Thanh hành động tạo tour" icon={Save}>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { label: "Lưu nháp", detail: "Giữ nội dung trong quản trị", icon: Save },
              { label: "Xem trước", detail: "Mở tour ở chế độ preview", icon: Eye },
              { label: "Kiểm tra", detail: "Chạy checklist tự động", icon: ShieldCheck },
              { label: "Gửi duyệt", detail: "Chuyển sang chờ duyệt", icon: Flag },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} className="rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4 text-left transition hover:-translate-y-0.5 hover:border-[#8e5f0b]/28 hover:shadow-[0_18px_44px_rgb(37_75_54_/_0.1)]">
                  <Icon className="h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
                  <p className="mt-4 text-sm font-black text-[#0e3427]">{item.label}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#61766b]">{item.detail}</p>
                </button>
              );
            })}
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-[1.05fr_0.95fr]">
        <OperationalCard title="Preview màn chào tour" icon={MonitorSmartphone}>
          <div className="relative min-h-[26rem] overflow-hidden rounded-[20px] border border-[rgb(14_52_39_/_0.12)] bg-[#0e3427]">
            <Image src="/images-tour/Chùa Liên Hoa/2 Sảnh Chính.jpg" alt="Preview màn chào tour VR360" fill sizes="(max-width: 1280px) 100vw, 55vw" className="object-cover opacity-62" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_52_39_/_0.76),rgb(14_52_39_/_0.22),rgb(14_52_39_/_0.62))]" />
            <div className="absolute inset-x-5 bottom-5 rounded-[18px] border border-white/18 bg-white/86 p-5 text-[#0e3427] shadow-[0_20px_60px_rgb(0_0_0_/_0.2)] backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.08em] text-[#8e5f0b]">Màn chào</p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.04em]">Nhà thờ cụ Nguyễn Văn Siêu</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#587064]">Chọn panorama nền, tiêu đề, mô tả và hai thẻ cảnh nổi bật trước khi xuất bản.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#0e3427] px-3 py-1 text-xs font-black text-white">Bắt đầu tham quan</span>
                <span className="rounded-full bg-[#e7f0e3] px-3 py-1 text-xs font-black text-[#0e3427]">2 thẻ nổi bật</span>
              </div>
            </div>
          </div>
        </OperationalCard>

        <OperationalCard title="Thông số vận hành" icon={SlidersHorizontal}>
          <div className="grid gap-4">
            <AdminField label="Tốc độ thuyết minh mặc định" value="1.48x" />
            <AdminField label="Âm lượng nhạc nền" value="0.24" />
            <AdminField label="Âm lượng thuyết minh" value="0.7" />
            <AdminField label="FOV mặc định" value="76" />
            <div className="rounded-[18px] border border-[#8e5f0b]/24 bg-[#fff8e8] p-4">
              <p className="text-sm font-black text-[#0e3427]">Quy tắc audio</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#6a5b38]">
                Nếu một cảnh không có file thuyết minh, hệ thống giữ nhạc nền và dừng narration để tránh phát sai cảnh.
              </p>
            </div>
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-[1.2fr_0.8fr]">
        <OperationalCard title="Danh sách cảnh 360" icon={Layers3} action="Thêm cảnh">
          <div className="grid gap-3">
            {sceneDrafts.map((scene) => (
              <div key={scene.order} className="grid gap-3 rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4 lg:grid-cols-[3rem_1fr_auto] lg:items-center">
                <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#0e3427] text-sm font-black text-[#e0cf9f]">{scene.order}</span>
                <div>
                  <p className="font-black text-[#0e3427]">{scene.title}</p>
                  <p className="mt-1 text-sm font-semibold text-[#61766b]">{scene.image} · yaw mở đầu {scene.yaw}° · {scene.hotspots} hotspot</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e7f0e3] px-3 py-1 text-xs font-black text-[#0e3427]">
                  <AudioLines className="h-3.5 w-3.5 text-[#8e5f0b]" />
                  {scene.audio}
                </span>
              </div>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Hotspot & tuyến di chuyển" icon={Route}>
          <div className="grid gap-4">
            {[
              { from: "Cổng chính", to: "Sân trước", yaw: 112, pitch: -16 },
              { from: "Sân trước", to: "Chính điện", yaw: 86, pitch: -18 },
              { from: "Chính điện", to: "Khu phụ trợ", yaw: -42, pitch: -14 },
            ].map((route) => (
              <div key={`${route.from}-${route.to}`} className="rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-[#0e3427]">
                  <span>{route.from}</span>
                  <ChevronRight className="h-4 w-4 text-[#8e5f0b]" />
                  <span>{route.to}</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#61766b]">yaw {route.yaw}° · pitch {route.pitch}° · tự sinh mũi tên điều hướng</p>
              </div>
            ))}
            <div className="rounded-[18px] border border-dashed border-[#8e5f0b]/42 bg-[#fff8e8] p-4">
              <p className="text-sm font-black text-[#0e3427]">Trình đặt hotspot</p>
              <p className="mt-2 text-sm leading-6 text-[#6a5b38]">Chọn cảnh, xoay panorama tới vị trí mong muốn, bấm “Ghi yaw/pitch” để tạo điểm di chuyển hoặc điểm thông tin.</p>
            </div>
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-[0.95fr_1.05fr]">
        <OperationalCard title="Thuyết minh theo cảnh" icon={AudioLines}>
          <div className="grid gap-3">
            {["Lời chào mở đầu.mp3", "Cổng chính.mp3", "Chính điện.mp3", "Lời chào tạm biệt.mp3"].map((audio, index) => (
              <div key={audio} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                <Grip className="h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-black text-[#0e3427]">{audio}</p>
                  <p className="text-xs font-semibold text-[#61766b]">Gắn vào cảnh {String(index + 1).padStart(2, "0")}</p>
                </div>
                <span className="rounded-full bg-[#e7f0e3] px-3 py-1 text-xs font-black text-[#0e3427]">1.48x</span>
              </div>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Checklist xuất bản" icon={ClipboardCheck}>
          <div className="grid gap-3">
            {contentChecklist.map((item) => (
              <label key={item.label} className="grid cursor-pointer grid-cols-[1.3rem_1fr] gap-3 rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                <input type="checkbox" defaultChecked={item.done} className="mt-1 accent-[#0e3427]" />
                <span className="text-sm font-bold leading-6 text-[#0e3427]">{item.label}</span>
              </label>
            ))}
          </div>
        </OperationalCard>
      </section>
    </div>
  );
}

function EditorPanel() {
  return (
    <div className="grid gap-5">
      <section className="grid gap-5 2xl:grid-cols-[1.35fr_0.65fr]">
        <OperationalCard title="Studio biên tập cảnh 360" icon={PencilRuler}>
          <div className="relative min-h-[34rem] overflow-hidden rounded-[22px] border border-[rgb(14_52_39_/_0.12)] bg-[#0e3427]">
            <Image src="/images-tour/Chùa Liên Hoa/5 Sảnh trung tâm.jpg" alt="Cảnh Chính Điện Tam Bảo trong studio quản trị" fill sizes="(max-width: 1280px) 100vw, 64vw" className="object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(0_0_0_/_0.12)_58%,rgb(14_52_39_/_0.55)_100%)]" />

            {[
              { label: "Nhà Tổ", left: "28%", top: "40%", type: "info" },
              { label: "Bia Công Đức", left: "70%", top: "52%", type: "info" },
              { label: "Vườn Tháp Tổ", left: "55%", top: "72%", type: "move" },
              { label: "Điện Tam Bảo", left: "18%", top: "66%", type: "move" },
            ].map((spot) => (
              <button
                key={spot.label}
                className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border shadow-[0_14px_34px_rgb(0_0_0_/_0.24)] ${
                  spot.type === "info"
                    ? "h-10 min-w-10 border-[#e0cf9f] bg-[#fff8e8] px-3 text-[#0e3427]"
                    : "h-11 min-w-11 border-white/28 bg-[#0e3427] px-3 text-white"
                }`}
                style={{ left: spot.left, top: spot.top }}
                type="button"
              >
                <span className="inline-flex items-center gap-2 text-xs font-black">
                  {spot.type === "info" ? <MessageSquareText className="h-4 w-4 text-[#8e5f0b]" /> : <Navigation className="h-4 w-4 text-[#e0cf9f]" />}
                  <span className="hidden sm:inline">{spot.label}</span>
                </span>
              </button>
            ))}

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-[#0e3427]">Scene 05 · Chính Điện Tam Bảo</span>
              <span className="rounded-full bg-[#0e3427]/88 px-3 py-1.5 text-xs font-black text-white">yaw 0° · FOV 76</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-[18px] border border-white/18 bg-white/90 p-4 shadow-[0_20px_60px_rgb(0_0_0_/_0.22)] backdrop-blur-xl lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-black text-[#0e3427]">Công cụ ghi tọa độ hotspot</p>
                <p className="mt-1 text-xs font-semibold text-[#61766b]">Xoay tới vị trí cần đặt điểm, bấm ghi yaw/pitch, chọn loại điểm và cảnh đích.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#0e3427] px-4 py-2 text-xs font-black text-white">
                  <MousePointer2 className="h-4 w-4 text-[#e0cf9f]" strokeWidth={1.8} />
                  Ghi yaw/pitch
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-[rgb(14_52_39_/_0.12)] bg-white px-4 py-2 text-xs font-black text-[#0e3427]">
                  <Eye className="h-4 w-4 text-[#8e5f0b]" strokeWidth={1.8} />
                  Xem thử
                </button>
              </div>
            </div>
          </div>
        </OperationalCard>

        <OperationalCard title="Thuộc tính cảnh" icon={Settings}>
          <div className="grid gap-4">
            <AdminField label="Tên cảnh" value="Chính Điện Tam Bảo" />
            <AdminField label="Mã scene" value="scene-8" />
            <AdminField label="Ảnh panorama" value="5 Sảnh trung tâm.jpg" />
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Initial yaw" value="0" />
              <AdminField label="Map X/Y" value="42 / 42" />
            </div>
            <div className="rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-[#f8fbf4] p-4">
              <p className="text-sm font-black text-[#0e3427]">Nội dung scene</p>
              <div className="mt-3 grid gap-2">
                {["3 hotspot điều hướng", "3 điểm thông tin", "2 file thuyết minh", "Đã có vị trí bản đồ"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-bold text-[#4d6a5e]">
                    <CheckCircle2 className="h-4 w-4 text-[#8e5f0b]" strokeWidth={1.8} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-[1fr_1fr]">
        <OperationalCard title="Bảng hotspot" icon={MousePointer2} action="Thêm hotspot">
          <div className="grid gap-3">
            {hotspotRows.map((row) => (
              <div key={`${row.scene}-${row.target}`} className="grid gap-3 rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-sm font-black text-[#0e3427]">{row.label}</p>
                  <p className="mt-1 text-xs font-semibold text-[#61766b]">{row.scene} → {row.target} · yaw {row.yaw} · pitch {row.pitch}</p>
                </div>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ${row.state === "Đạt" ? "bg-[#e7f0e3] text-[#0e3427]" : "bg-[#fff8e8] text-[#8e5f0b]"}`}>{row.state}</span>
              </div>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Chuỗi thuyết minh" icon={AudioLines} action="Gắn file">
          <div className="grid gap-3">
            {narrationRows.map((row) => (
              <div key={row.scene} className="grid gap-3 rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-sm font-black text-[#0e3427]">{row.scene}</p>
                  <p className="mt-1 text-xs font-semibold text-[#61766b]">{row.files} · {row.mode}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e7f0e3] px-3 py-1 text-xs font-black text-[#0e3427]">
                  <Music className="h-3.5 w-3.5 text-[#8e5f0b]" />
                  {row.speed}
                </span>
              </div>
            ))}
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-[0.9fr_1.1fr]">
        <OperationalCard title="Bản đồ tuyến" icon={Map}>
          <div className="relative min-h-[25rem] overflow-hidden rounded-[20px] border border-[rgb(14_52_39_/_0.1)] bg-[#e7f0e3]">
            <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,rgb(14_52_39_/_0.12)_1px,transparent_1px),linear-gradient(0deg,rgb(14_52_39_/_0.1)_1px,transparent_1px)] [background-size:48px_48px]" />
            {[
              { label: "01", x: 50, y: 90 },
              { label: "02", x: 50, y: 72 },
              { label: "03", x: 50, y: 54 },
              { label: "04", x: 29, y: 62 },
              { label: "05", x: 42, y: 42 },
              { label: "06", x: 70, y: 34 },
              { label: "07", x: 75, y: 58 },
            ].map((node) => (
              <span
                key={node.label}
                className="absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0e3427] text-xs font-black text-[#e0cf9f] shadow-[0_12px_28px_rgb(14_52_39_/_0.24)]"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {node.label}
              </span>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Công cụ kiểm thử scene" icon={Radio}>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoList items={["Kiểm tra ảnh panorama có tải được", "Kiểm tra hotspot có cảnh đích", "Kiểm tra scene có mapPosition", "Kiểm tra info marker nằm trong vùng nhìn"]} />
            <InfoList items={["Nghe thử audio theo đúng thứ tự", "Kiểm tra cảnh không narration chỉ còn nhạc nền", "Kiểm tra tốc độ phát mặc định", "Kiểm tra fade nhạc nền khi có thuyết minh"]} />
          </div>
        </OperationalCard>
      </section>
    </div>
  );
}

function MediaPanel() {
  return (
    <div className="grid gap-5">
      <OperationalCard title="Kho tư liệu số" icon={Database} action="Tải tư liệu">
        <div className="grid gap-4 md:grid-cols-4">
          {uploadCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className={`rounded-[20px] border border-[rgb(14_52_39_/_0.1)] ${card.tone} p-5`}>
                <Icon className="h-7 w-7 text-[#8e5f0b]" strokeWidth={1.8} />
                <p className="mt-6 text-lg font-black text-[#0e3427]">{card.title}</p>
                <p className="mt-2 text-sm font-bold text-[#61766b]">{card.count} đã sẵn sàng</p>
              </article>
            );
          })}
        </div>
      </OperationalCard>

      <section className="grid gap-5 2xl:grid-cols-[0.8fr_1.2fr]">
        <OperationalCard title="Vùng tải file" icon={UploadCloud}>
          <div className="grid min-h-[22rem] place-items-center rounded-[22px] border border-dashed border-[#8e5f0b]/42 bg-[#fff8e8] p-6 text-center">
            <div className="max-w-sm">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#0e3427] text-[#e0cf9f] shadow-[0_18px_44px_rgb(14_52_39_/_0.2)]">
                <UploadCloud className="h-7 w-7" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[#0e3427]">Kéo file vào đây</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#6a5b38]">
                Hỗ trợ ảnh panorama, ảnh đại diện, audio thuyết minh và tài liệu nội dung. Hệ thống sẽ kiểm tra tên file, định dạng và gợi ý scene tương ứng.
              </p>
              <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0e3427] px-5 py-3 text-sm font-black text-white">
                <FolderOpen className="h-4 w-4 text-[#e0cf9f]" strokeWidth={1.8} />
                Chọn file
              </button>
            </div>
          </div>
        </OperationalCard>

        <OperationalCard title="Kiểm tra file sau upload" icon={ClipboardCheck}>
          <div className="overflow-hidden rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/72">
            <div className="grid min-w-[680px] grid-cols-[1fr_0.45fr_0.45fr_1fr] gap-4 border-b border-[rgb(14_52_39_/_0.1)] bg-[#f4f8f0] px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-[#61766b]">
              <span>File</span>
              <span>Loại</span>
              <span>Trạng thái</span>
              <span>Ghi chú</span>
            </div>
            <div className="overflow-x-auto">
              {fileValidationRows.map((row) => (
                <div key={row.file} className="grid min-w-[680px] grid-cols-[1fr_0.45fr_0.45fr_1fr] gap-4 border-b border-[rgb(14_52_39_/_0.08)] px-4 py-4 text-sm last:border-b-0">
                  <p className="font-black text-[#0e3427]">{row.file}</p>
                  <p className="font-semibold text-[#61766b]">{row.type}</p>
                  <span className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-black ${row.status === "Đạt" ? "bg-[#e7f0e3] text-[#0e3427]" : row.status === "Thiếu" ? "bg-[#f9e1d8] text-[#8f351e]" : "bg-[#fff8e8] text-[#8e5f0b]"}`}>{row.status}</span>
                  <p className="font-semibold leading-6 text-[#61766b]">{row.note}</p>
                </div>
              ))}
            </div>
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-3">
        <OperationalCard title="Quy chuẩn file" icon={Settings}>
          <InfoList items={["Ảnh panorama: JPG/PNG, tỷ lệ 2:1", "Tên file rõ theo số cảnh", "Audio MP3, mỗi cảnh có thể nhiều file", "Ảnh thẻ địa điểm tối thiểu 1600px"]} />
        </OperationalCard>
        <OperationalCard title="Gợi ý tự động" icon={Sparkles}>
          <InfoList items={["Tự phát hiện file thiếu cảnh", "Đề xuất tên cảnh từ tên file", "Cảnh báo audio chưa gắn", "Kiểm tra hotspot không có đích"]} />
        </OperationalCard>
        <OperationalCard title="Lịch sử phiên bản" icon={GitBranch}>
          <InfoList items={["Bản nháp nội dung", "Bản chờ duyệt", "Bản đã xuất bản", "Khôi phục cấu hình tour"]} />
        </OperationalCard>
      </section>
    </div>
  );
}

function ReviewPanel() {
  return (
    <div className="grid gap-5">
      <OperationalCard title="Duyệt nội dung trước khi xuất bản" icon={ShieldCheck} action="Xuất bản tour">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.72fr]">
          <div className="grid gap-3">
            {contentChecklist.map((item) => (
              <div key={item.label} className="grid grid-cols-[2.2rem_1fr_auto] items-center gap-3 rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                <span className={`grid h-9 w-9 place-items-center rounded-full ${item.done ? "bg-[#0e3427] text-[#e0cf9f]" : "bg-[#fff8e8] text-[#8e5f0b]"}`}>
                  {item.done ? <CheckCircle2 className="h-5 w-5" /> : <CircleDot className="h-5 w-5" />}
                </span>
                <p className="text-sm font-black text-[#0e3427]">{item.label}</p>
                <span className="hidden rounded-full bg-[#e7f0e3] px-3 py-1 text-xs font-black text-[#0e3427] sm:inline-flex">{item.done ? "Đạt" : "Cần kiểm"}</span>
              </div>
            ))}
          </div>

          <div className="rounded-[20px] border border-[#8e5f0b]/22 bg-[#fff8e8] p-5">
            <Flag className="h-7 w-7 text-[#8e5f0b]" strokeWidth={1.8} />
            <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[#0e3427]">Gói xuất bản</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#6a5b38]">
              Khi đủ checklist, hệ thống có thể sinh route tour, cập nhật danh sách không gian văn hóa, gắn ảnh đại diện và mở tour trên landing page.
            </p>
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0e3427] px-5 py-3 text-sm font-black text-white shadow-[0_18px_44px_rgb(14_52_39_/_0.22)]">
              <Globe2 className="h-4 w-4 text-[#e0cf9f]" strokeWidth={1.8} />
              Xuất bản sau kiểm duyệt
            </button>
          </div>
        </div>
      </OperationalCard>

      <section className="grid gap-5 2xl:grid-cols-[0.9fr_1.1fr]">
        <OperationalCard title="Ghi chú kiểm duyệt" icon={MessageSquareText} action="Thêm ghi chú">
          <div className="grid gap-3">
            {reviewNotes.map((note) => (
              <div key={note.title} className="rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                <p className="text-sm font-black text-[#0e3427]">{note.title}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#61766b]">{note.detail}</p>
              </div>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Trạng thái xuất bản" icon={Flag}>
          <div className="grid gap-3 md:grid-cols-3">
            {publishingStates.map((state, index) => {
              const Icon = state.icon;
              const isActive = index === 1;

              return (
                <div key={state.label} className={`rounded-[18px] border p-4 ${isActive ? "border-[#8e5f0b]/32 bg-[#fff8e8]" : "border-[rgb(14_52_39_/_0.1)] bg-white/72"}`}>
                  <Icon className="h-6 w-6 text-[#8e5f0b]" strokeWidth={1.8} />
                  <p className="mt-5 text-sm font-black text-[#0e3427]">{state.label}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-[#61766b]">{state.detail}</p>
                </div>
              );
            })}
          </div>
        </OperationalCard>
      </section>

      <OperationalCard title="Tác động khi xuất bản" icon={Globe2}>
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { title: "Landing page", detail: "Nút và danh sách tour nhận địa điểm mới" },
            { title: "Không gian văn hóa", detail: "Card địa điểm chuyển từ bản nháp sang đang mở tour" },
            { title: "Route VR360", detail: "Tạo đường dẫn tour riêng theo slug đã nhập" },
            { title: "SEO & metadata", detail: "Tạo title, description và ảnh đại diện" },
          ].map((item) => (
            <div key={item.title} className="rounded-[18px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
              <Globe2 className="h-5 w-5 text-[#8e5f0b]" strokeWidth={1.8} />
              <p className="mt-4 text-sm font-black text-[#0e3427]">{item.title}</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#61766b]">{item.detail}</p>
            </div>
          ))}
        </div>
      </OperationalCard>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="grid gap-5">
      <section className="grid gap-5 2xl:grid-cols-[1fr_1fr]">
        <OperationalCard title="Phân quyền quản trị" icon={UserCog} action="Thêm người dùng">
          <div className="grid gap-3">
            {permissionRows.map((row) => (
              <div key={row.role} className="grid gap-3 rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4 md:grid-cols-[0.72fr_1fr_0.62fr] md:items-center">
                <p className="font-black text-[#0e3427]">{row.role}</p>
                <p className="text-sm font-semibold leading-6 text-[#61766b]">{row.rights}</p>
                <span className="w-fit rounded-full bg-[#e7f0e3] px-3 py-1 text-xs font-black text-[#0e3427]">{row.members}</span>
              </div>
            ))}
          </div>
        </OperationalCard>

        <OperationalCard title="Mẫu tour mặc định" icon={FolderOpen}>
          <div className="grid gap-3">
            {[
              { title: "Mẫu đình/đền", detail: "Nhiều khu thờ tự, sân, hồ, hậu cung, tuyến vòng" },
              { title: "Mẫu chùa", detail: "Sơn môn, tiền đường, tam bảo, tháp tổ, đài ngoài trời" },
              { title: "Mẫu danh nhân", detail: "Nhà lưu niệm, gian trưng bày, tư liệu, điểm kể chuyện" },
            ].map((template) => (
              <label key={template.title} className="grid cursor-pointer grid-cols-[1.25rem_1fr] gap-3 rounded-[16px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-4">
                <input type="radio" name="default-template" defaultChecked={template.title === "Mẫu chùa"} className="mt-1 accent-[#0e3427]" />
                <span>
                  <span className="block text-sm font-black text-[#0e3427]">{template.title}</span>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[#61766b]">{template.detail}</span>
                </span>
              </label>
            ))}
          </div>
        </OperationalCard>
      </section>

      <section className="grid gap-5 2xl:grid-cols-3">
        <OperationalCard title="Thiết lập xuất bản" icon={Globe2}>
          <InfoList items={["Tự cập nhật danh mục Không gian văn hóa", "Tự sinh đường dẫn /tour/[id]", "Ẩn tour khi còn bản nháp", "Giữ bản đã xuất bản nếu bản nháp lỗi"]} />
        </OperationalCard>
        <OperationalCard title="Sao lưu dữ liệu" icon={Download}>
          <InfoList items={["Xuất cấu hình TourConfig", "Tải danh sách scene dạng JSON", "Tải mapping audio", "Tải checklist nghiệm thu"]} />
        </OperationalCard>
        <OperationalCard title="Nhật ký thao tác" icon={Clock}>
          <div className="grid gap-3">
            {[
              "Cập nhật audio cảnh 05 Chùa Liên Hoa",
              "Thay logo phường Định Công",
              "Thêm nút quản trị trên header",
              "Dựng bản nháp dashboard quản trị",
            ].map((item, index) => (
              <div key={item} className="rounded-[14px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-3">
                <p className="text-sm font-bold text-[#0e3427]">{item}</p>
                <p className="mt-1 text-xs font-semibold text-[#73867d]">Phiên {String(index + 1).padStart(2, "0")}</p>
              </div>
            ))}
          </div>
        </OperationalCard>
      </section>
    </div>
  );
}

function OperationalCard({
  title,
  icon: Icon,
  action,
  children,
}: {
  title: string;
  icon: LucideIcon;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-white/72 bg-white/78 p-5 shadow-[0_24px_72px_rgb(37_75_54_/_0.1),inset_0_1px_0_rgb(255_255_255_/_0.88)] backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#e7f0e3] text-[#8e5f0b]">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <h2 className="min-w-0 text-xl font-black tracking-[-0.02em] text-[#0e3427]">{title}</h2>
        </div>
        {action ? (
          <button className="hidden shrink-0 items-center gap-2 rounded-full border border-[rgb(14_52_39_/_0.12)] bg-white/80 px-4 py-2 text-sm font-black text-[#0e3427] transition hover:text-[#8e5f0b] sm:inline-flex">
            <Plus className="h-4 w-4" strokeWidth={1.8} />
            {action}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function AdminField({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-[#0e3427]">{label}</span>
      {multiline ? (
        <textarea defaultValue={value} className="min-h-28 rounded-[14px] border border-[rgb(14_52_39_/_0.12)] bg-white/78 px-4 py-3 text-sm font-semibold leading-6 text-[#0e3427] outline-none transition focus:border-[#8e5f0b] focus:ring-4 focus:ring-[rgb(142_95_11_/_0.12)]" />
      ) : (
        <input defaultValue={value} className="h-12 rounded-[14px] border border-[rgb(14_52_39_/_0.12)] bg-white/78 px-4 text-sm font-semibold text-[#0e3427] outline-none transition focus:border-[#8e5f0b] focus:ring-4 focus:ring-[rgb(142_95_11_/_0.12)]" />
      )}
    </label>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-[rgb(14_52_39_/_0.1)] bg-[#f8fbf4] p-3 text-center">
      <p className="text-xl font-black text-[#0e3427]">{value}</p>
      <p className="mt-1 text-xs font-bold text-[#61766b]">{label}</p>
    </div>
  );
}

function InfoList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 rounded-[14px] border border-[rgb(14_52_39_/_0.1)] bg-white/72 p-3 text-sm font-bold leading-6 text-[#0e3427]">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8e5f0b]" strokeWidth={1.8} />
          {item}
        </div>
      ))}
    </div>
  );
}
