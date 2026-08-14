/**
 * Every content file in this folder is typed against these shapes.
 * If a field is optional here, the UI already handles it being absent —
 * leaving it out degrades gracefully rather than breaking a layout.
 */

export type Role = {
  title: string;
  org: string;
  orgShort?: string;
  location: string;
  start: string; // "Jun 2026"
  end: string; // "Present"
  current?: boolean;
  /** Shown as a short italic line above the bullets. Use it to frame an unusual role. */
  framing?: string;
  bullets: string[];
  tags?: string[];
};

export type Involvement = {
  title: string;
  org: string;
  period: string;
  note: string;
};

export type Metric = {
  value: string;
  label: string;
  /** Set when the number replaces a prior baseline — rendered as a struck-through comparison. */
  against?: string;
};

export type ImageSlot = {
  /** Path under /public, e.g. "/images/work/gpuneuromorph-01.jpg". Empty string = render the labelled placeholder. */
  src: string;
  alt: string;
  caption?: string;
  /** Recommended source dimensions, surfaced in the placeholder so you know what to drop in. */
  spec: string;
};

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  summary: string;
  /** Long-form only for featured case studies. */
  featured: boolean;
  status?: string;
  role: string;
  stack: string[];
  problem?: string;
  approach?: string[];
  results?: Metric[];
  /** Rendered under the metrics in smaller type — scope, caveats, what is not yet peer-reviewed. */
  resultsNote?: string;
  outcome?: string;
  links?: { label: string; href: string }[];
  cover?: ImageSlot;
  gallery?: ImageSlot[];
};

export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  /** One line of context, only where the name alone undersells it. */
  detail?: string;
  /** Certificate number printed on the document. */
  credentialId?: string;
  /** Direct verification link. See README for where to paste these. */
  credentialUrl?: string;
  /** Issuer's verification portal — the fallback when credentialUrl is empty. */
  issuerUrl: string;
  /** Gallery id from scripts/gallery-manifest.mjs. */
  image?: string;
};

/** Workshops, competitions, and volunteering all share this shape. */
export type Activity = {
  title: string;
  org: string;
  date: string;
  detail: string;
  /** Called out in accent — a placing, a percentile, a role. */
  highlight?: string;
  credentialId?: string;
  /** Gallery id from scripts/gallery-manifest.mjs. */
  image?: string;
};

export type Education = {
  qualification: string;
  institution: string;
  affiliation?: string;
  location?: string;
  period: string;
  result?: string;
};

export type Award = {
  title: string;
  detail: string;
  year: string;
  /** Omit until the organiser name is confirmed — the UI hides it rather than showing a gap. */
  issuer?: string;
  /** Gallery id from scripts/gallery-manifest.mjs. */
  image?: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};
