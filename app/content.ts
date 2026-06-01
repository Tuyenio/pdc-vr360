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

export const navigation = [
  { href: "/tuyen-vr", label: "Tuyến VR" },
  { href: "/ke-hoach", label: "Kế hoạch" },
  { href: "/giai-phap", label: "Giải pháp" },
  { href: "/lien-he", label: "Liên hệ" },
];

export const routeCards = [
  {
    title: "Đình Làng Định Công Thượng",
    description: "Không gian đình, hồ, sân lễ và đền thờ Tổ nghề đã sẵn sàng tham quan.",
    image: activeTour.shrineImage,
    status: "Đang mở",
    href: activeTour.href,
  },
  {
    title: "Chùa và điểm tín ngưỡng",
    description: "Bổ sung sau khảo sát hiện trạng, lịch số hóa và thẩm định nội dung.",
    image: "/images-tour/Đình Làng-Đền Thờ/8 Tiền sảnh Đình làng.jpg",
    status: "Đề xuất mở rộng",
  },
  {
    title: "Không gian nghề kim hoàn",
    description: "Tuyến kể chuyện về ký ức nghề, nhân vật địa phương và tư liệu cộng đồng.",
    image: "/images-tour/Đình Làng-Đền Thờ/11 Lối dẫn sang Đền thờ Tổ.jpg",
    status: "Đề xuất mở rộng",
  },
  {
    title: "Tuyến ký ức cộng đồng",
    description: "Thu thập câu chuyện, tư liệu ảnh và điểm kể chuyện từ người dân địa phương.",
    image: "/images-tour/Đình Làng-Đền Thờ/12 Không gian kết nối di tích.jpg",
    status: "Đề xuất mở rộng",
  },
];

export const deliverySteps = [
  {
    title: "Khảo sát",
    detail: "Chốt danh mục điểm di tích, tuyến di chuyển và vị trí thông tin cần thuyết minh.",
  },
  {
    title: "Số hóa",
    detail: "Ghi nhận ảnh 360 độ, âm thanh, điểm chuyển cảnh và dữ liệu không gian có độ phân giải cao.",
  },
  {
    title: "Biên tập",
    detail: "Tổ chức nội dung thành trải nghiệm dễ hiểu cho người dân, học sinh và du khách.",
  },
  {
    title: "Vận hành",
    detail: "Đưa tour lên nền tảng trực tuyến, sẵn sàng mở rộng thêm các tuyến di sản mới.",
  },
];

export const capabilities = [
  "Ảnh VR360 độ phân giải cao",
  "Điểm chuyển cảnh theo tuyến tham quan",
  "Thuyết minh âm thanh tiếng Việt",
  "Tối ưu truy cập trên điện thoại",
  "Kho dữ liệu có thể mở rộng",
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
