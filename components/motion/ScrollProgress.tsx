"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress rule pinned to the top of the viewport.
 *
 * Uses a scroll-driven CSS animation where supported, which runs off the main
 * thread entirely. Falls back to a rAF-throttled scroll read — the fallback
 * still never does layout work, it only writes scaleX.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    if (CSS.supports("animation-timeline: scroll()")) return; // handled in CSS

    let frame = 0;
    let queued = false;

    const write = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-px bg-transparent"
    >
      <div
        ref={bar}
        className="progress-bar h-full origin-left bg-ember"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}
