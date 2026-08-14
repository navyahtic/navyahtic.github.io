import type { Award } from "./types";

/**
 * `issuer: ""` means the detail is not confirmed yet — the UI simply omits it
 * rather than showing a blank. Fill in the conference name for the paper award
 * when you have it.
 *
 * Every award has an image slot. Drop a photo or certificate scan in and the
 * gallery on /about picks it up automatically.
 */
export const awards: Award[] = [
  {
    title: "Best Presented Paper Award",
    detail: "For research presented at an international conference.",
    year: "2025",
    issuer: "", // ← conference name goes here
    image: {
      src: "",
      alt: "Receiving the Best Presented Paper Award",
      caption: "Best Presented Paper Award",
      spec: "1200×900 · landscape, photo from the presentation or the certificate",
    },
  },
  {
    title: "SHEfi Scholar",
    detail: "Selected for the 2025 SHEfi scholar cohort.",
    year: "2025",
    image: {
      src: "",
      alt: "SHEfi Scholar 2025",
      caption: "SHEfi Scholar 2025",
      spec: "1200×900",
    },
  },
  {
    title: "Aspire Awardee",
    detail: "Recognised in the 2025 Aspire awards.",
    year: "2025",
    image: {
      src: "",
      alt: "Aspire Awardee 2025",
      caption: "Aspire Awardee 2025",
      spec: "1200×900",
    },
  },
  {
    title: "Top 10 — five times over",
    detail: "Finalist placings across three ideathons and two hackathons.",
    year: "2024—2025",
    image: {
      src: "",
      alt: "Hackathon finalist team photo",
      caption: "Hackathon and ideathon finals",
      spec: "1200×900",
    },
  },
  {
    title: "GSSoC '25 Contributor",
    detail: "Open-source contributor through GirlScript Summer of Code.",
    year: "2025",
    image: {
      src: "",
      alt: "GSSoC 2025 contributor",
      caption: "GSSoC '25",
      spec: "1200×900",
    },
  },
  {
    title: "Guinness World Record 2025",
    detail: "Participant in a 2025 Guinness World Record attempt.",
    year: "2025",
    image: {
      src: "",
      alt: "Guinness World Record 2025 participation",
      caption: "Guinness World Record 2025",
      spec: "1200×900",
    },
  },
];
