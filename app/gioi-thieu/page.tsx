import type { Metadata } from "next";
import Image from "next/image";
import { Archive, Building2, Compass, Database, Globe2, Landmark, MapPinned, Radio, School, Users } from "lucide-react";
import { BackToTopButton } from "@/app/components/landing/BackToTopButton";
import { SiteFooter } from "@/app/components/landing/SiteFooter";
import { SiteHeader } from "@/app/components/landing/SiteHeader";

export const metadata: Metadata = {
  title: "Giới thiệu | VR360 Định Công",
  description:
    "Giới thiệu dự án VR360 Định Công, mục tiêu, ý nghĩa và định hướng phát triển nền tảng số hóa không gian văn hóa địa phương.",
};

const projectGoals = [
  {
    title: "Bảo tồn tư liệu văn hóa bằng nền tảng số",
    detail: "Hình ảnh 360 độ, âm thanh, điểm tương tác và thông tin giới thiệu được tổ chức thành kho dữ liệu có thể cập nhật.",
    icon: Archive,
  },
  {
    title: "Quảng bá hình ảnh phường Định Công",
    detail: "Đưa các điểm di tích, công trình tâm linh và câu chuyện truyền thống đến gần hơn với người dân và du khách.",
    icon: Radio,
  },
  {
    title: "Tạo trải nghiệm tham quan trực tuyến sinh động",
    detail: "Người xem có thể tự di chuyển giữa các không gian, quan sát chi tiết và nghe thuyết minh theo từng điểm.",
    icon: Globe2,
  },
  {
    title: "Hỗ trợ giáo dục lịch sử, văn hóa địa phương",
    detail: "Tư liệu trực quan giúp học sinh và cộng đồng tiếp cận nội dung lịch sử địa phương dễ hơn.",
    icon: School,
  },
  {
    title: "Mở rộng thêm nhiều di tích trong tương lai",
    detail: "Cấu trúc dữ liệu và giao diện được thiết kế để bổ sung địa điểm mới theo từng giai đoạn.",
    icon: Database,
  },
];

const meanings = [
  {
    title: "Đối với cộng đồng địa phương",
    detail: "Tạo một kênh lưu giữ ký ức, câu chuyện và không gian văn hóa quen thuộc của người dân Định Công.",
    icon: Users,
  },
  {
    title: "Đối với du khách",
    detail: "Cung cấp cách tiếp cận nhanh, trực quan trước khi tham quan thực địa hoặc tìm hiểu sâu hơn.",
    icon: MapPinned,
  },
  {
    title: "Đối với công tác bảo tồn",
    detail: "Hỗ trợ lưu trữ hiện trạng, thuyết minh và lớp tư liệu nền để phục vụ cập nhật lâu dài.",
    icon: Landmark,
  },
  {
    title: "Đối với chuyển đổi số",
    detail: "Góp phần đưa giá trị văn hóa địa phương lên môi trường số bằng một nền tảng dễ sử dụng.",
    icon: Compass,
  },
];

const roadmap = [
  "Bổ sung thêm nhiều điểm tham quan thuộc phường Định Công.",
  "Tích hợp bản đồ số để định vị các không gian văn hóa.",
  "Thêm thuyết minh tự động và các lớp âm thanh theo ngữ cảnh.",
  "Cập nhật hình ảnh, video và tư liệu lịch sử theo từng điểm.",
  "Xây dựng hệ thống quản trị để cập nhật nội dung linh hoạt.",
];

