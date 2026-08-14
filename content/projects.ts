import type { Project } from "./types";

/**
 * Order here is the order everywhere. `featured: true` puts a project on the
 * home page and gives it a full case study at /work/<slug>.
 *
 * Image slots: every `src: ""` renders a labelled placeholder showing the
 * dimensions to drop in. Fill the src and the real image takes over — no other
 * change needed.
 */
export const projects: Project[] = [
  {
    slug: "gpuneuromorph",
    title: "GPUNeuroMorph",
    kicker: "IIT Madras · HTIC",
    year: "2026",
    featured: true,
    status: "In progress — paper in preparation, MICCAI 2026 workshop track",
    summary:
      "Sub-10 ms bone morphing during surgery, with no preoperative CT — the patient's femur and tibia reconstructed from points swept with a probe on the table.",
    role: "Research engineer — algorithm design, CUDA implementation, benchmarking",
    stack: ["CUDA", "Holoscan SDK", "PyTorch", "C++", "Neural SDF", "Python"],
    problem:
      "Total knee arthroplasty navigation normally begins with a preoperative CT. The patient is scanned, the bone is segmented, and the surgical plan is built against that model. The scan costs time, money, and radiation dose, and it fixes the plan to anatomy captured days before the incision. The alternative is to build the model in theatre, from points the surgeon sweeps across exposed bone — but that only works if the morphing is fast enough to feel instantaneous and accurate enough to plan a cut against. Those two requirements pull directly against each other, and the usual answer is to give up some of one.",
    approach: [
      "Represent the bone as a neural signed distance field — a multiresolution hash grid feeding a small MLP — so the surface is continuous and queryable at any resolution rather than frozen into a mesh at authoring time.",
      "Warp in field space using Gaussian radial basis functions rather than displacing vertices. The surface stays watertight under deformations large enough to break a mesh-based approach.",
      "Register the sparse probed points against the statistical model with Coherent Point Drift over hierarchical Gaussian mixtures, keeping the correspondence search well below the quadratic cost of the naive formulation.",
      "Schedule the entire path as a Holoscan SDK operator graph so the intraoperative loop never round-trips to the host — the data stays resident on the GPU from probe input to rendered surface.",
    ],
    results: [
      { value: "~7 ms", label: "GPU latency, full morph" },
      { value: "0.47 mm", label: "femur surface error" },
      { value: "0.33 mm", label: "tibia surface error" },
      { value: "zero", label: "preoperative CT scans required" },
    ],
    resultsNote:
      "Internal benchmarks measured on the lab rig. The work is ongoing and has not yet been peer-reviewed — figures are preliminary and will be restated when the paper lands.",
    outcome:
      "The result that mattered was not the accuracy number on its own, it was the accuracy number holding at seven milliseconds. Anything slower than a frame and the surgeon feels the system thinking; anything looser than half a millimetre and the plan is not worth building on. Removing the preoperative CT removes a scan, a wait, and a dose from the patient's path to surgery.",
    cover: {
      src: "",
      alt: "GPUNeuroMorph — neural signed distance field morphing a femur surface",
      spec: "1600×1000 · pipeline diagram or a render of the morphed femur/tibia surface",
    },
    gallery: [
      {
        src: "",
        alt: "GPUNeuroMorph system architecture diagram",
        caption: "The Holoscan operator graph — probe input to rendered surface without leaving the GPU.",
        spec: "1600×1000",
      },
      {
        src: "",
        alt: "Surface error heat map across the femur",
        caption: "Surface error distribution against the ground-truth donor geometry.",
        spec: "1600×1000",
      },
    ],
  },
  {
    slug: "bcpd-bone-synthesis",
    title: "BCPD++ Bone Synthesis",
    kicker: "IIT Madras · HTIC",
    year: "2026",
    featured: true,
    status: "Shipped — in use as a drop-in replacement",
    summary:
      "Retiring a thin-plate-spline pipeline from 1989 and proving the replacement, 89 tests deep — including one that checks the output is byte-identical every run.",
    role: "Research engineer — reformulation, implementation, validation, release",
    stack: ["C++", "Bayesian CPD", "Python", "NumPy", "CMake"],
    problem:
      "Bone synthesis at HTIC ran on thin-plate splines, a formulation published in 1989 and never revisited. TPS interpolates landmarks, but it has no notion of the body it is deforming — it treats the bone as a rubber sheet pinned at a handful of points. In practice it hit its landmarks only approximately and shrank the reconstructed bone by as much as 65% of donor volume. A geometry that wrong cannot carry a surgical plan, no matter how neatly it fits the landmarks it was given.",
    approach: [
      "Reformulated the whole stage as Bayesian Coherent Point Drift: probabilistic point-set registration with a motion-coherence prior, so the bone deforms like a body rather than like a sheet.",
      "Split it into two stages — nine anatomical landmarks drive a whole-bone estimate, then the probed surface refines that estimate where the surgeon actually has data.",
      "Released it as drop-in replacement executables behind the existing interface, so adoption required no changes to any calling code.",
      "Wrote 89 tests, including a byte-identical determinism test: same input, same bytes out, every run, every machine. In a pipeline that ends at a cut, reproducibility is a safety property rather than a convenience.",
    ],
    results: [
      { value: "1.8×10⁻¹³ mm", label: "landmark residual", against: "0.0467 mm under TPS" },
      { value: "2.7%", label: "volume deviation from donor", against: "65% shrinkage under TPS" },
      { value: "43%", label: "better surface morphing" },
      { value: "0.24 mm", label: "RMSE vs ~20,000 swept points", against: "0.5 mm accuracy gate" },
    ],
    resultsNote:
      "Validated against roughly 20,000 surface points swept by technicians on donor specimens, measured against the team's 0.5 mm accuracy gate.",
    outcome:
      "The landmark residual moving from 0.0467 mm to 1.8×10⁻¹³ mm is really a statement that the new formulation solves the constraint exactly instead of approximating it. The volume figure is the one that changed clinical confidence: a bone that keeps its donor volume to within 2.7% is a bone you can plan against.",
    cover: {
      src: "",
      alt: "BCPD++ — reconstructed bone geometry against donor ground truth",
      spec: "1600×1000 · side-by-side of TPS vs BCPD reconstruction, or the volume comparison chart",
    },
    gallery: [
      {
        src: "",
        alt: "TPS versus BCPD reconstruction compared against the donor bone",
        caption: "Same input landmarks. Left: thin-plate spline. Right: BCPD.",
        spec: "1600×1000",
      },
      {
        src: "",
        alt: "Test suite output showing the determinism check passing",
        caption: "89 tests, including the byte-identical determinism run.",
        spec: "1600×1000",
      },
    ],
  },
  {
    slug: "ecoecho",
    title: "EcoEcho",
    kicker: "Full-stack · Climate",
    year: "2025",
    featured: true,
    status: "Built for World Environment Day",
    summary:
      "A climate app that recommends native plants by retrieval over a vector index rather than by lookup table — so the advice tracks your actual coordinates and weather.",
    role: "Solo build — schema, RAG pipeline, auth, front end",
    stack: ["Next.js 15", "Supabase", "pgvector", "Clerk", "HuggingFace", "Open-Meteo"],
    problem:
      "Plant recommendation tools are almost always a hardcoded table keyed on a region name. That breaks the moment your conditions do not match the label on your region — the same district can hold a dozen microclimates, and a table has no way to say so. I wanted recommendations that reasoned from conditions rather than from a category.",
    approach: [
      "Embedded a native-species corpus with HuggingFace sentence embeddings and stored the vectors in Supabase using pgvector, so retrieval is a similarity query rather than a join on a region column.",
      "Pulled live conditions from Open-Meteo against the user's coordinates and folded them into the retrieval context, so the same location returns different guidance in different seasons.",
      "Put Clerk in front for auth and per-user history, and built the whole thing on the Next.js App Router with server components doing the data work.",
    ],
    results: [
      { value: "pgvector", label: "similarity search, not a lookup table" },
      { value: "live", label: "weather folded into every query" },
    ],
    outcome:
      "The interesting part was discovering how much of a 'RAG app' is actually corpus work. The retrieval quality tracked how carefully the species descriptions were written far more than it tracked the embedding model or the top-k.",
    links: [{ label: "GitHub", href: "https://github.com/Navyansgr" }],
    cover: {
      src: "",
      alt: "EcoEcho — native plant recommendations from live local conditions",
      spec: "1600×1000 · app screenshot, ideally the recommendation view",
    },
    gallery: [
      { src: "", alt: "EcoEcho recommendation results view", spec: "1600×1000" },
      { src: "", alt: "EcoEcho retrieval pipeline diagram", spec: "1600×1000" },
    ],
  },
  {
    slug: "ai-tutor",
    title: "AI Tutor",
    kicker: "Solo founder project",
    year: "2025",
    featured: true,
    status: "In development",
    summary:
      "A Socratic dialogue engine that will not give you the answer — grounded in a knowledge graph so it knows exactly what it is withholding and what to ask next.",
    role: "Solo founder — concept, knowledge graph design, engine, front end",
    stack: ["Next.js", "TypeScript", "Knowledge graph", "LLM orchestration"],
    problem:
      "An LLM asked to tutor will answer the question. That is what it is for, and it is precisely the wrong behaviour — the student gets a correct answer and no model of how to reach it. Prompting a model to 'be Socratic' produces the mannerisms of questioning without the substance, because the model has no representation of what the student does and does not yet hold.",
    approach: [
      "Modelled the subject as a knowledge graph of concepts and dependencies, so the engine can locate a student's answer on a map rather than judging it in isolation.",
      "Made the graph the source of the next question: given where the answer sits and which prerequisite it skipped, the next prompt targets that specific gap.",
      "Held the engine to withholding — it can confirm, narrow, and redirect, but the final step stays with the student.",
    ],
    outcome:
      "Building it made clear that the hard problem is not the dialogue, it is the representation. Once the graph knew what depended on what, good questions mostly fell out of it.",
    links: [{ label: "GitHub", href: "https://github.com/Navyansgr" }],
    cover: {
      src: "",
      alt: "AI Tutor — Socratic dialogue over a knowledge graph",
      spec: "1600×1000 · UI screenshot or a render of the concept graph",
    },
  },

  // ── Secondary work: listed on /work, no long case study ──────────────────
  {
    slug: "ai-rfid-navigation",
    title: "AI-RFID Navigation Assistant",
    kicker: "Assistive technology",
    year: "2025",
    featured: false,
    summary:
      "Indoor wayfinding for visually impaired users — RFID tags at points of interest and a portable reader that speaks location the moment it passes one.",
    role: "Hardware/software integration",
    stack: ["C++", "Python", "RFID"],
    links: [
      { label: "GitHub", href: "https://github.com/Navyansgr/AI-RFID-Navigation-Assistant" },
    ],
  },
  {
    slug: "ev-energy-recovery",
    title: "EV Energy Recovery",
    kicker: "Systems modelling",
    year: "2025",
    featured: false,
    summary:
      "Modelled a regeneration system pairing a 2.5 kW DC generator with an EV drivetrain to recover kinetic energy and extend range.",
    role: "Modelling and simulation",
    stack: ["Python"],
    links: [{ label: "GitHub", href: "https://github.com/Navyansgr/ev-efficiency-dc-generator" }],
  },
  {
    slug: "applied-ml-set",
    title: "Applied ML Project Set",
    kicker: "Oasis Infobyte",
    year: "2025",
    featured: false,
    summary:
      "Three models taken past the notebook: a 95%-accuracy spam classifier over NLP vectorisation, a car price regressor served from Flask, and a Random Forest housing pipeline behind a FastAPI endpoint.",
    role: "End-to-end — data, model, deployment",
    stack: ["scikit-learn", "pandas", "Flask", "FastAPI"],
    links: [{ label: "GitHub", href: "https://github.com/Navyansgr" }],
  },
  {
    slug: "petcare",
    title: "PetCare",
    kicker: "Web platform",
    year: "2024",
    featured: false,
    summary:
      "A responsive platform for pet owners — profiles, vaccination and health reminders, grooming and nutrition tracking. Shipped with a live demo.",
    role: "Front-end build",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "GitHub", href: "https://github.com/Navyansgr/your_first_kid" }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
