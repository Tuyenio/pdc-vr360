export const activeTour = {
  title: "Đình Làng Định Công Thượng",
  subtitle: "Đền thờ Tổ nghề Kim hoàn",
  href: "/tour/dinh-lang-dinh-cong",
  heroImage: "/images-tour/Đình Làng-Đền Thờ/6 Trung Đình.jpg",
  coverImage: "/images-tour/Đình Làng-Đền Thờ/3 Tả Hồ.jpg",
  gateImage: "/images-tour/Đình Làng-Đền Thờ/1 Cổng Đình.jpg",
  shrineImage: "/images-tour/Đình Làng-Đền Thờ/13 Chính điện Đền thờ Tổ nghề.jpg",
  sceneCount: "13",
  duration: "15-20 phút",
};

export const upcomingTour = {
  title: "Chùa Liên Hoa",
  subtitle: "Tuyến VR360 chùa và cảnh quan tâm linh",
  href: "/tour/chua-lien-hoa",
  coverImage: "/images-tour/Chùa Liên Hoa/1 Trước Cổng.jpg",
  heroImage: "/images-tour/Chùa Liên Hoa/7 Tượng bồ tát.jpg",
  sceneCount: "07",
  stopCount: "08",
  status: "Đang mở tour",
};

export const navigation = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/di-tich", label: "Không gian văn hóa" },
  { href: "/lien-he", label: "Liên hệ" },
];

export type HeritageSite = {
  id: string;
  name: string;
  type: string;
  status: "Đang mở tour" | "Đang bổ sung tư liệu";
  shortDescription: string;
  image: string;
  vrUrl?: string;
  detailUrl: string;
  isAvailable: boolean;
};

export const heritageSites: HeritageSite[] = [
  {
    id: "dinh-lang-dinh-cong",
    name: "Đình Làng Định Công Thượng - Đền thờ Tổ nghề Kim hoàn",
    type: "Đình làng / Di tích văn hóa",
    status: "Đang mở tour",
    shortDescription: "Không gian văn hóa gắn với lịch sử làng nghề kim hoàn truyền thống của Định Công.",
    image: activeTour.shrineImage,
    vrUrl: activeTour.href,
    detailUrl: activeTour.href,
    isAvailable: true,
  },
  {
    id: "chua-lien-hoa",
    name: "Chùa Liên Hoa",
    type: "Chùa / Không gian tâm linh",
    status: "Đang mở tour",
    shortDescription: "Không gian chùa thanh tịnh, gắn với đời sống tín ngưỡng và văn hóa cộng đồng.",
    image: upcomingTour.coverImage,
    vrUrl: upcomingTour.href,
    detailUrl: upcomingTour.href,
    isAvailable: true,
  },
  {
    id: "nha-tho-nguyen-van-sieu",
    name: "Chùa Định Công (Định Công Tự)",
    type: "Nhà thờ danh nhân / Di tích cấp quốc gia",
    status: "Đang bổ sung tư liệu",
    shortDescription: "Ngôi chùa cổ mang giá trị lịch sử, kiến trúc và tín ngưỡng của địa phương, hiện đang được bổ sung tư liệu để xây dựng trải nghiệm tham quan số.",
    image: "/images-tour/Đình Làng-Đền Thờ/ChuaThienPhuc.jpg",
    detailUrl: "/di-tich#nha-tho-nguyen-van-sieu",
    isAvailable: false,
  },
  {
    id: "thap-but-den-ngoc-son",
    name: "Đền Đầm Sen (Đền Mẫu Đầm Sen)",
    type: "Di tích văn hóa / Điểm mở rộng",
    status: "Đang bổ sung tư liệu",
    shortDescription: "Không gian Đền Mẫu Đầm Sen, một di tích văn hóa tâm linh quan trọng, dự kiến được mở rộng trong hệ thống tham quan 3D.",
    image: "/images-tour/Chùa Liên Hoa/DenMauDamSen.jpg",
    detailUrl: "/di-tich#thap-but-den-ngoc-son",
    isAvailable: false,
  },
];

