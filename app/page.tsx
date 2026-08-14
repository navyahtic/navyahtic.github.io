import Link from "next/link";
import Image from "next/image";

import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { certifications } from "@/content/certifications";
import { publications } from "@/content/publications";
import { portraits } from "@/lib/image-data";

import { BoneField } from "@/components/hero/BoneField";
import { TiltPortrait } from "@/components/hero/TiltPortrait";
import { SplitText } from "@/components/hero/SplitText";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

const current = experience.find((role) => role.current);

const ticker = [
  "CUDA",
  "Neural SDF",
  "Holoscan SDK",
  "PyTorch",
  "C++",
  "Python",
  "Next.js",
  "FastAPI",
  "pgvector",
  "AWS",
] as const;

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] overflow-hidden pt-32 pb-24 lg:pt-40">
        <div className="mesh" aria-hidden="true" />
        <BoneField />

        <div className="shell relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal delay={100}>
              <p className="chip">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                {current
                  ? `${current.title} — ${current.orgShort ?? current.org}`
                  : profile.role}
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
                className="font-display text-display grad-text block"
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
                    className="group grad-bg inline-flex items-center gap-3 rounded-full px-8 py-4 font-mono text-xs tracking-[0.16em] text-white uppercase shadow-[var(--shadow-deep)] transition-transform duration-500 hover:scale-[1.03]"
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
                    href="/credentials"
                    className="inline-flex items-center rounded-full border border-line-strong px-8 py-4 font-mono text-xs tracking-[0.16em] text-bone uppercase transition-colors hover:border-ember hover:text-ember"
                  >
                    Credentials
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            {/* Three claims that stand up without context. */}
            <Reveal delay={1080}>
              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
                {[
                  { v: `${publications.length}`, l: "papers published" },
                  { v: `${certifications.length}`, l: "certifications" },
                  { v: "9+", l: "CGPA / 10" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="sr-only">{s.l}</dt>
                    <dd>
                      <p className="font-display text-h2 grad-text">{s.v}</p>
                      <p className="mt-1 font-mono text-[0.65rem] leading-relaxed tracking-[0.1em] text-ash uppercase">
                        {s.l}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <TiltPortrait />
        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────────────── */}
      <section
        aria-label="Technologies"
        className="border-y border-line bg-ink-raised py-8"
      >
        <Marquee items={ticker} />
      </section>

      {/* ── Featured work ────────────────────────────────────── */}
      <section className="py-28" aria-labelledby="work-heading">
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

          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Published ────────────────────────────────────────── */}
      <section
        className="border-y border-line bg-ink-raised py-28"
        aria-labelledby="pub-heading"
      >
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Research</p>
          </Reveal>
          <SplitText
            as="h2"
            id="pub-heading"
            text="Published"
            className="font-display text-h1 mt-4 text-bone"
          />

          <ol className="mt-16 grid gap-8 lg:grid-cols-2">
            {publications.map((pub, i) => (
              <li key={pub.title}>
                <Reveal index={i}>
                  <article className="card flex h-full flex-col p-8">
                    <div className="flex items-start justify-between gap-6">
                      <p className="chip border-ember/30 text-ember">
                        {pub.publisher}
                      </p>
                      <p className="font-mono text-xs whitespace-nowrap text-ash-dim">
                        {pub.date}
                      </p>
                    </div>
                    <h3 className="font-display text-h3 mt-6 text-balance text-bone">
                      {pub.title}
                    </h3>
                    <p className="mt-3 text-sm text-ash">{pub.venue}</p>
                    <p className="mt-5 flex-1 text-bone-2">{pub.abstract}</p>
                    {pub.doi && (
                      <a
                        href={pub.doi}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-draw mt-6 self-start font-mono text-xs tracking-[0.12em] text-bone uppercase"
                      >
                        DOI ↗
                      </a>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About strip ──────────────────────────────────────── */}
      <section className="py-28" aria-labelledby="about-heading">
        <div className="shell grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className="grad-bg absolute -inset-3 rounded-2xl opacity-15 blur-2xl"
              />
              <Image
                {...portraits.plate}
                alt="Navyashree N"
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="relative w-full rounded-2xl object-cover shadow-[var(--shadow-lift)]"
              />
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
              <p className="mt-8 max-w-xl text-bone-2">{profile.bio[0]}</p>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-5 max-w-xl text-bone-2">{profile.bio[1]}</p>
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

      {/* ── Education ────────────────────────────────────────── */}
      <section
        className="border-y border-line bg-ink-raised py-28"
        aria-labelledby="edu-heading"
      >
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Education</p>
          </Reveal>
          <SplitText
            as="h2"
            id="edu-heading"
            text="Where I studied"
            className="font-display text-h1 mt-4 text-bone"
          />

          {/* Timeline — the rule runs behind the markers. */}
          <ol className="relative mt-16 border-l border-line pl-8 sm:pl-12">
            {education.map((item, i) => (
              <li key={item.qualification} className="relative pb-12 last:pb-0">
                <Reveal index={i}>
                  <span
                    aria-hidden="true"
                    className={`absolute top-2 -left-[2.05rem] h-3 w-3 rounded-full ring-4 ring-[var(--color-ink-raised)] sm:-left-[3.05rem] ${
                      i === 0 ? "grad-bg" : "bg-line-strong"
                    }`}
                  />
                  <p className="font-mono text-xs tracking-[0.08em] text-ash">
                    {item.period}
                  </p>
                  <h3 className="font-display text-h3 mt-2 text-bone">
                    {item.qualification}
                  </h3>
                  <p className="mt-2 text-ash">
                    {item.institution}
                    {item.affiliation ? ` — ${item.affiliation}` : ""}
                    {item.location ? `, ${item.location}` : ""}
                  </p>
                  {item.result && (
                    <p className="grad-text font-display text-h3 mt-3">
                      {item.result}
                    </p>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Credentials ──────────────────────────────────────── */}
      <section className="py-28" aria-labelledby="cred-heading">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="eyebrow">Credentials</p>
              </Reveal>
              <SplitText
                as="h2"
                id="cred-heading"
                text="Certified, and verifiable"
                className="font-display text-h1 mt-4 text-bone"
              />
            </div>
            <Reveal delay={150}>
              <Link
                href="/credentials"
                className="link-draw font-mono text-xs tracking-[0.16em] text-ash uppercase hover:text-bone"
              >
                All {certifications.length} →
              </Link>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.slice(0, 6).map((cert, i) => (
              <li key={cert.name} className="card-hover">
                <Reveal index={i % 3}>
                  <a
                    href={cert.credentialUrl || cert.issuerUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block h-full"
                  >
                    <article className="card flex h-full flex-col justify-between gap-8 p-7">
                      <div>
                        <p className="font-mono text-[0.65rem] tracking-[0.14em] text-ember uppercase">
                          {cert.issuer}
                        </p>
                        <p className="font-display text-h3 mt-3 text-bone">
                          {cert.name}
                        </p>
                      </div>
                      <p className="flex items-center justify-between font-mono text-[0.7rem] text-ash-dim">
                        {cert.issued}
                        <span aria-hidden="true">↗</span>
                      </p>
                    </article>
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
