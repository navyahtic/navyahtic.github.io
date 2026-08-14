import Link from "next/link";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/hero/SplitText";

export function Footer() {
  return (
    <footer id="contact" className="relative mt-32 overflow-hidden border-t border-line pt-24 pb-12">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-8">Contact</p>
        </Reveal>

        <SplitText
          as="h2"
          text="Let's build something exact."
          className="font-display text-h1 max-w-4xl text-balance text-bone"
        />

        <Reveal delay={200}>
          <p className="text-lead mt-8 max-w-xl text-ash">
            I'm open to software and machine learning engineering roles. The fastest way to reach me
            is email.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <Magnetic strength={16} className="mt-10 inline-block">
            <a
              href={profile.links.email}
              className="group inline-flex items-center gap-4 rounded-full border border-line-strong px-8 py-4 transition-colors hover:border-ember"
            >
              <span className="font-display text-h3 text-bone transition-colors group-hover:text-ember">
                {profile.email}
              </span>
              <span
                aria-hidden="true"
                className="translate-x-0 text-ember transition-transform duration-500 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Magnetic>
        </Reveal>

        <div className="rule mt-20 flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Elsewhere" className="flex flex-wrap items-center gap-6">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="link-draw font-mono text-xs tracking-[0.16em] text-ash uppercase transition-colors hover:text-bone"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="link-draw font-mono text-xs tracking-[0.16em] text-ash uppercase transition-colors hover:text-bone"
            >
              LinkedIn
            </a>
            <Link
              href="/resume"
              className="link-draw font-mono text-xs tracking-[0.16em] text-ash uppercase transition-colors hover:text-bone"
            >
              Résumé
            </Link>
          </nav>

          <p className="font-mono text-xs tracking-[0.12em] text-ash-dim">
            © {new Date().getFullYear()} {profile.name} — {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
