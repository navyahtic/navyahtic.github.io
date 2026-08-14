/**
 * Generates the avatar and the project cover art for the site.
 *
 *   node build-assets.mjs
 *
 * Covers are drawn as SVG gradients and rasterised — no stock imagery, and
 * every project gets a distinct card even before real screenshots exist.
 * Drop a real screenshot into assets/images/ with the same filename to
 * replace any of them.
 */
import sharp from "sharp";
import fs from "node:fs/promises";

const OUT = "./assets/images";
const PORTRAIT = "O:/portfolio/public/images/portrait-plate.webp";

// vCard's palette: near-black cards, gold accent. Each cover gets its own
// hue so the portfolio grid reads as a set rather than a repeat.
const covers = [
  { file: "project-medtech.jpg", a: "#FFDB70", b: "#FF7A45", label: "MED" },
  { file: "project-ecoecho.jpg", a: "#6EE7A8", b: "#1E9E6A", label: "ECO" },
  { file: "project-aitutor.jpg", a: "#C78BFF", b: "#7B3FE4", label: "AI" },
  { file: "project-rfid.jpg", a: "#FFB4A2", b: "#E5566D", label: "RFID" },
  { file: "project-ev.jpg", a: "#A8E063", b: "#3F8E3F", label: "EV" },
  { file: "project-ml.jpg", a: "#FFD1A9", b: "#E07A3F", label: "ML" },
  { file: "project-petcare.jpg", a: "#9BD3FF", b: "#3B6FD4", label: "PET" },
];

const svg = ({ a, b, label }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.3" cy="0.25" r="0.75">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0 L0 0 0 60" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1.5"/>
    </pattern>
  </defs>
  <rect width="1200" height="900" fill="url(#g)"/>
  <rect width="1200" height="900" fill="url(#grid)"/>
  <rect width="1200" height="900" fill="url(#glow)"/>
  <circle cx="960" cy="700" r="300" fill="#ffffff" fill-opacity="0.10"/>
  <circle cx="200" cy="160" r="150" fill="#ffffff" fill-opacity="0.12"/>
  <text x="60" y="820" font-family="Poppins, Helvetica, Arial, sans-serif"
        font-size="150" font-weight="600" fill="#1a1a1a" fill-opacity="0.35"
        letter-spacing="-6">${label}</text>
</svg>`;

for (const cover of covers) {
  await sharp(Buffer.from(svg(cover)))
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${OUT}/${cover.file}`);
}

// Square avatar for the sidebar, cropped to the face.
await sharp(PORTRAIT)
  .resize(320, 320, { fit: "cover", position: "top" })
  .png()
  .toFile(`${OUT}/avatar.png`);

// Larger studio portrait, kept as a fallback.
await sharp(PORTRAIT)
  .resize(700, 875, { fit: "cover", position: "top" })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(`${OUT}/portrait.jpg`);

/* ── Event photography ──────────────────────────────────────
   Straight from O:/acheivementsnavya. `crop` is applied before the
   resize, for shots that arrive as phone screenshots with letterbox
   bars around the actual photo. */
const PHOTOS = "O:/acheivementsnavya";

const photos = [
  // Navyashree speaking at Google Cloud Agentic AI Day — the About portrait.
  { src: "aboutme.jpg", out: "about-photo.jpg", w: 900, h: 1150 },

  // Receiving Best Outgoing Student on stage at AMC.
  { src: "beststudent.jpg", out: "award-best-student.jpg", w: 1200, h: 900 },

  // The congratulations poster for the same award.
  { src: "1000210979.jpg", out: "award-best-student-poster.jpg", w: 1400, h: 850 },

  // Cardano Hackathon Asia grand finale. Arrived as a phone screenshot, so the
  // photo band is cut out first — detected at rows 846–1565 of 2412.
  {
    src: "1000095839.jpg",
    out: "vol-cardano.jpg",
    crop: { left: 0, top: 846, width: 1080, height: 719 },
    w: 1080,
    h: 719,
  },
];

