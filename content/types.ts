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
  /** Paste the real badge/credential URL here — see README. */
  credentialUrl?: string;
  /** Issuer's official verification portal. Used when credentialUrl is not set yet. */
  issuerUrl: string;
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
  /** Leave "" until you have the conference/organiser name confirmed. */
  issuer?: string;
  image?: ImageSlot;
};

export type SkillGroup = {
  group: string;
  items: string[];
};
