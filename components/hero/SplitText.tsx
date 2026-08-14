"use client";

import { useEffect, useRef } from "react";
import { CHAR_STEP } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  /** ms before the first character moves. */
  delay?: number;
  /** Fire on mount rather than on scroll — for above-the-fold copy. */
  immediate?: boolean;
  as?: "h1" | "h2" | "p" | "span" | "div";
  /** Set when the heading is referenced by an aria-labelledby on its section. */
  id?: string;
};

/**
 * Character-level reveal behind a mask.
 *
 * The full string stays in the accessible tree via aria-label; every split
 * glyph is aria-hidden, so a screen reader hears one clean sentence instead of
 * eighty separate letters. Words are wrapped in nowrap spans so the line
 * breaks at word boundaries like normal text.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  immediate = false,
  as: Tag = "span",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (immediate) {
      // Next frame, so the initial transform is painted before it animates.
      const id = requestAnimationFrame(() => el.setAttribute("data-revealed", "true"));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "true");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <Tag ref={ref as never} id={id} className={className} aria-label={text} data-revealed="false">
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {[...word].map((char) => {
            const i = charIndex++;
            return (
              <span
                key={i}
                aria-hidden="true"
                className="char-mask"
                style={{ "--char-delay": `${delay + i * CHAR_STEP}ms` } as React.CSSProperties}
              >
                <span>{char}</span>
              </span>
            );
          })}
          {w < words.length - 1 && (
            <span aria-hidden="true" className="char-mask">
              <span>&nbsp;</span>
            </span>
          )}
        </span>
      ))}
    </Tag>
  );
}
