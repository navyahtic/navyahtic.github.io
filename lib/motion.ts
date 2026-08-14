/**
 * Motion tokens. Every animation on the site pulls its easing and duration
 * from here so the whole thing moves with one hand.
 *
 * Rule the components follow: transform and opacity only. Nothing animates a
 * property that triggers layout.
 */

export const ease = {
  /** Default. Fast out of the gate, long settle — reads confident, not bouncy. */
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  outQuad: [0.25, 0.46, 0.45, 0.94],
} as const;

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  reveal: 1.1,
} as const;

/** Stagger step for character-level reveals, in ms. */
export const CHAR_STEP = 28;

/** Stagger step for lists and grids, in ms. */
export const ITEM_STEP = 70;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.outExpo } },
} as const;
