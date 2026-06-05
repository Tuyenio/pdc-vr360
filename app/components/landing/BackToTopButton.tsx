"use client";

import { ArrowUp } from "lucide-react";
import { CSSProperties, useEffect, useState } from "react";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100)) : 0;

      setIsVisible(scrollTop > 120);
      setScrollProgress(nextProgress);
      frameId = null;
    };

    const requestUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateScrollState);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Lên đầu trang"
      aria-hidden={!isVisible}
      onClick={handleClick}
      className="public-back-to-top"
      data-visible={isVisible ? "true" : "false"}
      tabIndex={isVisible ? 0 : -1}
      style={{ "--scroll-progress": `${scrollProgress}%` } as CSSProperties}
    >
      <span className="public-back-to-top-ring" aria-hidden="true" />
      <span className="public-back-to-top-core">
        <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
      </span>
    </button>
  );
}
