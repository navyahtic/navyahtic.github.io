import type { Metadata } from "next";

import { certifications } from "@/content/certifications";
import { competitions, volunteering, workshops } from "@/content/activities";
import { publications } from "@/content/publications";
import { awards } from "@/content/awards";
import type { Activity } from "@/content/types";

import { SplitText } from "@/components/hero/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryImage } from "@/components/GalleryImage";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Publications, certifications, competitions, volunteering and workshops — Navyashree N, research engineer.",
  alternates: { canonical: "/credentials" },
};

const counts = [
  { value: String(publications.length), label: "papers" },
  { value: String(certifications.length), label: "certifications" },
  { value: String(competitions.length), label: "competitions" },
  { value: String(volunteering.length), label: "volunteer roles" },
];

export default function CredentialsPage() {
  return (
    <>
      <header className="shell relative pt-40 pb-16">
        <div className="mesh" aria-hidden="true" />
        <Reveal>
          <p className="eyebrow">Credentials</p>
        </Reveal>
        <SplitText
          as="h1"
          immediate
          delay={100}
          text="Everything, with receipts."
          className="font-display text-h1 relative mt-6 max-w-4xl text-balance text-bone"
        />
        <Reveal delay={300}>
          <p className="text-lead mt-8 max-w-2xl text-ash">
            Papers, certifications, competitions and community work. Every card
            links to the issuer's verification page where one exists, and shows
            the certificate itself where it does not.
          </p>
        </Reveal>

        <dl className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-4">
          {counts.map((c, i) => (
            <Reveal key={c.label} index={i}>
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <p className="font-display text-h2 grad-text">{c.value}</p>
                <p className="mt-1 font-mono text-[0.7rem] tracking-[0.12em] text-ash uppercase">
                  {c.label}
                </p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </header>

      {/* ── Publications ─────────────────────────────────────── */}
      <section
        className="border-y border-line bg-ink-raised py-24"
        aria-labelledby="pubs-heading"
      >
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Research</p>
          </Reveal>
          <SplitText
            as="h2"
            id="pubs-heading"
            text="Published work"
            className="font-display text-h2 mt-4 text-bone"
          />

          <ol className="mt-16 space-y-10">
            {publications.map((pub, i) => (
              <li key={pub.title}>
                <Reveal>
                  <div className="card grid gap-10 p-8 lg:grid-cols-[0.62fr_0.38fr] lg:p-10">
                    <div>
                      <p className="font-mono text-[0.7rem] tracking-[0.14em] text-ember uppercase">
                        {pub.publisher} — {pub.date}
                      </p>
                      <h3 className="font-display text-h3 mt-4 max-w-2xl text-balance text-bone">
                        {pub.title}
                      </h3>
                      <p className="mt-3 text-sm text-ash">{pub.venue}</p>

                      <p className="mt-5 max-w-2xl text-bone-2">
                        {pub.abstract}
                      </p>

                      <p className="mt-6 max-w-2xl text-sm text-ash-dim">
                        {pub.authors.map((author, a) => (
                          <span key={author}>
                            <span
                              className={
                                author === pub.authorHighlight
                                  ? "text-bone"
                                  : ""
                              }
                            >
                              {author}
                            </span>
                            {a < pub.authors.length - 1 && ", "}
                          </span>
                        ))}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <p className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-1.5 font-mono text-[0.68rem] tracking-[0.06em] text-ash">
                          <span
                            aria-hidden="true"
                            className="inline-block h-1.5 w-1.5 rounded-full bg-ember"
                          />
                          {pub.status}
                        </p>
                        {pub.doi && (
                          <a
                            href={pub.doi}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-draw font-mono text-xs tracking-[0.12em] text-bone uppercase"
                          >
                            DOI ↗
                          </a>
                        )}
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-draw font-mono text-xs tracking-[0.12em] text-bone uppercase"
                          >
                            Read the paper ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {pub.image && (
                      <GalleryImage
                        id={pub.image}
                        alt={`${pub.title} — ${pub.publisher}`}
                        ratio="16/10"
                        priority={i === 0}
                        sizes="(max-width: 1024px) 92vw, 34vw"
                      />
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────── */}
      <section className="rule py-24" aria-labelledby="certs-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Certifications</p>
          </Reveal>
          <SplitText
            as="h2"
            id="certs-heading"
            text="Certified"
            className="font-display text-h2 mt-4 text-bone"
          />

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <li key={cert.name} className="card-hover">
                <Reveal index={i % 3}>
                  <a
                    href={cert.credentialUrl || cert.issuerUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="card group flex h-full flex-col overflow-hidden"
                  >
                    <GalleryImage
                      id={cert.image}
                      alt={`${cert.name} — ${cert.issuer}`}
                      ratio="4/3"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      className="rounded-none border-0 border-b border-line"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-mono text-[0.65rem] tracking-[0.14em] text-ember uppercase">
                        {cert.issuer}
                      </p>
                      <h3 className="font-display text-h3 mt-2 text-bone transition-colors group-hover:text-ember">
                        {cert.name}
                      </h3>
                      {cert.detail && (
                        <p className="mt-2 text-sm text-ash">{cert.detail}</p>
                      )}
                      <p className="mt-auto flex items-center gap-3 pt-4 font-mono text-[0.68rem] text-ash-dim">
                        <span>{cert.issued}</span>
                        {cert.credentialUrl ? (
                          <span className="text-ash">Verify ↗</span>
                        ) : cert.credentialId ? (
                          <span className="truncate">
                            ID {cert.credentialId}
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Awards ───────────────────────────────────────────── */}
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

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, i) => (
              <Reveal
                key={award.title}
                index={i % 3}
                className="card-hover h-full"
              >
                <article className="card flex h-full flex-col overflow-hidden">
                  <GalleryImage
                    id={award.image}
                    alt={award.title}
                    ratio="4/3"
                    fit={
                      award.image === "award-icrcct-stage" ? "cover" : "contain"
                    }
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className="rounded-none border-0 border-b border-line"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[0.65rem] tracking-[0.14em] text-ember uppercase">
                      {award.year}
                    </p>
                    <h3 className="font-display text-h3 mt-2 text-bone">
                      {award.title}
                    </h3>
                    <p className="mt-2 text-sm text-ash">{award.detail}</p>
                    {award.issuer && (
                      <p className="mt-2 font-mono text-[0.68rem] leading-relaxed text-ash-dim">
                        {award.issuer}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ActivitySection
        eyebrow="Competing"
        heading="Hackathons and contests"
        items={competitions}
        id="comp"
      />
      <ActivitySection
        eyebrow="Giving time"
        heading="Volunteering"
        items={volunteering}
        id="vol"
      />
      <ActivitySection
        eyebrow="Training"
        heading="Workshops"
        items={workshops}
        id="work"
        compact
      />
    </>
  );
}

function ActivitySection({
  eyebrow,
  heading,
  items,
  id,
  compact = false,
}: {
  eyebrow: string;
  heading: string;
  items: Activity[];
  id: string;
  compact?: boolean;
}) {
  return (
    <section className="rule py-24" aria-labelledby={`${id}-heading`}>
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <SplitText
          as="h2"
          id={`${id}-heading`}
          text={heading}
          className="font-display text-h2 mt-4 text-bone"
        />

        <ul
          className={`mt-16 grid gap-6 sm:grid-cols-2 ${
            compact ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {items.map((item, i) => (
            <li key={item.title} className="card-hover">
              <Reveal index={i % 3}>
                <article className="card flex h-full flex-col overflow-hidden">
                  <GalleryImage
                    id={item.image}
                    alt={`${item.title} — ${item.org}`}
                    ratio="4/3"
                    sizes={
                      compact
                        ? "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                        : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    }
                    className="rounded-none border-0 border-b border-line"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    {item.highlight && (
                      <p className="font-mono text-[0.65rem] tracking-[0.14em] text-ember uppercase">
                        {item.highlight}
                      </p>
                    )}
                    <h3
                      className={`font-display text-h3 text-bone ${item.highlight ? "mt-2" : ""}`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash">
                      {item.org}
                    </p>
                    <p className="mt-3 text-sm text-bone-2">{item.detail}</p>
                    <p className="mt-auto pt-4 font-mono text-[0.68rem] text-ash-dim">
                      {item.date}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
