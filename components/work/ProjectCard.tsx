"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/content/types";
import { ImageSlot } from "@/components/ImageSlot";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  project: Project;
  index: number;
  /** Case studies get a link; secondary work renders as a static card. */
  linked?: boolean;
};

/**
 * Project card with a shared-element transition into the case study.
 *
 * The view-transition-name on the cover means the browser animates the card
 * image into the hero image on the detail page. Browsers without the API just
 * navigate — the Reveal and hover states are unaffected either way.
 */
export function ProjectCard({ project, index, linked = true }: Props) {
  const router = useRouter();
  const num = String(index + 1).padStart(2, "0");

  const onClick = (e: React.MouseEvent) => {
    if (!linked) return;
    // Let modified clicks (new tab, etc.) behave normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (!("startViewTransition" in document)) return;

    e.preventDefault();
    (document as Document & {
      startViewTransition: (cb: () => void) => void;
    }).startViewTransition(() => {
      router.push(`/work/${project.slug}`);
    });
  };

  const body = (
    <article className="group relative">
      <div
        className="relative overflow-hidden rounded-sm"
        style={{ viewTransitionName: linked ? `cover-${project.slug}` : undefined }}
      >
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
          <ImageSlot
            slot={
              project.cover ?? {
                src: "",
                alt: project.title,
                spec: "1600×1000",
              }
            }
            ratio="16/10"
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 40vw"
          />
        </div>
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow">
            {num} — {project.kicker}
          </p>
          <h3 className="font-display text-h2 mt-2 text-bone transition-colors group-hover:text-ember">
            {project.title}
          </h3>
        </div>
        <span className="font-mono text-xs text-ash-dim shrink-0">{project.year}</span>
      </div>

      <p className="mt-4 max-w-xl text-ash">{project.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label="Stack">
        {project.stack.slice(0, 5).map((tech) => (
          <li
            key={tech}
            className="font-mono text-[0.7rem] tracking-[0.1em] text-ash-dim uppercase"
          >
            {tech}
          </li>
        ))}
      </ul>

      {linked && (
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-bone uppercase">
          Read the case study
          <span
            aria-hidden="true"
            className="text-ember transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      )}
    </article>
  );

  return (
    <Reveal index={index % 2}>
      {linked ? (
        <Link
          href={`/work/${project.slug}`}
          onClick={onClick}
          data-cursor="grow"
          className="block focus-visible:outline-offset-8"
        >
          {body}
        </Link>
      ) : (
        body
      )}
    </Reveal>
  );
}
