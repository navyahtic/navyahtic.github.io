export const profile = {
  name: "Navyashree N",
  initials: "NN",
  /** Used in <title>, JSON-LD, and the resume header. */
  role: "Research Engineer — ML & GPU Systems",
  location: "Chennai & Bengaluru, India",
  email: "navyashreensgr@gmail.com",

  /** The hero statement. Kept to one sentence on purpose. */
  statement:
    "I build systems for the operating room, where a millimetre is the tolerance and ten milliseconds is the whole budget.",

  /** One paragraph, used on / and as the meta description seed. */
  short:
    "Research engineer at IIT Madras' Healthcare Technology Innovation Centre, working on GPU-accelerated surgical navigation for total knee arthroplasty. Computer Science Engineering, VTU Bengaluru, Class of 2026.",

  /** /about — longer, first person, no CV voice. */
  bio: [
    "I work at the point where research code has to become something a surgeon can rely on. At IIT Madras' Healthcare Technology Innovation Centre I build the GPU morphing stack for imageless total knee arthroplasty — reconstructing a patient's femur and tibia from points swept with a probe in theatre, instead of from a CT taken days earlier. The reconstruction has to land inside half a millimetre and finish inside a single surgical frame.",
    "Most of what I've learned came from replacing something that already worked. The bone-synthesis pipeline I inherited ran on a thin-plate-spline formulation from 1989. It hit its landmarks and shrank the bone by two thirds. Rebuilding it around Bayesian Coherent Point Drift meant reading the 1989 paper closely enough to understand why it was written that way, and then writing 89 tests — including one that checks the output is byte-identical run to run — because in a surgical pipeline reproducibility is a safety property, not a nicety.",
    "Before the research work I spent a year shipping applied ML: spam classifiers, price regressors, housing pipelines — always taken past the notebook and served behind a real API, because a model nobody can call is a model nobody uses. That habit is the throughline. I like the part of the job where a result becomes a thing that runs.",
    "Outside the lab I'm a Google Developer Group member, a SHEfi Scholar, and an open-source contributor through GSSoC. I'm currently open to software and ML engineering roles.",
  ],

  links: {
    github: "https://github.com/Navyansgr",
    linkedin: "https://www.linkedin.com/in/navyashree-n-7bbab2280/",
    email: "mailto:navyashreensgr@gmail.com",
  },

  /** Drop the PDF at public/Navyashree-N-Resume.pdf to make the download button live. */
  resumeFile: "/Navyashree-N-Resume.pdf",

  /** Drives canonical tags, OG URLs, and the sitemap. Change it if you move to a custom domain. */
  siteUrl: "https://navyahtic.github.io",
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Credentials", href: "/credentials" },
  { label: "About", href: "/about" },
  { label: "Résumé", href: "/resume" },
] as const;
