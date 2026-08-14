import type { Award } from "./types";

/**
 * Every claim here is backed by a certificate in the source folder, except
 * where `issuer` is left empty — those are still awaiting the exact detail.
 *
 * `image` is a gallery id from scripts/gallery-manifest.mjs.
 */
export const awards: Award[] = [
  {
    title: "Runner-Up — Paper Presentation",
    detail:
      "Second place at ICRCCT 2K24 for the temporal graph neural network work on predictive maintenance, with the ADVAYA trophy.",
    year: "2024",
    issuer: "International Conference on Recent Trends in Computing and Communication Technologies, Sri Sairam College of Engineering",
    image: "award-icrcct-stage",
  },
  {
    title: "Young Turks 2025 — Certificate of Merit",
    detail: "96.32nd percentile in India's largest campus skill contest.",
    year: "2025",
    issuer: "Naukri Campus",
    image: "comp-young-turks",
  },
  {
    title: "Aspire Leaders Program",
    detail:
      "Selected for the 2025 cohort of the Aspire Institute's leadership programme, founded by Harvard Business School faculty. Forty hours of coursework.",
    year: "2025",
    issuer: "Aspire Institute",
    image: "cert-aspire",
  },
  {
    title: "SHEfi Scholar",
    detail: "Selected for the 2025 SHEfi scholar cohort.",
    year: "2025",
  },
  {
    title: "SAP HackFest — Top 3",
    detail: "Led Team Hackovators to a top-three placing in round one.",
    year: "2025",
    issuer: "SAP · AMC Engineering College",
  },
  {
    title: "GSSoC '25 Contributor",
    detail: "Open-source contributor through GirlScript Summer of Code.",
    year: "2025",
  },
  {
    title: "Guinness World Record 2025",
    detail: "Participant in a 2025 Guinness World Record attempt.",
    year: "2025",
  },
];
