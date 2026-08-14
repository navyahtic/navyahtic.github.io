/**
 * Which source images get processed, and what each one is called on the site.
 *
 * `id` is the key the content files reference — keep it stable. `file` is the
 * name in SOURCE_DIR; change it to swap the picture behind an id without
 * touching any page.
 *
 * `kind` picks the output width: "document" for certificates and screenshots
 * that need to stay readable, "photo" for photographs.
 *
 * Duplicates in the source folder are deliberately not listed twice.
 */
export const SOURCE_DIR = "O:/acheivementsnavya";

export const manifest = [
  // ── Publications & research ──────────────────────────────
  { id: "pub-athercare-ieee", file: "1000223754.jpg", kind: "document" },
  { id: "pub-athercare-presented", file: "1000223784.jpg", kind: "document" },
  { id: "pub-ijatem", file: "1000223766.jpg", kind: "document" },

  // ── Award ceremony ───────────────────────────────────────
  { id: "award-icrcct-stage", file: "1000223769.jpg", kind: "photo" },
  { id: "award-icrcct-trophy", file: "1000223768.jpg", kind: "photo" },

  // ── Certifications ───────────────────────────────────────
  { id: "cert-aws-foundations", file: "1000223759.jpg", kind: "document" },
  { id: "cert-aws-security", file: "1000223767.jpg", kind: "document" },
  { id: "cert-uipath", file: "1000223783.jpg", kind: "document" },
  { id: "cert-uipath-cohort", file: "1000223753.jpg", kind: "document" },
  { id: "cert-aspire", file: "1000223785.jpg", kind: "document" },
  { id: "cert-tcs-ion", file: "1000223751.jpg", kind: "document" },
  { id: "cert-palo-cloud", file: "1000223771.jpg", kind: "document" },
  { id: "cert-palo-network", file: "1000223772.jpg", kind: "document" },
  { id: "cert-ict-rpa", file: "1000223786.jpg", kind: "document" },
  { id: "cert-mindler", file: "1000223756.jpg", kind: "document" },
  { id: "cert-internshala-web", file: "1000223762.jpg", kind: "document" },
  { id: "cert-coursera-ads", file: "1000223758.jpg", kind: "document" },
  { id: "cert-eduskills-android", file: "1000223764.jpg", kind: "document" },

  // ── Workshops ────────────────────────────────────────────
  { id: "wk-autocad", file: "1000223755.jpg", kind: "document" },
  { id: "wk-git", file: "1000223761.jpg", kind: "document" },
  { id: "wk-capx-llm", file: "1000223760.jpg", kind: "document" },
  { id: "wk-tareeqa-hr", file: "1000223757.jpg", kind: "document" },

  // ── Competitions ─────────────────────────────────────────
  { id: "comp-sih", file: "1000223752.jpg", kind: "document" },
  { id: "comp-colossus", file: "1000223775.jpg", kind: "document" },
  { id: "comp-cypherquest", file: "1000223763.jpg", kind: "document" },
  { id: "comp-young-turks", file: "1000223787.jpg", kind: "document" },
  { id: "comp-aincat", file: "1000223776.jpg", kind: "document" },

  // ── Volunteering ─────────────────────────────────────────
  { id: "vol-agentic-ai-day", file: "1000223781.jpg", kind: "document" },
  { id: "vol-hackzion", file: "1000223774.jpg", kind: "document" },
  { id: "vol-parishe", file: "1000223782.jpg", kind: "document" },
];
