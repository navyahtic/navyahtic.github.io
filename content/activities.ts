import type { Activity } from "./types";

/** Competitive events — hackathons, ideathons, national skill contests. */
export const competitions: Activity[] = [
  {
    title: "SAP HackFest 2025",
    org: "AMC Engineering College · SAP",
    date: "May 2025",
    detail:
      "Led Team Hackovators to a top-three finish in round one, placed first among the winning teams announced by the department.",
    highlight: "Top 3 — team lead",
  },
  {
    title: "Young Turks 2025",
    org: "Naukri Campus",
    date: "Sep 2025",
    detail:
      "India's largest skill contest, run with Amgen, Infosys BPM, Godrej, Hitachi, FactSet and others.",
    highlight: "96.32nd percentile",
    credentialId: "68d9aed0fac35327673dfe02",
    image: "comp-young-turks",
  },
  {
    title: "COLOSSUS 2.0",
    org: "Dr. Ambedkar Institute of Technology, Bengaluru",
    date: "Apr 2025",
    detail: "Twenty-four hour national-level hackathon.",
    highlight: "National level",
    image: "comp-colossus",
  },
  {
    title: "Smart India Hackathon 2025",
    org: "Ministry of Education Innovation Cell · AMCEC",
    date: "Sep 2025",
    detail: "Internal round of the national Smart India Hackathon.",
    image: "comp-sih",
  },
  {
    title: "CypherQuest",
    org: "Dayananda Sagar Academy of Technology and Management",
    date: "Jul 2024",
    detail: "Twenty-four hour hackathon run by the AI & ML department.",
    image: "comp-cypherquest",
  },
  {
    title: "AINCAT 2025",
    org: "Naukri Campus",
    date: "May 2025",
    detail: "All India Naukri Campus Aptitude Test — India's largest career aptitude assessment.",
    credentialId: "683a2639892c1f3133ab3f80",
    image: "comp-aincat",
  },
];

/** Volunteering and community organising. */
export const volunteering: Activity[] = [
  {
    title: "Google Cloud Agentic AI Day 2025",
    org: "Google Cloud · Hack2skill",
    date: "2025",
    detail:
      "Volunteered across a thirty-hour in-person build challenge, keeping operations running for participants on the floor.",
    highlight: "30-hour event",
    credentialId: "2025H2S06AID-V00071",
    image: "vol-agentic-ai-day",
  },
  {
    title: "HACKZION V.2",
    org: "AMC Engineering College — Department of CSE",
    date: "Feb 2025",
    detail:
      "Recognised for exceptional contribution as a volunteer on a national-level hackathon.",
    highlight: "National level",
    image: "vol-hackzion",
  },
  {
    title: "Basavanagudi Kadalekayi Parishe 2025",
    org: "Zero Waste Collective · Rotary Bangalore Midtown",
    date: "2025",
    detail:
      "Volunteered on waste management for one of Bengaluru's largest heritage fairs, alongside the Greater Bengaluru Authority.",
    image: "vol-parishe",
  },
  {
    title: "Open Source Connect India",
    org: "Open Source Connect India",
    date: "2025",
    detail:
      "Selected as a contributor to one of the country's largest collaborative open-source initiatives.",
    highlight: "Selected contributor",
  },
];

/** Short-form training — workshops, webinars, and skills sessions. */
export const workshops: Activity[] = [
  {
    title: "Git Version Control System",
    org: "MAGNUZ GNU/Linux Users Group · Free Software Movement Karnataka",
    date: "Feb 2024",
    detail:
      "Hands-on workshop run with FSMK — where version control stopped being a set of commands and started being a way of working.",
    image: "wk-git",
  },
  {
    title: "Future of Tech: AI & LLMs",
    org: "Capx",
    date: "May 2024",
    detail: "Technical webinar on the direction of large language models.",
    image: "wk-capx-llm",
  },
  {
    title: "AutoCAD 2D",
    org: "Learn Delta",
    date: "Feb 2024",
    detail: "Workshop with a graded final examination.",
    highlight: "Grade A",
    image: "wk-autocad",
  },
  {
    title: "Human Resource Skills",
    org: "Tareeqa Global Solution",
    date: "Jan 2024",
    detail: "Short workshop on how hiring and people functions actually operate.",
    image: "wk-tareeqa-hr",
  },
];