for (const p of photos) {
  let img = sharp(`${PHOTOS}/${p.src}`).rotate();
  if (p.crop) img = img.extract(p.crop);
  await img
    .resize(p.w, p.h, { fit: "cover" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${OUT}/${p.out}`);
}
console.log(`${photos.length} event photos processed`);

/* ── Certificate scans ──────────────────────────────────────
   Documents, not photographs: fit inside the box so nothing is cropped,
   and keep enough resolution that the text stays readable when opened. */
const documents = [
  { src: "nmms.png", out: "gallery/award-nmms.webp" },
  { src: "oracle.png", out: "gallery/cert-oracle.webp" },

  // Cleaner scan than the earlier copy — overwrites it.
  { src: "network security.jpg", out: "gallery/cert-palo-network.webp" },

  // Departmental announcement of the SAP HackFest top-three teams.
  { src: "sap.jpg", out: "gallery/comp-sap-hackfest.webp" },

  // Selection email for Open Source Connect India.
  { src: "opensource.jpg", out: "gallery/vol-opensource.webp" },

  // "Meet our mentor" post from Girls Leading Tech. Screenshotted with the
  // LinkedIn chrome above it, so the graphic is cut out — the red banner
  // begins at row 118 of 786.
  {
    src: "mentor.png",
    out: "gallery/vol-mentor.webp",
    crop: { left: 0, top: 118, width: 560, height: 668 },
  },
];

for (const d of documents) {
  let img = sharp(`${PHOTOS}/${d.src}`).rotate();
  if (d.crop) img = img.extract(d.crop);
  await img
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(`${OUT}/${d.out}`);
}
console.log(`${documents.length} certificate scans processed`);

/* ── Social share card ──────────────────────────────────────
   1200×630 is what LinkedIn, WhatsApp, X and Slack all crop to. A portrait
   image gets mangled in that box, so the preview gets its own landscape
   card with the photo inset on the right. */
const shareCard = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFDB70"/>
      <stop offset="100%" stop-color="#FFBC60"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#1E1E1F"/>
  <rect width="1200" height="6" fill="url(#gold)"/>
  <circle cx="1150" cy="600" r="220" fill="#FFDB70" fill-opacity="0.05"/>

  <text x="70" y="150" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="24"
        font-weight="500" fill="#FFDB70" letter-spacing="4">RESEARCH ENGINEER</text>

  <text x="70" y="255" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="76"
        font-weight="600" fill="#FAFAFA">Navyashree N</text>

  <text x="70" y="320" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="27"
        fill="#D6D6D6">Medtech at IIT Madras HTIC · ML &amp; GPU systems</text>

  <rect x="70" y="392" width="360" height="2" fill="#383838"/>

  <text x="70" y="460" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="42"
        font-weight="600" fill="#FFDB70">2</text>
  <text x="70" y="495" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="19"
        fill="#9E9E9E">Papers published</text>

  <text x="250" y="460" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="42"
        font-weight="600" fill="#FFDB70">17</text>
  <text x="250" y="495" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="19"
        fill="#9E9E9E">Certifications</text>

  <text x="440" y="460" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="42"
        font-weight="600" fill="#FFDB70">9+</text>
  <text x="440" y="495" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="19"
        fill="#9E9E9E">CGPA</text>

  <text x="70" y="575" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="21"
        fill="#6E6E6E">navyahtic.github.io</text>
</svg>`;

const faceSize = 340;
const face = await sharp(PORTRAIT)
  .resize(faceSize, faceSize, { fit: "cover", position: "top" })
  .composite([
    {
      // Round the inset with an SVG mask rather than a CSS-style radius.
      input: Buffer.from(
        `<svg width="${faceSize}" height="${faceSize}"><rect width="${faceSize}" height="${faceSize}" rx="24" ry="24"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

await sharp(Buffer.from(shareCard))
  .composite([{ input: face, left: 790, top: 145 }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(`${OUT}/share-card.jpg`);

console.log("share-card.jpg (1200×630) written");

const files = await fs.readdir(OUT);
console.log(`${covers.length} covers + avatar + portrait written. ${files.length} files in ${OUT}`);
