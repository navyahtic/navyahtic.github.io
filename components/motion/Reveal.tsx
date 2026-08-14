"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { ITEM_STEP } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Stagger index — multiplied by ITEM_STEP for the delay. */
  index?: number;
  delay?: number;
  as?: ElementType;
  className?: string;
  /** How far into the viewport before it fires. Negative pulls it later. */
  margin?: string;
};

/**
 * Section reveal via IntersectionObserver — one observer per element, torn
 * down the moment it fires. No scroll listeners anywhere on the site.
 *
 * The CSS in globals.css does the actual animating; this only flips the
 * data attribute, so reduced-motion users get the final state immediately.
 */
export function Reveal({
  children,
  index = 0,
  delay,
  as: Tag = "div",
  className,
  margin = "0px 0px -12% 0px",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in view on load (above the fold) — show it without waiting.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-reveal", "in");
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay ?? index * ITEM_STEP}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
