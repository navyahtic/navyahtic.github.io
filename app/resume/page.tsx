import type { Metadata } from "next";

import { profile } from "@/content/profile";
import { experience, involvement } from "@/content/experience";
import { education, skills } from "@/content/education";
import { certifications } from "@/content/certifications";
import { awards } from "@/content/awards";
import { projects } from "@/content/projects";
import { publications } from "@/content/publications";
import { competitions, volunteering, workshops } from "@/content/activities";
import type { Activity } from "@/content/types";

import { SplitText } from "@/components/hero/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Full résumé for ${profile.name} — ${profile.role}.`,
  alternates: { canonical: "/resume" },
};

/**
 * Rendered entirely from the same content files that drive the rest of the
 * site, so the résumé cannot drift out of sync with the work pages. The PDF
 * download is a separate artefact you maintain — see README.
 */
export default function ResumePage() {
  return (
    <>
      <header className="shell relative pt-40 pb-16">
        <div className="mesh" aria-hidden="true" />
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <p className="eyebrow">Résumé</p>
            </Reveal>
            <SplitText
              as="h1"
              immediate
              delay={100}
              text={profile.name}
              className="font-display text-h1 relative mt-6 text-bone"
            />
            <Reveal delay={300}>
              <p className="mt-4 text-lead text-ash">{profile.role}</p>
            </Reveal>
            <Reveal delay={380}>
              <p className="mt-2 font-mono text-xs tracking-[0.1em] text-ash-dim">
                {profile.location} —{" "}
                <a
                  href={profile.links.email}
                  className="link-draw text-ash hover:text-bone"
                >
                  {profile.email}
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <Magnetic strength={14}>
              <a
                href={profile.resumeFile}
                download
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-ink uppercase transition-colors hover:bg-ember"
              >
                Download PDF
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </header>

      {/* ── Summary ──────────────────────────────────────────── */}
      <Section title="Summary">
        <p className="max-w-3xl text-lg leading-relaxed text-bone-2">
          {profile.bio[0]}
        </p>
      </Section>

      {/* ── Experience ───────────────────────────────────────── */}
      <Section title="Experience">
        <ol className="space-y-10">
          {experience.map((role, i) => (
            <li key={`${role.org}-${role.start}`}>
              <Reveal index={Math.min(i, 3)}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-h3 text-bone">
                    {role.title}
                    <span className="text-ash"> — {role.org}</span>
                  </h3>
                  <p className="font-mono text-xs text-ash-dim">
                    {role.start} — {role.end}
                  </p>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {role.bullets.map((bullet, b) => (
                    <li key={b} className="flex max-w-3xl gap-4 text-bone-2">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-3 shrink-0 bg-ash-dim"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Publications ─────────────────────────────────────── */}
      <Section title="Publications">
        <ol className="space-y-6">
          {publications.map((pub, i) => (
            <li key={pub.title}>
              <Reveal index={Math.min(i, 3)}>
                <h3 className="font-display text-h3 max-w-3xl text-balance text-bone">
                  {pub.title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-ash">
                  {pub.venue} — {pub.publisher}, {pub.date}
                </p>
                <p className="mt-1 font-mono text-[0.7rem] text-ash-dim">
                  {pub.status}
                </p>
                {pub.doi && (
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-draw mt-2 inline-block font-mono text-[0.7rem] tracking-[0.1em] text-bone uppercase"
                  >
                    DOI ↗
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <Section title="Projects">
        <ol className="space-y-8">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Reveal index={Math.min(i, 3)}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-h3 text-bone">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-ash-dim">
                    {project.year}
                  </p>
                </div>
                <p className="mt-2 max-w-3xl text-bone-2">{project.summary}</p>
                <p className="mt-2 font-mono text-[0.7rem] tracking-[0.08em] text-ash-dim uppercase">
                  {project.stack.join(" · ")}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <Section title="Skills">
        <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal key={group.group} index={i % 2}>
              <dt className="font-mono text-[0.7rem] tracking-[0.14em] text-ember uppercase">
                {group.group}
              </dt>
              <dd className="mt-2 text-bone-2">{group.items.join(", ")}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* ── Education ────────────────────────────────────────── */}
      <Section title="Education">
        <ol className="space-y-6">
          {education.map((item, i) => (
            <li key={item.qualification}>
              <Reveal index={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-h3 text-bone">
                    {item.qualification}
                  </h3>
                  <p className="font-mono text-xs text-ash-dim">
                    {item.period}
                  </p>
                </div>
                <p className="mt-1 text-ash">
                  {item.institution}
                  {item.affiliation ? ` — ${item.affiliation}` : ""}
                  {item.location ? `, ${item.location}` : ""}
                </p>
                {item.result && (
                  <p className="mt-1 font-mono text-xs text-ember">
                    {item.result}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Certifications ───────────────────────────────────── */}
      <Section title="Certifications">
        <ul className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <li key={cert.name}>
              <Reveal index={i % 2}>
                <a
                  href={cert.credentialUrl || cert.issuerUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block"
                >
                  <p className="text-bone-2 transition-colors group-hover:text-ember">
                    {cert.name}
                  </p>
                  <p className="mt-1 font-mono text-[0.7rem] text-ash-dim">
                    {cert.issuer} — {cert.issued} ↗
                  </p>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Awards ───────────────────────────────────────────── */}
      <Section title="Awards & Recognition">
        <ul className="space-y-4">
          {awards.map((award, i) => (
            <li key={award.title}>
              <Reveal index={Math.min(i, 3)}>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <p className="font-mono text-xs text-ash-dim">{award.year}</p>
                  <p className="text-bone-2">
                    <span className="text-bone">{award.title}</span> —{" "}
                    {award.detail}
                    {award.issuer ? ` ${award.issuer}` : ""}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Competitions ─────────────────────────────────────── */}
      <Section title="Competitions">
        <ActivityList items={competitions} />
      </Section>

      {/* ── Volunteering ─────────────────────────────────────── */}
      <Section title="Volunteering">
        <ActivityList items={volunteering} />
      </Section>

      {/* ── Workshops ────────────────────────────────────────── */}
      <Section title="Workshops">
        <ActivityList items={workshops} />
      </Section>

      {/* ── Community ────────────────────────────────────────── */}
      <Section title="Community">
        <ul className="space-y-4">
          {involvement.map((item, i) => (
            <li key={item.title}>
              <Reveal index={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                  <p className="text-bone-2">
                    <span className="text-bone">{item.title}</span> — {item.org}
                  </p>
                  <p className="font-mono text-xs text-ash-dim">
                    {item.period}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

function ActivityList({ items }: { items: Activity[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={item.title}>
          <Reveal index={Math.min(i, 3)}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6">
              <p className="max-w-2xl text-bone-2">
                <span className="text-bone">{item.title}</span> — {item.org}
                {item.highlight && (
                  <span className="text-ember"> · {item.highlight}</span>
                )}
              </p>
              <p className="font-mono text-xs whitespace-nowrap text-ash-dim">
                {item.date}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rule py-16" aria-label={title}>
      <div className="shell grid gap-8 lg:grid-cols-[0.22fr_0.78fr]">
        <Reveal>
          <h2 className="eyebrow lg:sticky lg:top-28">{title}</h2>
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  );
}
