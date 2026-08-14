import Image from "next/image";
import { img } from "@/lib/gallery-data";

type Props = {
  /** Gallery id from scripts/gallery-manifest.mjs. */
  id?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Frame ratio. Certificates are landscape documents; photos vary. */
  ratio?: string;
  /** Documents are letterboxed rather than cropped — a cropped certificate is useless. */
  fit?: "contain" | "cover";
};

/**
 * Renders a processed gallery image, or a quiet placeholder frame if that id
 * has no file yet. Callers never have to branch on whether an image exists.
 *
 * Certificates default to `contain` on a light plate: they are documents, and
 * cropping one to fill a frame throws away the part that proves anything.
 */
export function GalleryImage({
  id,
  alt,
  className = "",
  sizes = "(max-width: 768px) 92vw, 30vw",
  priority,
  ratio = "4/3",
  fit = "contain",
}: Props) {
  const image = id ? img(id) : undefined;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border border-line ${
        fit === "contain" ? "bg-bone/95" : "bg-ink-raised"
      } ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {image ? (
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className={fit === "contain" ? "object-contain p-2" : "object-cover"}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--color-bone) 0 1px, transparent 1px 11px)",
            }}
          />
          <p className="relative text-center font-mono text-[0.6rem] tracking-[0.16em] text-ash uppercase">
            Awaiting image
          </p>
        </div>
      )}
    </div>
  );
}
