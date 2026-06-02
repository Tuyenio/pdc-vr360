export function SiteFooter() {
  return (
    <footer id="contact" className="px-4 pb-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-[rgb(166_124_82_/_0.2)] pt-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-lg font-black text-[var(--tour-ink)]">Con đường di sản Định Công</p>
          <p className="mt-3 max-w-[58ch] text-sm leading-6 text-[var(--muted-foreground)]">
            Kế hoạch số hóa di tích lịch sử văn hóa qua công nghệ VR360, phục vụ chuyển đổi số và truyền thông di sản địa phương.
          </p>
        </div>
        <div className="text-sm leading-6 text-[var(--muted-foreground)] lg:text-right">
          <p className="font-bold text-[var(--tour-ink)]">Công ty Cổ phần An ninh mạng Quốc tế - ICS</p>
          <p>Phường Định Công, Hà Nội</p>
        </div>
      </div>
    </footer>
  );
}
