import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { ImageSlot } from "@/components/ImageSlot";
import { SplitText } from "@/components/hero/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter((p) => p.featured).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      url: `${profile.siteUrl}/work/${project.slug}`,
    },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.featured) notFound();

  const index = projects
    .filter((p) => p.featured)
    .findIndex((p) => p.slug === slug);
  const featured = projects.filter((p) => p.featured);
  const next = featured[(index + 1) % featured.length];

  return (
    <article>
      {/* ── Title ────────────────────────────────────────────── */}
      <header className="shell pt-36 pb-16">
        <Reveal>
          <Link
            href="/work"
            className="link-draw font-mono text-xs tracking-[0.16em] text-ash uppercase hover:text-bone"
          >
            ← All work
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow mt-12">
            {project.kicker} — {project.year}
          </p>
        </Reveal>

        <SplitText
          as="h1"
          immediate
          delay={150}
          text={project.title}
          className="font-display text-display mt-6 text-bone"
        />

        <Reveal delay={400}>
          <p className="text-lead mt-8 max-w-3xl text-balance text-bone-2">
            {project.summary}
          </p>
        </Reveal>

        {project.status && (
          <Reveal delay={500}>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-1.5 font-mono text-[0.7rem] tracking-[0.08em] text-ash">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-ember"
                aria-hidden="true"
              />
              {project.status}
            </p>
          </Reveal>
        )}
      </header>

      {/* ── Cover ────────────────────────────────────────────── */}
      {project.cover && (
        <div className="shell">
          <div style={{ viewTransitionName: `cover-${project.slug}` }}>
            <ImageSlot
              slot={project.cover}
              ratio="16/9"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Meta strip ───────────────────────────────────────── */}
      <section className="shell rule mt-20 grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal index={0}>
          <p className="eyebrow">Role</p>
          <p className="mt-3 text-sm text-bone-2">{project.role}</p>
        </Reveal>
        <Reveal index={1}>
          <p className="eyebrow">Year</p>
          <p className="mt-3 text-sm text-bone-2">{project.year}</p>
        </Reveal>
        <Reveal index={2} className="sm:col-span-2">
          <p className="eyebrow">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {project.stack.map((tech) => (
              <li key={tech} className="text-sm text-bone-2">
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── Problem ──────────────────────────────────────────── */}
      {project.problem && (
        <section className="rule py-24" aria-labelledby="problem-heading">
          <div className="shell grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <Reveal>
              <h2 id="problem-heading" className="eyebrow lg:sticky lg:top-28">
                The problem
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="font-display text-h3 max-w-2xl leading-relaxed text-bone">
                {project.problem}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Approach ─────────────────────────────────────────── */}
      {project.approach && (
        <section className="rule py-24" aria-labelledby="approach-heading">
          <div className="shell grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <Reveal>
              <h2 id="approach-heading" className="eyebrow lg:sticky lg:top-28">
                Approach
              </h2>
            </Reveal>
            <ol className="max-w-2xl">
              {project.approach.map((step, i) => (
                <li
                  key={i}
                  className="border-b border-line py-7 first:pt-0 last:border-0"
                >
                  <Reveal index={i}>
                    <div className="flex gap-6">
                      <span
                        className="font-mono text-xs text-ember"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-bone-2">{step}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Results ──────────────────────────────────────────── */}
      {project.results && project.results.length > 0 && (
        <section className="rule py-24" aria-labelledby="results-heading">
          <div className="shell">
            <Reveal>
              <h2 id="results-heading" className="eyebrow">
                Results
              </h2>
            </Reveal>

            <dl className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {project.results.map((metric, i) => (
                <Reveal key={metric.label} index={i}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <p className="font-display text-h2 text-ember">
                      {metric.value}
                    </p>
                    <p className="mt-3 font-mono text-[0.7rem] leading-relaxed tracking-[0.1em] text-ash uppercase">
                      {metric.label}
                    </p>
                    {metric.against && (
                      <p className="mt-2 font-mono text-[0.7rem] text-ash-dim line-through decoration-ash-dim/60">
                        {metric.against}
                      </p>
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>

            {project.resultsNote && (
              <Reveal delay={200}>
                <p className="mt-12 max-w-2xl border-l border-line pl-6 text-sm text-ash-dim">
                  {project.resultsNote}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ── Gallery ──────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="rule py-24" aria-label="Project images">
          <div className="shell grid gap-12 md:grid-cols-2">
            {project.gallery.map((slot, i) => (
              <Reveal key={i} index={i}>
                <ImageSlot
                  slot={slot}
                  ratio="16/10"
                  sizes="(max-width: 768px) 92vw, 44vw"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Outcome ──────────────────────────────────────────── */}
      {project.outcome && (
        <section className="rule py-24" aria-labelledby="outcome-heading">
          <div className="shell grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
            <Reveal>
              <h2 id="outcome-heading" className="eyebrow lg:sticky lg:top-28">
                What it came to
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="font-display text-h3 max-w-2xl leading-relaxed text-bone">
                {project.outcome}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Links ────────────────────────────────────────────── */}
      {project.links && project.links.length > 0 && (
        <section className="shell rule py-16" aria-label="Project links">
          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <Magnetic key={link.href} strength={12}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3 font-mono text-xs tracking-[0.16em] text-bone uppercase transition-colors hover:border-ember hover:text-ember"
                >
                  {link.label} ↗
                </a>
              </Magnetic>
            ))}
          </div>
        </section>
      )}

      {/* ── Next ─────────────────────────────────────────────── */}
      <nav className="rule py-24" aria-label="Next project">
        <div className="shell">
          <p className="eyebrow">Next</p>
          <Link
            href={`/work/${next.slug}`}
            className="group mt-6 block"
            data-cursor="grow"
          >
            <h2 className="font-display text-h1 text-bone transition-colors group-hover:text-ember">
              {next.title}
            </h2>
            <p className="mt-4 max-w-xl text-ash">{next.summary}</p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
