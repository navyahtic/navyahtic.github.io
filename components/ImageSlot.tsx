import Image from "next/image";
import type { ImageSlot as Slot } from "@/content/types";

type Props = {
  slot: Slot;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Aspect ratio for the frame, e.g. "16/10". Keeps placeholder and photo identical. */
  ratio?: string;
};

/**
 * A framed image that renders a labelled placeholder until a file is dropped in.
 *
 * The placeholder shows the target dimensions, so replacing it is a matter of
 * saving a file at that size into /public/images and setting `src` in the
 * matching content file. Nothing else changes — the frame, the ratio, and the
 * surrounding layout are identical either way, so the page never reflows when
 * real photos land.
 */
export function ImageSlot({
  slot,
  className = "",
  sizes = "100vw",
  priority,
  ratio = "16/10",
}: Props) {
  const hasImage = Boolean(slot.src);

  return (
    <figure className={className}>
      <div
        className="relative w-full overflow-hidden rounded-sm border border-line bg-ink-raised"
        style={{ aspectRatio: ratio }}
      >
        {hasImage ? (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6">
            {/* Hairline cross-hatch so an empty slot still reads as considered. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--color-bone) 0 1px, transparent 1px 11px)",
              }}
            />
            <div className="relative text-center">
              <p className="font-mono text-[0.65rem] tracking-[0.18em] text-ash uppercase">
                Image slot
              </p>
              <p className="mt-2 max-w-sm text-sm text-ash-dim">{slot.alt}</p>
              <p className="mt-3 font-mono text-[0.65rem] tracking-[0.1em] text-ember/70">
                {slot.spec}
              </p>
            </div>
          </div>
        )}
      </div>
      {slot.caption && (
        <figcaption className="mt-3 font-mono text-[0.7rem] tracking-[0.08em] text-ash-dim">
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}
