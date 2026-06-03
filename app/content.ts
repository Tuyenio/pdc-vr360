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
  subtitle: "Tuyến di tích đang chuẩn bị số hóa",
  coverImage: "/images-tour/Đình Làng-Đền Thờ/8 Tiền sảnh Đình làng.jpg",
  status: "Đang chuẩn bị",
};

export const navigation = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/di-tich", label: "Di tích" },
  { href: "/lien-he", label: "Liên hệ" },
];

export const routeCards = [
  {
    title: "Đình Làng Định Công Thượng",
    subtitle: "Đền thờ Tổ nghề Kim hoàn",
    description: "Tour VR360 đầu tiên đã sẵn sàng với không gian đình, hồ, sân lễ, chính điện và khu thờ Tổ nghề của cộng đồng Định Công.",
    image: activeTour.shrineImage,
    status: "Đang mở tour",
    href: activeTour.href,
    detail: "13 điểm tham quan",
  },
  {
    title: upcomingTour.title,
    subtitle: upcomingTour.subtitle,
    description: "Tuyến tiếp theo đang được chuẩn bị để hoàn thiện dữ liệu hình ảnh, điểm chuyển cảnh, tư liệu địa phương và lớp thuyết minh.",
    image: upcomingTour.coverImage,
    status: upcomingTour.status,
    detail: "Chuẩn bị khảo sát",
  },
  {
    title: "Không gian nghề Kim hoàn",
    subtitle: "Lớp nội dung nghề truyền thống",
    description: "Tuyến kể chuyện về ký ức nghề, nhân vật địa phương, tư liệu cộng đồng và đạo lý tri ân tiền nhân.",
    image: "/images-tour/Đình Làng-Đền Thờ/11 Lối dẫn sang Đền thờ Tổ.jpg",
    status: "Đề xuất mở rộng",
    detail: "Bổ sung tư liệu",
  },
  {
    title: "Tuyến ký ức cộng đồng",
    subtitle: "Tư liệu người dân Định Công",
    description: "Thu thập câu chuyện, ảnh cũ và các điểm kể chuyện từ cộng đồng để làm giàu bản đồ di sản.",
    image: "/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg",
    status: "Đề xuất mở rộng",
    detail: "Mở theo giai đoạn",
  },
];

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
    detail: "Nền tảng có thể bổ sung Chùa Liên Hoa, tư liệu người dân và các tuyến ký ức cộng đồng khi dữ liệu được hoàn thiện.",
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
