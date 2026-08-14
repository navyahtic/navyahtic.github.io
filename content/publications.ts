import type { ImageSlot } from "./types";

export type Publication = {
  title: string;
  venue: string;
  publisher: string;
  year: string;
  authors: string[];
  /** Navyashree's position in the author list, for the byline emphasis. */
  authorHighlight: string;
  abstract: string;
  status: string;
  url?: string;
  image?: ImageSlot;
};

export const publications: Publication[] = [
  {
    title: "Athercare: Unified AI System for Health Intelligence in Real Time",
    venue: "6th International Conference, 2025",
    publisher: "IEEE",
    year: "2025",
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
      "Quality healthcare access is a worldwide issue — disjointed systems, slow diagnostics, and complex medical documentation all stand between people and care. Athercare proposes a unified digital health ecosystem that simplifies and improves how that care is delivered.",
    status: "Published — IEEE Xplore",
    url: "",
    image: {
      src: "",
      alt: "Athercare paper on IEEE Xplore",
      spec: "1600×900 · IEEE Xplore listing or a figure from the paper",
    },
  },
];
