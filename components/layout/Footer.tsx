import Link from "next/link";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/hero/SplitText";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-line pt-28 pb-12"
    >
      <div className="mesh" aria-hidden="true" />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow mb-8">Contact</p>
        </Reveal>

        <SplitText
          as="h2"
          text="Let's build something exact."
          className="font-display text-display max-w-5xl text-balance text-bone"
        />

        <Reveal delay={200}>
          <p className="text-lead mt-8 max-w-xl text-ash">
            I'm open to software and machine learning engineering roles. The
            fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <Magnetic strength={16} className="mt-10 inline-block">
            <a
              href={profile.links.email}
              className="group grad-bg inline-flex items-center gap-4 rounded-full px-9 py-5 shadow-[var(--shadow-deep)] transition-transform duration-500 hover:scale-[1.03]"
            >
              <span className="font-display text-h3 text-white">
                {profile.email}
              </span>
              <span
                aria-hidden="true"
                className="text-white/80 transition-transform duration-500 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </Magnetic>
        </Reveal>

        <div className="rule mt-20 flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Elsewhere"
            className="flex flex-wrap items-center gap-6"
          >
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