export const routeCards = heritageSites.map((site) => ({
  title: site.name,
  subtitle: site.type,
  description: site.shortDescription,
  image: site.image,
  status: site.status,
  href: site.vrUrl,
  detail: site.isAvailable ? "Khám phá VR360" : "Xem thông tin",
}));

export const deliverySteps = [
  {
    title: "Khảo sát",
    detail: "Chốt danh mục điểm di tích, tuyến di chuyển, khu vực cần giới thiệu và đầu mối duyệt nội dung tại địa phương.",
  },
  {
    title: "Số hóa",
    detail: "Ghi nhận ảnh 360 độ, âm thanh, điểm chuyển cảnh và dữ liệu không gian có độ phân giải cao.",
  },
  {
    title: "Biên tập",
    detail: "Tổ chức nội dung thành trải nghiệm dễ hiểu cho người dân, học sinh, ban quản lý di tích và du khách.",
  },
  {
    title: "Vận hành",
    detail: "Đưa tour lên nền tảng trực tuyến, sẵn sàng mở rộng thêm các tuyến di sản mới.",
  },
];

export const capabilities = [
  "Ảnh 360 độ độ phân giải cao",
  "Điểm chuyển cảnh theo tuyến tham quan",
  "Thuyết minh âm thanh tiếng Việt",
  "Tối ưu truy cập trên điện thoại",
  "Kho dữ liệu bàn giao có thể mở rộng theo từng di tích",
];

export const projectStats = [
  { value: activeTour.sceneCount, label: "điểm 360 trong tour đầu tiên" },
  { value: activeTour.duration, label: "thời lượng tham quan đề xuất" },
  { value: "02", label: "di tích trong giai đoạn hiện tại" },
];

export const projectPillars = [
  {
    title: "Trang trọng với di sản",
    detail: "Ưu tiên hình ảnh thật, ngôn ngữ chuẩn mực và nhịp đọc phù hợp môi trường phường, cộng đồng, trường học.",
  },
  {
    title: "Dễ dùng trên mọi thiết bị",
    detail: "Người dân có thể mở tour bằng điện thoại, xem từng điểm 360 và nghe thuyết minh tiếng Việt.",
  },
  {
    title: "Mở rộng theo danh mục",
    detail: "Nền tảng đã bổ sung Chùa Liên Hoa và vẫn có thể tiếp tục tiếp nhận tư liệu người dân, tuyến ký ức cộng đồng hoặc các điểm di sản mới.",
  },
];

export const heritageValues = [
  {
    title: "Không gian tín ngưỡng",
    detail: "Ghi nhận bố cục kiến trúc, không gian thờ tự và lớp sinh hoạt văn hóa gắn với cộng đồng địa phương.",
  },
  {
    title: "Ký ức nghề truyền thống",
    detail: "Tổ chức tư liệu về nghề Kim hoàn Định Công trong một tuyến kể chuyện dễ tiếp cận.",
  },
  {
    title: "Giáo dục và truyền thông",
    detail: "Hỗ trợ học sinh, người dân, cán bộ địa phương và du khách tiếp cận di sản bằng trải nghiệm số có kiểm soát nội dung.",
  },
  {
    title: "Bàn giao vận hành",
    detail: "Dữ liệu, giao diện và quy trình được đóng gói để thuận tiện nghiệm thu, cập nhật và mở rộng.",
  },
];

export const budgetGroups = [
  {
    title: "Dữ liệu di sản",
    items: ["Khảo sát tuyến", "Chụp ảnh 360 độ", "Tổ chức điểm thông tin"],
  },
  {
    title: "Nền tảng trải nghiệm",
    items: ["Giao diện landing", "Module VR360", "Tối ưu thiết bị di động"],
  },
  {
    title: "Vận hành và bàn giao",
    items: ["Kiểm thử nội dung", "Hướng dẫn quản trị", "Kế hoạch mở rộng"],
  },
];
