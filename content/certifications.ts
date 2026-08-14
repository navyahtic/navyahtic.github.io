import type { Certification } from "./types";

/**
 * `credentialUrl` is the direct link to your badge — paste it in and the card
 * links straight to the credential. Until then the card links to the issuer's
 * official verification portal, which is honest and still clickable.
 */
export const certifications: Certification[] = [
  {
    name: "Oracle Certified Generative AI Professional",
    issuer: "Oracle",
    issued: "2025",
    credentialUrl: "",
    issuerUrl: "https://catalog-education.oracle.com/ords/certview/",
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations",
    issuer: "AWS Academy",
    issued: "Jun 2024",
    credentialUrl: "https://www.credly.com/go/5PvYp5nO",
    issuerUrl: "https://www.credly.com/organizations/amazon-web-services/badges",
  },
  {
    name: "AWS Academy — Cloud Security Foundations",
    issuer: "AWS Academy",
    issued: "2025",
    credentialUrl: "",
    issuerUrl: "https://www.credly.com/organizations/amazon-web-services/badges",
  },
  {
    name: "Automation Developer Associate",
    issuer: "UiPath",
    issued: "2025",
    credentialUrl: "",
    issuerUrl: "https://www.uipath.com/learning/certification",
  },
  {
    name: "Networking Basics",
    issuer: "Cisco Networking Academy",
    issued: "2024",
    credentialUrl: "",
    issuerUrl: "https://www.netacad.com/",
  },
  {
    name: "Software Engineering Job Simulation",
    issuer: "Accenture Nordics",
    issued: "2024",
    credentialUrl: "",
    issuerUrl: "https://www.theforage.com/",
  },
];
