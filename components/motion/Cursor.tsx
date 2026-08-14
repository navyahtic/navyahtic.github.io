"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

/**
 * Custom cursor — desktop only, and only for pointers that can actually hit
 * a small target. The native cursor stays visible; this is a ring that trails
 * it and swells over interactive elements.
 *
 * Runs on a single rAF loop writing one transform. No React state per frame.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;
    const el = ring.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      const interactive = (e.target as HTMLElement).closest?.(
        'a, button, [role="button"], input, textarea, [data-cursor="grow"]',
      );
      targetScale = interactive ? 2.1 : 1;
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      // Critically damped follow — the ring lags just enough to feel physical.
      x += (mouseX - x) * 0.18;
      y += (mouseY - y) * 0.18;
      scale += (targetScale - scale) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] h-8 w-8 rounded-full border border-bone/45 opacity-0 mix-blend-difference transition-opacity duration-300"
      style={{ willChange: "transform" }}
    />
  );
}
