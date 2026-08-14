type Props = {
  items: readonly string[];
  className?: string;
};

/**
 * Infinite horizontal ticker.
 *
 * The list is rendered twice: the first copy scrolls a full width to the left
 * while the second slides into its place, so the loop has no visible seam.
 * The duplicate is aria-hidden, and the whole strip sits behind aria-hidden so
 * a screen reader is not read the same list twice.
 *
 * Pure CSS animation on transform — nothing here touches the main thread.
 */
export function Marquee({ items, className = "" }: Props) {
  const row = (key: string, hidden = false) => (
    <div className="marquee__track" key={key} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex shrink-0 items-center gap-12">
          <span className="font-display text-h3 whitespace-nowrap text-bone-2">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-ember/60"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      {row("a")}
      {row("b", true)}
    </div>
  );
}
