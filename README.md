# Navyashree N — Portfolio

Live at **https://navyahtic.github.io**

Next.js 15 App Router, TypeScript, Tailwind v4, Lenis smooth scroll, raw WebGL2 for the hero.
Exported as static HTML and hosted free on GitHub Pages — no server, no bill, no cold starts.

---

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploying

Push to `main`. A GitHub Action builds the site and publishes it — nothing else to run.

```bash
git add -A
git commit -m "Update projects"
git push
```

The deploy takes about two minutes. Watch it under the repo's **Actions** tab.

---

## Where to edit content

**All copy lives in `/content`. You never need to touch a component to change what the site says.**

| File | What it controls |
| --- | --- |
| `content/profile.ts` | Name, role, email, the hero statement, the /about bio, social links, site URL |
| `content/projects.ts` | Every project — case studies and the shorter list |
| `content/publications.ts` | Papers |
| `content/experience.ts` | Job history and community roles |
| `content/certifications.ts` | Certifications, with verification links |
| `content/activities.ts` | Competitions, volunteering, workshops |
| `content/awards.ts` | Awards and honours |
| `content/education.ts` | Education and the skills lists |

### Common edits

**Add a project.** Append to the array in `content/projects.ts`. Set `featured: true` to give it a
full case study at `/work/<slug>` and a card on the home page; `featured: false` puts it in the
shorter list on `/work`. Featured projects want `problem`, `approach`, `results`, and `outcome`.

**Add a certification.** Append to `content/certifications.ts`. Paste the real badge URL into
`credentialUrl` and the card links straight to it; leave it as `""` and the card falls back to the
issuer's verification portal instead.

**Fix the hero sentence.** `profile.statement` in `content/profile.ts`.

---

## Where to put images

### Certificates and event photos

1. Drop the file into `O:\acheivementsnavya` (or wherever you keep them — set `SOURCE_DIR` in
   `scripts/gallery-manifest.mjs`).
2. Add a line to the `manifest` array in `scripts/gallery-manifest.mjs`:
   ```js
   { id: "award-something", file: "my-photo.jpg", kind: "photo" },
   ```
   Use `kind: "document"` for certificates (keeps text legible), `"photo"` for photographs.
3. Reference that `id` from a content file — `image: "award-something"`.
4. Run `npm run gallery`.

That resizes it, converts to WebP, generates a blur placeholder, and rewrites
`lib/gallery-data.ts`. Commit the generated files in `public/images/gallery/` along with your change.

**To swap an image:** change the `file` for that `id` in the manifest and re-run `npm run gallery`.
Nothing else changes.

**Any `image:` id with no processed file** renders a quiet "Awaiting image" frame at the right size —
so half-filled sections still look deliberate.

### The portraits

`scripts/build-images.mjs` derives both portraits from one source headshot. To change the photo:

```bash
PORTRAIT_SRC="C:/path/to/new-photo.png" npm run images
```

It expects a shot on a plain white background — it flood-fills the background from the borders,
feathers the edge, and emits a transparent cutout for the hero plus a bone-grounded plate for
`/about`. If your new photo has a busy background, cut it out first and the script will pass it
through unharmed.

### Placeholder image slots in case studies

Case studies have `cover` and `gallery` slots in `content/projects.ts` with `src: ""`. Each one
renders a labelled placeholder showing the exact dimensions to supply. Save a file into
`public/images/`, set `src: "/images/your-file.jpg"`, done.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Static export into `out/` |
| `npm run images` | Rebuild the two portraits from the source headshot |
| `npm run gallery` | Process certificates and photos from the manifest |
| `npm run assets` | Both of the above |

---

## Design notes

**Type.** Fraunces variable for display, Inter for body, JetBrains Mono for labels and metrics.
The scale is fluid — every size is a `clamp()`, so 360px and 2560px are both deliberate rather than
one being a squeezed version of the other. Tokens live at the top of `app/globals.css`.

**Colour.** Near-black ground (`#0a0a0b`), bone type (`#f2efe8`), one accent — ember
(`#ff5a26`). The accent marks state and emphasis only. If it shows up twice in one viewport,
one of them is probably wrong.

**Motion.** Everything animates transform and opacity only; nothing touches a property that
triggers layout. Section reveals use IntersectionObserver, never scroll listeners. The scroll
progress bar uses a scroll-driven CSS animation where supported, so it runs off the main thread
entirely.

**The hero animation** (`components/hero/BoneField.tsx`) is a 12,000-point cloud that morphs
between femur and tibia forms — a nod to the bone-morphing research. Raw WebGL2 with two shaders
and one draw call; the geometry is generated procedurally in `lib/bone-cloud.ts` and is not derived
from any patient or donor data. It stops rendering when the tab or section is out of view, and
degrades to a static gradient on low-core, low-memory devices.

**Reduced motion.** `prefers-reduced-motion: reduce` disables Lenis entirely (hijacking scroll is
the worst thing you can do to someone who asked for less motion), skips the WebGL hero, and lands
every reveal in its final state.

---

## Still to fill in

- **Credential URLs.** Most certifications link to the issuer's verification portal rather than a
  direct badge. Paste real URLs into `credentialUrl` in `content/certifications.ts` as you collect
  them. AWS ×2 and Coursera already have direct links.
- **The IEEE paper link.** `content/publications.ts` → `url` on the Athercare entry, once you have
  the IEEE Xplore URL.
- **Case study images.** All four case studies have empty cover and gallery slots.
- **Live URLs** for EcoEcho and AI Tutor in `content/projects.ts` → `links`.
