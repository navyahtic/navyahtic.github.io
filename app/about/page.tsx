import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { profile } from "@/content/profile";
import { experience, involvement } from "@/content/experience";
import { education, skills } from "@/content/education";
import { awards } from "@/content/awards";
import { portraits } from "@/lib/image-data";

import { SplitText } from "@/components/hero/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ImageSlot";

export const metadata: Metadata = {
  title: "About",
  description: profile.short,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="shell pt-40 pb-16">
        <Reveal>
          <p className="eyebrow">About</p>
        </Reveal>
        <SplitText
          as="h1"
          immediate
          delay={100}
          text="I like the part where a result becomes a thing that runs."
          className="font-display text-h1 mt-6 max-w-5xl text-balance text-bone"
        />
      </header>

      {/* ── Bio + portrait ───────────────────────────────────── */}
      <section className="shell grid gap-16 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 lg:order-1">
          {profile.bio.map((para, i) => (
            <Reveal key={i} index={i}>
              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-bone-2">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="link-draw font-mono text-xs tracking-[0.16em] text-bone uppercase"
              >
                LinkedIn ↗
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-draw font-mono text-xs tracking-[0.16em] text-bone uppercase"
              >
                GitHub ↗
              </a>
              <Link
                href="/resume"
                className="link-draw font-mono text-xs tracking-[0.16em] text-bone uppercase"
              >
                Résumé →
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-28">
            <Image
              {...portraits.plate}
              alt="Navyashree N"
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="w-full rounded-sm object-cover"
            />
            <p className="mt-4 font-mono text-[0.7rem] tracking-[0.1em] text-ash-dim">
              {profile.location}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Experience ───────────────────────────────────────── */}
      <section className="rule py-24" aria-labelledby="exp-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Experience</p>
          </Reveal>
          <SplitText
            as="h2"
            id="exp-heading"
            text="Where I've worked"
            className="font-display text-h2 mt-4 text-bone"
          />

          <ol className="mt-16">
            {experience.map((role, i) => (
              <li key={`${role.org}-${role.start}`} className="border-t border-line py-10 last:border-b">
                <Reveal index={Math.min(i, 3)}>
                  <div className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
                    <div>
                      <p className="font-mono text-xs tracking-[0.1em] text-ash">
                        {role.start} — {role.end}
                      </p>
                      {role.current && (
                        <p className="mt-2 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] text-ember uppercase">
                          <span
                            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember"
                            aria-hidden="true"
                          />
                          Current
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display text-h3 text-bone">{role.title}</h3>
                      <p className="mt-1 text-sm text-ash">
                        {role.org} — {role.location}
                      </p>

                      {role.framing && (
                        <p className="mt-4 max-w-2xl border-l border-ember/40 pl-4 text-sm text-ash italic">
                          {role.framing}
                        </p>
                      )}

                      <ul className="mt-5 space-y-3">
                        {role.bullets.map((bullet, b) => (
                          <li key={b} className="flex max-w-2xl gap-4 text-bone-2">
                            <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-ash-dim" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {role.tags && (
                        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label="Technologies">
                          {role.tags.map((tag) => (
                            <li
                              key={tag}
                              className="font-mono text-[0.65rem] tracking-[0.1em] text-ash-dim uppercase"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Awards, with image slots ─────────────────────────── */}
      <section className="rule py-24" aria-labelledby="awards-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Recognition</p>
          </Reveal>
          <SplitText
            as="h2"
            id="awards-heading"
            text="Awards and honours"
            className="font-display text-h2 mt-4 text-bone"
          />

          <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, i) => (
              <Reveal key={award.title} index={i % 3}>
                <article>
                  {award.image && (
                    <ImageSlot
                      slot={{ ...award.image, caption: undefined }}
                      ratio="4/3"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      className="mb-5"
                    />
                  )}
                  <p className="font-mono text-[0.65rem] tracking-[0.14em] text-ember uppercase">
                    {award.year}
                  </p>
                  <h3 className="font-display text-h3 mt-2 text-bone">{award.title}</h3>
                  <p className="mt-2 text-sm text-ash">{award.detail}</p>
                  {award.issuer && (
                    <p className="mt-1 font-mono text-[0.7rem] text-ash-dim">{award.issuer}</p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section className="rule py-24" aria-labelledby="skills-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Toolkit</p>
          </Reveal>
          <SplitText
            as="h2"
            id="skills-heading"
            text="What I work in"
            className="font-display text-h2 mt-4 text-bone"
          />

          <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, i) => (
              <Reveal key={group.group} index={i % 3}>
                <dt className="eyebrow border-b border-line pb-3">{group.group}</dt>
                <dd className="mt-4">
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-bone-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Education + community ────────────────────────────── */}
      <section className="rule py-24" aria-labelledby="edu-heading">
        <div className="shell grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow">Education</p>
            </Reveal>
            <SplitText
              as="h2"
              id="edu-heading"
              text="Studied"
              className="font-display text-h2 mt-4 text-bone"
            />
            <ol className="mt-10">
              {education.map((item, i) => (
                <li key={item.qualification} className="border-t border-line py-6 last:border-b">
                  <Reveal index={i}>
                    <p className="font-mono text-xs text-ash">{item.period}</p>
                    <h3 className="font-display text-h3 mt-2 text-bone">{item.qualification}</h3>
                    <p className="mt-1 text-sm text-ash">
                      {item.institution}
                      {item.affiliation ? ` — ${item.affiliation}` : ""}
                    </p>
                    {item.result && (
                      <p className="mt-2 font-mono text-xs text-ember">{item.result}</p>
                    )}
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">Community</p>
            </Reveal>
            <SplitText
              as="h2"
              text="Involved"
              className="font-display text-h2 mt-4 text-bone"
            />
            <ol className="mt-10">
              {involvement.map((item, i) => (
                <li key={item.title} className="border-t border-line py-6 last:border-b">
                  <Reveal index={i}>
                    <p className="font-mono text-xs text-ash">{item.period}</p>
                    <h3 className="font-display text-h3 mt-2 text-bone">{item.title}</h3>
                    <p className="mt-1 text-sm text-ash">{item.org}</p>
                    <p className="mt-2 text-sm text-ash-dim">{item.note}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
