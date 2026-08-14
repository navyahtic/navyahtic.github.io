import Link from "next/link";
import Image from "next/image";

import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { experience } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { portraits } from "@/lib/image-data";

import { BoneField } from "@/components/hero/BoneField";
import { TiltPortrait } from "@/components/hero/TiltPortrait";
import { SplitText } from "@/components/hero/SplitText";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

const current = experience.find((role) => role.current);

/** The four numbers worth leading with. */
const marquee = [
  { value: "~7 ms", label: "intraoperative morph latency" },
  { value: "0.24 mm", label: "RMSE against a 0.5 mm gate" },
  { value: "89", label: "tests behind the surgical pipeline" },
  { value: "0", label: "preoperative CT scans required" },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] overflow-hidden pt-32 pb-20 lg:pt-40">
        <BoneField />

        <div className="shell relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal delay={100}>
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                {current ? `${current.title} — ${current.orgShort ?? current.org}` : profile.role}
              </p>
            </Reveal>

            <h1 className="mt-8">
              <SplitText
                text="Navyashree"
                immediate
                delay={150}
                as="span"
                className="font-display text-display block text-bone"
              />
              <SplitText
                text="N"
                immediate
                delay={520}
                as="span"
                className="font-display text-display block text-ember"
              />
            </h1>

            <Reveal delay={800}>
              <p className="text-lead mt-10 max-w-xl text-balance text-bone-2">
                {profile.statement}
              </p>
            </Reveal>

            <Reveal delay={950}>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Magnetic strength={14}>
                  <Link
                    href="/work"
                    className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-ink uppercase transition-colors hover:bg-ember"
                  >
                    View the work
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </Magnetic>
                <Magnetic strength={10}>
                  <Link
                    href="/about"
                    className="inline-flex items-center rounded-full border border-line-strong px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-bone uppercase transition-colors hover:border-ember hover:text-ember"
                  >
                    About
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <TiltPortrait />
        </div>

        <div className="shell relative mt-20 lg:absolute lg:inset-x-0 lg:bottom-10 lg:mt-0">
          <Reveal delay={1100}>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] text-ash-dim uppercase">
              Scroll
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Numbers ──────────────────────────────────────────── */}
      <section aria-label="Selected metrics" className="rule py-16">
        <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {marquee.map((stat, i) => (
            <Reveal key={stat.label} index={i}>
              <p className="font-display text-h2 text-bone">{stat.value}</p>
              <p className="mt-2 font-mono text-[0.7rem] leading-relaxed tracking-[0.1em] text-ash uppercase">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured work ────────────────────────────────────── */}
      <section className="rule py-28" aria-labelledby="work-heading">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow">Selected work</p>
              </Reveal>
              <SplitText
                as="h2"
                id="work-heading"
                text="Four things I built"
                className="font-display text-h1 mt-4 text-bone"
              />
            </div>
            <Reveal delay={150}>
              <Link
                href="/work"
                className="link-draw font-mono text-xs tracking-[0.16em] text-ash uppercase hover:text-bone"
              >
                All work →
              </Link>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-x-12 gap-y-24 lg:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <div key={project.slug} className={i % 2 === 1 ? "lg:mt-28" : undefined}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About strip ──────────────────────────────────────── */}
      <section className="rule py-28" aria-labelledby="about-heading">
        <div className="shell grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="relative">
              <Image
                {...portraits.plate}
                alt="Navyashree N"
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="w-full rounded-sm object-cover grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
              />
              <p className="mt-4 font-mono text-[0.7rem] tracking-[0.1em] text-ash-dim">
                Chennai, 2026
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">About</p>
            </Reveal>
            <SplitText
              as="h2"
              id="about-heading"
              text="Research that has to survive contact with an operating room."
              className="font-display text-h2 mt-4 max-w-2xl text-balance text-bone"
            />
            <Reveal delay={150}>
              <p className="mt-8 max-w-xl text-ash">{profile.bio[0]}</p>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-5 max-w-xl text-ash">{profile.bio[1]}</p>
            </Reveal>
            <Reveal delay={350}>
              <Link
                href="/about"
                className="link-draw mt-8 inline-block font-mono text-xs tracking-[0.16em] text-bone uppercase"
              >
                More about me →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Credentials ──────────────────────────────────────── */}
      <section className="rule py-28" aria-labelledby="cred-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Credentials</p>
          </Reveal>
          <SplitText
            as="h2"
            id="cred-heading"
            text="Certified, and audited"
            className="font-display text-h1 mt-4 text-bone"
          />

          <ul className="mt-16 grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <li key={cert.name} className="bg-ink">
                <Reveal index={i}>
                  <a
                    href={cert.credentialUrl || cert.issuerUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex h-full flex-col justify-between gap-8 p-8 transition-colors hover:bg-ink-raised"
                  >
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-[0.16em] text-ember uppercase">
                        {cert.issuer}
                      </p>
                      <p className="font-display text-h3 mt-3 text-bone">{cert.name}</p>
                    </div>
                    <p className="flex items-center justify-between font-mono text-[0.7rem] text-ash-dim">
                      {cert.issued}
                      <span
                        aria-hidden="true"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </p>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
