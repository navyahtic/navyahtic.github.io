"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

type Props = {
  children: ReactNode;
  /** How far the element is allowed to travel toward the cursor, in px. */
  strength?: number;
  className?: string;
};

/**
 * Magnetic hover. The element leans toward the cursor while it is inside a
 * padded hit area and springs back on exit.
 *
 * Deliberately subtle — the default 14px is enough to feel alive under the
 * hand without the element ever losing its place in the layout.
 */
export function Magnetic({ children, strength = 14, className }: Props) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;
    const el = ref.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      // Park the loop once we have effectively arrived.
      if (
        Math.abs(targetX - x) < 0.05 &&
        Math.abs(targetY - y) < 0.05 &&
        targetX === 0 &&
        targetY === 0
      ) {
        el.style.transform = "";
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const radius = Math.max(rect.width, rect.height) * 0.9;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const falloff = 1 - dist / radius;
        targetX = (dx / radius) * strength * falloff * 2;
        targetY = (dy / radius) * strength * falloff * 2;
      } else {
        targetX = 0;
        targetY = 0;
      }
      start();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [fine, reduced, strength]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
