"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";
import { portraits } from "@/lib/image-data";

/**
 * The hero portrait: a 3D tilt tracking the cursor across the whole viewport,
 * plus a slow parallax rise as the page scrolls.
 *
 * Both effects write to one transform on one element. The tilt is small on
 * purpose — past about 8 degrees a photograph starts to look like a sticker.
 */
export function TiltPortrait() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;

    let targetRx = 0;
    let targetRy = 0;
    let rx = 0;
    let ry = 0;
    let parallax = 0;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRy = nx * 7;
      targetRx = -ny * 5;
    };

    const tick = () => {
      rx += (targetRx - rx) * 0.07;
      ry += (targetRy - ry) * 0.07;

      // Read scroll here rather than in a listener — one read per frame,
      // and it is a compositor-friendly value by the time it is written.
      const y = window.scrollY;
      parallax += (Math.min(y * 0.12, 90) - parallax) * 0.1;

      el.style.transform = `perspective(1200px) translate3d(0, ${-parallax.toFixed(2)}px, 0) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
      frame = requestAnimationFrame(tick);
    };

    if (fine) window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [fine, reduced]);

  return (
    <div className="relative flex justify-center lg:justify-end">
      {/* Ember bloom behind her shoulder — the one place the accent gets to be soft. */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-ember/12 blur-[110px]"
      />
      <div
        ref={wrap}
        className="relative w-[min(88vw,30rem)] lg:w-[min(38vw,34rem)]"
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >
        <Image
          {...portraits.hero}
          alt="Navyashree N"
          priority
          placeholder="blur"
          sizes="(max-width: 1024px) 88vw, 34rem"
          className="relative z-10 h-auto w-full object-contain"
        />
        {/* Fades her jacket into the page rather than cutting it off at a hard edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-ink via-ink/70 to-transparent"
        />
      </div>
    </div>
  );
}