export default function AboutPage() {
  return (
    <main className="public-page min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="public-subpage-hero public-subpage-hero--compact relative isolate overflow-hidden border-b border-[var(--surface-border)]">
        <Image
          src="/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="public-subpage-hero-image object-cover"
        />

        <div className="public-subpage-hero-content mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:min-h-[580px] lg:grid-cols-[0.95fr_0.7fr] lg:items-center lg:py-22">
          <div className="public-rise public-hero-rule w-full min-w-0 max-w-4xl">
            <p className="public-kicker">Giới thiệu dự án</p>
            <h1 className="public-gradient-text public-heading-safe public-subpage-title mt-4 text-[clamp(2.55rem,5.8vw,5.35rem)] font-extrabold">
              Giới thiệu dự án VR360 Định Công
            </h1>
            <p className="public-subpage-copy mt-6 text-base leading-8 text-[var(--foreground)]/82 sm:text-lg">
              Ứng dụng công nghệ số trong bảo tồn, quảng bá và lan tỏa giá trị văn hóa địa phương.
            </p>
          </div>

          <div className="public-image-stage public-hero-photo public-stagger-item hidden lg:block">
            <Image
              src="/images-tour/Đình Làng-Đền Thờ/6 Trung Đình.jpg"
              alt="Không gian di tích Định Công"
              fill
              sizes="38vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:py-20">
        <div className="min-w-0">
          <p className="public-kicker">Về dự án</p>
          <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
            Số hóa không gian văn hóa bằng trải nghiệm dễ tiếp cận.
          </h2>
        </div>
        <div className="grid gap-4 text-base leading-7 text-[var(--foreground)]/78">
          <p>
            Dự án được xây dựng nhằm số hóa các di tích, công trình văn hóa, không gian tâm linh và địa điểm lịch sử tại phường Định Công.
          </p>
          <p>
            Người dùng có thể tham quan trực tuyến thông qua hình ảnh 360 độ, điểm tương tác, âm thanh, thuyết minh và thông tin giới thiệu được biên tập rõ ràng.
          </p>
          <p>
            Website hướng tới việc phục vụ người dân, học sinh, du khách và những người quan tâm đến lịch sử, văn hóa địa phương.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="public-kicker">Mục tiêu dự án</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Một nền tảng phục vụ bảo tồn, giáo dục và quảng bá.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {projectGoals.map((goal) => {
              const Icon = goal.icon;

              return (
                <article key={goal.title} className="public-panel public-stagger-item rounded-[8px] p-5">
                  <Icon className="h-7 w-7 text-[var(--primary)]" strokeWidth={1.8} />
                  <h3 className="mt-5 text-lg font-bold leading-tight text-[var(--tour-ink)]">{goal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{goal.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20">
        <div className="public-media relative min-h-[24rem] overflow-hidden rounded-[8px] lg:min-h-[36rem]">
          <Image
            src="/images-tour/Chùa Liên Hoa/1 Trước Cổng.jpg"
            alt="Không gian văn hóa tâm linh Định Công"
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="public-kicker">Ý nghĩa</p>
          <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
            Giá trị của dự án được nhìn từ nhiều phía.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {meanings.map((meaning) => {
              const Icon = meaning.icon;

              return (
                <article key={meaning.title} className="border-t border-[var(--surface-border)] pt-5">
                  <Icon className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.8} />
                  <h3 className="mt-3 text-lg font-bold text-[var(--tour-ink)]">{meaning.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{meaning.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-band)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:py-20">
          <div className="min-w-0">
            <p className="public-kicker">Định hướng phát triển</p>
            <h2 className="public-heading-safe mt-3 text-[2rem] font-bold text-[var(--tour-ink)] sm:text-4xl">
              Mở rộng theo dữ liệu, nội dung và công cụ quản trị.
            </h2>
          </div>
          <div className="grid gap-4">
            {roadmap.map((item, index) => (
              <article key={item} className="grid gap-3 border-t border-[var(--surface-border)] pt-5 sm:grid-cols-[4rem_1fr]">
                <p className="text-2xl font-bold text-[var(--primary)]">{String(index + 1).padStart(2, "0")}</p>
                <p className="text-sm font-semibold leading-6 text-[var(--tour-ink)]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="public-panel public-glow mx-auto grid max-w-7xl gap-5 rounded-[8px] p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <p className="public-kicker">Cùng hoàn thiện tư liệu</p>
            <h2 className="public-heading-safe mt-2 text-3xl font-bold text-[var(--tour-ink)] sm:text-4xl">
              VR360 Định Công được thiết kế để tiếp tục mở rộng.
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-6 text-[var(--foreground)]/76 sm:text-base">
              Khi có thêm tư liệu, hình ảnh và câu chuyện địa phương, hệ thống có thể bổ sung thêm các điểm văn hóa mới.
            </p>
          </div>
          <Building2 className="hidden h-14 w-14 text-[var(--primary)] lg:block" strokeWidth={1.6} />
        </div>
      </section>

      <SiteFooter />
      <BackToTopButton />
    </main>
  );
}
