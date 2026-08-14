import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { SplitText } from "@/components/hero/SplitText";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work — GPU-accelerated surgical navigation, Bayesian point-set registration, retrieval systems, and applied machine learning.",
  alternates: { canonical: "/work" },
};

const featured = projects.filter((p) => p.featured);
const other = projects.filter((p) => !p.featured);

export default function WorkPage() {
  return (
    <>
      <header className="shell relative pt-40 pb-20">
        <div className="mesh" aria-hidden="true" />
        <Reveal>
          <p className="eyebrow relative">Work</p>
        </Reveal>
        <SplitText
          as="h1"
          immediate
          delay={100}
          text="Everything worth showing"
          className="font-display text-h1 relative mt-6 max-w-4xl text-balance text-bone"
        />
      </header>

      <section className="pb-24" aria-label="Case studies">
        <div className="shell grid gap-10 lg:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <section className="rule py-24" aria-labelledby="other-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Also built</p>
          </Reveal>
          <SplitText
            as="h2"
            id="other-heading"
            text="Shorter projects"
            className="font-display text-h2 mt-4 text-bone"
          />

          <ul className="mt-14 divide-y divide-line border-y border-line">
            {other.map((project, i) => (
              <li key={project.slug}>
                <Reveal index={i}>
                  <div className="grid gap-4 py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10">
                    <p className="font-mono text-xs text-ash-dim">
                      {project.year}
                    </p>
                    <div>
                      <h3 className="font-display text-h3 text-bone">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm text-ash">
                        {project.summary}
                      </p>
                      <ul
                        className="mt-3 flex flex-wrap gap-x-4 gap-y-1"
                        aria-label="Stack"
                      >
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="font-mono text-[0.65rem] tracking-[0.1em] text-ash-dim uppercase"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {project.links?.[0] && (
                      <a
                        href={project.links[0].href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-draw justify-self-start font-mono text-xs tracking-[0.16em] text-bone uppercase md:justify-self-end"
                      >
                        {project.links[0].label} ↗
                      </a>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
