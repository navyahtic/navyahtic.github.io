export type Publication = {
  title: string;
  venue: string;
  publisher: string;
  date: string;
  authors: string[];
  /** Rendered in accent so her name is findable in a long author list. */
  authorHighlight: string;
  abstract: string;
  status: string;
  doi?: string;
  url?: string;
  /** Gallery id from scripts/gallery-manifest.mjs. */
  image?: string;
};

export const publications: Publication[] = [
  {
    title: "Athercare: Unified AI System for Health Intelligence in Real Time",
    venue:
      "6th International Conference on Smart Electronics and Communication (ICOSEC 2025), Kongunadu College of Engineering & Technology, Trichy",
    publisher: "IEEE",
    date: "September 2025",
    authors: [
      "Pandurang",
      "V Mareeswari",
      "Snigdha Kesh",
      "Navyashree N",
      "Nandana P T",
      "S M Siddalingaswamy",
    ],
    authorHighlight: "Navyashree N",
    abstract:
      "Quality healthcare access is a worldwide problem — disjointed systems, slow diagnostics, and dense medical documentation all sit between people and care. Athercare sets out a unified digital health ecosystem that simplifies and improves how that care is delivered.",
    status: "Published and presented — IEEE Xplore",
    url: "",
    image: "pub-athercare-ieee",
  },
  {
    title:
      "Predictive Maintenance of Industrial Equipment Using Temporal Graph Neural Networks: A Step Towards Novelty",
    venue: "International Journal of Advanced Trends in Engineering and Management (IJATEM)",
    publisher: "IJATEM — ISSN 2583-7052",
    date: "November 2024",
    authors: ["Navyashree N"],
    authorHighlight: "Navyashree N",
    abstract:
      "Industrial equipment fails on its own schedule, and fixed maintenance intervals either arrive too late or waste working parts. This paper models the plant as a temporal graph, letting failure prediction draw on how equipment relationships evolve rather than on each machine's history in isolation.",
    status: "Published — runner-up, paper presentation at ICRCCT 2K24",
    doi: "https://doi.org/10.59544/vagt5010/icrcct24p103",
    image: "pub-ijatem",
  },
];
