"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, profile } from "@/content/profile";
import { Magnetic } from "@/components/motion/Magnetic";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  // Hide on scroll down, reveal on scroll up; frost the bar once off the top.
  // rAF-gated, and only ever writes classes.
  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY;
        setHidden(y > 220 && y > lastY.current);
        setScrolled(y > 24);
        lastY.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Trap nothing, but do close on Escape — the menu is a full overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-bone focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
        style={{
          transform: hidden && !open ? "translateY(-110%)" : "translateY(0)",
        }}
      >
        <div className="shell flex items-center justify-between py-5">
          <Link
            href="/"
            aria-label={`${profile.name} — home`}
            className="group relative z-10 font-mono text-xs tracking-[0.2em] uppercase"
          >
            <span className="text-bone">{profile.name}</span>
            <span className="ml-2 hidden text-ash sm:inline">
              — {profile.role}
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Magnetic key={item.href} strength={8}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block px-4 py-2 font-mono text-xs tracking-[0.16em] uppercase transition-colors ${
                      active ? "text-bone" : "text-ash hover:text-bone"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-ember"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </Magnetic>
              );
            })}
            <Magnetic strength={10}>
              <a
                href={profile.links.email}
                className="ml-3 block rounded-full border border-line-strong px-5 py-2 font-mono text-xs tracking-[0.16em] text-bone uppercase transition-colors hover:border-ember hover:text-ember"
              >
                Get in touch
              </a>
            </Magnetic>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-10 -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className="absolute inset-x-0 top-0 h-px bg-bone transition-transform duration-300"
                style={{
                  transform: open ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute inset-x-0 bottom-0 h-px bg-bone transition-transform duration-300"
                style={{
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="shell flex h-full flex-col justify-center gap-2"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-h1 leading-none text-bone transition-colors hover:text-ember"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.links.email}
            className="mt-8 font-mono text-xs tracking-[0.16em] text-ash uppercase"
          >
            {profile.email}
          </a>
        </nav>
      </div>
    </>
  );
}
