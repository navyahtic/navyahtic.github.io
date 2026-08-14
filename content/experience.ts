import type { Involvement, Role } from "./types";

export const experience: Role[] = [
  {
    title: "Project Associate",
    org: "IITM HTIC MedTech Incubator, IIT Madras",
    orgShort: "IITM HTIC",
    location: "Chennai",
    start: "Jun 2026",
    end: "Present",
    current: true,
    bullets: [
      "Own the GPU morphing stack behind an imageless total knee arthroplasty navigation system — neural signed distance fields, Gaussian RBF field-space warping, and a Holoscan operator graph that has to close the loop inside a single surgical frame.",
      "Moved bone synthesis off a 1989 thin-plate-spline formulation and onto Bayesian Coherent Point Drift, shipped as drop-in replacement executables so the surgical software adopted it without a single call-site change.",
      "Hold numerical work to a test suite rather than a demo: 89 tests including byte-identical determinism runs, validated against roughly 20,000 technician-swept surface points.",
    ],
    tags: ["CUDA", "Holoscan SDK", "Neural SDF", "C++", "Python"],
  },
  {
    title: "Project Intern",
    org: "IITM HTIC MedTech Incubator, IIT Madras",
    orgShort: "IITM HTIC",
    location: "Chennai",
    start: "Feb 2026",
    end: "Jun 2026",
    bullets: [
      "Prototyped and benchmarked the real-time bone morphing algorithms that became the team's MICCAI 2026 workshop submission.",
      "Built the Holoscan SDK operator graph for GPU scheduling, keeping the intraoperative path free of host round-trips.",
    ],
    tags: ["CUDA", "PyTorch", "Benchmarking"],
  },
  {
    title: "Data Science Intern",
    org: "Oasis Infobyte",
    location: "Remote",
    start: "Mar 2025",
    end: "Jul 2025",
    bullets: [
      "Shipped three end-to-end ML projects — spam classification, price regression, and a housing pipeline — each one taken past the notebook and served behind a REST API.",
      "Treated reproducibility as the deliverable: every submission documented, re-runnable, and under version control.",
    ],
    tags: ["scikit-learn", "Flask", "FastAPI", "pandas"],
  },
  {
    title: "Data Science Intern",
    org: "EliteTech Intern",
    location: "Remote",
    start: "Mar 2025",
    end: "Apr 2025",
    bullets: [
      "Built ML and analysis pipelines against messy real-world datasets in pandas and scikit-learn.",
      "Wrote results up so the reasoning survived without me in the room.",
    ],
    tags: ["pandas", "scikit-learn"],
  },
  {
    title: "Digital Marketing Intern",
    org: "WeDidIT",
    location: "Bengaluru",
    start: "Jul 2025",
    end: "Jul 2025",
    framing:
      "A deliberate month outside engineering — I wanted to understand the half of the job that decides whether good technical work ever gets used.",
    bullets: [
      "Ran campaigns across Instagram and LinkedIn and instrumented them in Google Analytics and Meta Business Suite.",
      "Learned funnels, cohorts, and attribution from the operator's side — the same shape of thinking that later made model evaluation and A/B methodology feel like familiar ground rather than new theory.",
    ],
    tags: ["Google Analytics", "Meta Business Suite"],
  },
  {
    title: "Student Intern",
    org: "Prodigy InfoTech",
    location: "Remote",
    start: "Oct 2024",
    end: "Apr 2025",
    bullets: [
      "Seven months of structured build work across Python and JavaScript — the repetitions that turned data structures and Git from coursework into muscle memory.",
    ],
    tags: ["Python", "JavaScript", "Git"],
  },
];

export const involvement: Involvement[] = [
  {
    title: "Cloud & NVIDIA Community Member",
    org: "Google for Developers / GDG",
    period: "Jul 2025 — Jun 2026",
    note: "Google Cloud and NVIDIA developer community initiatives.",
  },
  {
    title: "Cohort Intern, Season 6",
    org: "Infosys Springboard",
    period: "Jul 2025 — Nov 2025",
    note: "Structured cohort on software engineering and emerging technology.",
  },
  {
    title: "Student Partner",
    org: "Internshala",
    period: "Jul 2025 — Nov 2025",
    note: "Official campus representative — ran workshops and webinars, built the campus network.",
  },
];
