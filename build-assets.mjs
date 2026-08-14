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
];

for (const d of documents) {
  await sharp(`${PHOTOS}/${d.src}`)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(`${OUT}/${d.out}`);
}
console.log(`${documents.length} certificate scans processed`);

const files = await fs.readdir(OUT);
console.log(`${covers.length} covers + avatar + portrait written. ${files.length} files in ${OUT}`);
