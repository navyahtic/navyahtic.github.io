import type { Education, SkillGroup } from "./types";

export const education: Education[] = [
  {
    qualification: "Bachelor of Engineering — Computer Science",
    institution: "AMC Engineering College",
    affiliation: "Visvesvaraya Technological University",
    location: "Bengaluru",
    period: "Dec 2022 — May 2026",
    result: "CGPA 9+ / 10",
  },
  {
    qualification: "Pre-University — PCMB",
    institution: "Girls Independent PU College, Sagara",
    period: "Nov 2020 — Nov 2022",
  },
  {
    qualification: "SSLC",
    institution: "Government High School, Maruthipura",
    period: "2020",
  },
];

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Python", "C++", "Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    group: "GPU & Systems",
    items: ["CUDA", "Holoscan SDK", "Real-time pipelines", "Numerical validation", "CMake"],
  },
  {
    group: "Machine Learning",
    items: [
      "PyTorch",
      "scikit-learn",
      "Neural signed distance fields",
      "Point-set registration",
      "NLP",
      "Embeddings & RAG",
    ],
  },
  {
    group: "Backend & Data",
    items: ["FastAPI", "Flask", "REST APIs", "Supabase", "pgvector", "MySQL", "SQLite"],
  },
  {
    group: "Web",
    items: ["Next.js", "React", "Tailwind CSS", "HTML & CSS"],
  },
  {
    group: "Cloud & Tooling",
    items: ["AWS", "Git & GitHub", "Jupyter", "UiPath", "Agile"],
  },
];
