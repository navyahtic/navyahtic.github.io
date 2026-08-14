import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[70svh] place-items-center py-40">
      <div className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-h1 mt-6 text-bone">Nothing registered here.</h1>
        <p className="mt-6 text-ash">That page does not exist — or it moved.</p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-ink uppercase transition-colors hover:bg-ember"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
