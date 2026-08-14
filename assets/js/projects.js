'use strict';

/**
 * Case-study modal for the Portfolio tab.
 *
 * The project grid in index.html carries `data-project-open="<key>"`; the full
 * write-up for each key lives in the PROJECTS object below. To edit a case
 * study you only touch this file — the markup is generated from the data.
 */

const PROJECTS = {
  medtech: {
    kicker: 'Research · IIT Madras HTIC · 2026',
    title: 'Medical Imaging R&D',
    image: './assets/images/project-medtech.jpg',
    stack: ['CUDA', 'C++', 'Python', 'PyTorch', 'Holoscan SDK', 'CMake'],
    role: 'Research engineer — algorithm work, GPU implementation, validation',
    problem:
      'Surgical navigation software sits in an unforgiving place. It has to be accurate to within a fraction of a millimetre, it has to finish inside a single frame so the surgeon never feels the system thinking, and it has to give the same answer every single time it runs. Research code is rarely written to any of those three standards at once, and the gap between a promising result and something a theatre can rely on is most of the work.',
    approach: [
      'Build and maintain the GPU components of the imaging pipeline, keeping the real-time path resident on the device rather than round-tripping to the host.',
      'Replace legacy numerical methods with better-founded modern formulations, released behind the existing interfaces so the surgical software adopts them without a single call-site change.',
      'Hold numerical work to a test suite rather than a demo — including determinism checks that assert the output is byte-identical run to run, because in a pipeline that ends at a cut reproducibility is a safety property, not a convenience.',
      'Validate against large sets of physically measured surface points instead of synthetic data, and report against the accuracy gate the clinical team set.',
    ],
    metrics: [
      { value: 'Sub-frame', label: 'Real-time GPU latency' },
      { value: 'Sub-millimetre', label: 'Reconstruction accuracy' },
      { value: '89', label: 'Tests, incl. byte-identical determinism' },
      { value: '~20,000', label: 'Measured points validated against' },
    ],
    note: 'Ongoing work at IIT Madras HTIC. Specific figures are internal and pending publication, so they are described qualitatively here.',
    outcome:
      'The lesson that generalises beyond medical imaging: on systems where being approximately right is not good enough, the tests are the product. Anyone can produce a good number once — the engineering is in producing the same number forever.',
  },

  ecoecho: {
    kicker: 'Full stack · Climate · 2025',
    title: 'EcoEcho',
    image: './assets/images/project-ecoecho.jpg',
    stack: ['Next.js 15', 'Supabase', 'pgvector', 'Clerk', 'HuggingFace', 'Open-Meteo'],
    role: 'Solo build — schema, RAG pipeline, auth, front end',
    problem:
      'Plant recommendation tools are almost always a hardcoded table keyed on a region name. That breaks the moment your conditions do not match the label on your region — the same district can hold a dozen microclimates, and a table has no way to say so. I wanted recommendations that reasoned from conditions rather than from a category.',
    approach: [
      'Embedded a native-species corpus with HuggingFace sentence embeddings and stored the vectors in Supabase using pgvector, so retrieval is a similarity query rather than a join on a region column.',
      'Pulled live conditions from Open-Meteo against the user’s coordinates and folded them into the retrieval context, so the same location returns different guidance in different seasons.',
      'Put Clerk in front for auth and per-user history, and built the whole thing on the Next.js App Router with server components doing the data work.',
    ],
    metrics: [
      { value: 'pgvector', label: 'Similarity search, not a lookup table' },
      { value: 'Live', label: 'Weather folded into every query' },
    ],
    outcome:
      'The interesting part was discovering how much of a "RAG app" is actually corpus work. Retrieval quality tracked how carefully the species descriptions were written far more than it tracked the embedding model or the top-k.',
    links: [{ label: 'GitHub', href: 'https://github.com/Navyansgr' }],
  },

  aitutor: {
    kicker: 'Machine learning · Solo founder · 2025',
    title: 'AI Tutor',
    image: './assets/images/project-aitutor.jpg',
    stack: ['Next.js', 'TypeScript', 'Knowledge graph', 'LLM orchestration'],
    role: 'Solo founder — concept, knowledge graph design, engine, front end',
    problem:
      'An LLM asked to tutor will answer the question. That is what it is for, and it is precisely the wrong behaviour — the student gets a correct answer and no model of how to reach it. Prompting a model to "be Socratic" produces the mannerisms of questioning without the substance, because the model has no representation of what the student does and does not yet hold.',
    approach: [
      'Modelled the subject as a knowledge graph of concepts and dependencies, so the engine can locate a student’s answer on a map rather than judging it in isolation.',
      'Made the graph the source of the next question: given where the answer sits and which prerequisite it skipped, the next prompt targets that specific gap.',
      'Held the engine to withholding — it can confirm, narrow and redirect, but the final step stays with the student.',
    ],
    outcome:
      'Building it made clear that the hard problem is not the dialogue, it is the representation. Once the graph knew what depended on what, good questions mostly fell out of it.',
    links: [{ label: 'GitHub', href: 'https://github.com/Navyansgr' }],
  },

  appliedml: {
    kicker: 'Machine learning · Oasis Infobyte · 2025',
    title: 'Applied ML Project Set',
    image: './assets/images/project-ml.jpg',
    stack: ['scikit-learn', 'pandas', 'NumPy', 'Flask', 'FastAPI', 'Jupyter'],
    role: 'End to end — data, model, deployment',
    problem:
      'Most internship ML work stops at a notebook with a good validation score. A model nobody can call is a model nobody uses, so I took every one of these past the notebook and put an API in front of it.',
    approach: [
      'Email spam detector: NLP text vectorisation feeding a logistic regression classifier, reaching 95% accuracy.',
      'Car price prediction: exploratory analysis, then a regression model served through a Flask web app.',
      'End-to-end housing pipeline: a Random Forest regressor with preprocessing baked into the pipeline, deployed as a REST API on FastAPI.',
    ],
    metrics: [
      { value: '95%', label: 'Spam classification accuracy' },
      { value: '3', label: 'Models served behind real APIs' },
    ],
    outcome:
      'Doing three of these back to back is what made deployment feel routine rather than like a separate project at the end.',
    links: [{ label: 'GitHub', href: 'https://github.com/Navyansgr' }],
  },

  rfid: {
    kicker: 'Research · Assistive technology · 2025',
    title: 'AI-RFID Navigation Assistant',
    image: './assets/images/project-rfid.jpg',
    stack: ['C++', 'Python', 'RFID'],
    role: 'Hardware and software integration',
    problem:
      'Indoor wayfinding for visually impaired people mostly does not work: GPS loses accuracy indoors, and audio guidance that depends on a phone camera asks a lot of the user in an unfamiliar building.',
    approach: [
      'Placed passive RFID tags at points of interest — entrances, stairwells, counters, exits.',
      'Built a portable reader that a user carries, which fires a real-time location-based audio alert the moment it passes a tag.',
      'Kept the device standalone: no network dependency, nothing to pair, nothing to aim.',
    ],
    outcome:
      'The design principle that held up was that the user should not have to do anything. Walking past a tag is the whole interaction.',
    links: [
      { label: 'GitHub', href: 'https://github.com/Navyansgr/AI-RFID-Navigation-Assistant' },
    ],
  },

  ev: {
    kicker: 'Research · Systems modelling · 2025',
    title: 'EV Energy Recovery',
    image: './assets/images/project-ev.jpg',
    stack: ['Python', 'Systems modelling'],
    role: 'Modelling and simulation',
    problem:
      'Electric vehicles throw away kinetic energy every time they slow down. Regenerative braking recovers some of it, but there is more available across a normal drive cycle than braking alone captures.',
    approach: [
      'Modelled a 2.5 kW DC generator coupled to the drivetrain through a 5:1 gear ratio.',
      'Simulated energy recovery across a drive cycle to estimate the range gain against the extra load the generator itself imposes.',
    ],
    metrics: [
      { value: '15%', label: 'Modelled efficiency improvement' },
      { value: '250 → 370 km', label: 'Modelled range per charge' },
    ],
    note: 'Simulation results from the coursework model, not measured on a physical vehicle.',
    outcome:
      'The useful lesson was in the counter-force: any recovery system you bolt on is also a load, and the model is only honest once you charge yourself for it.',
    links: [{ label: 'GitHub', href: 'https://github.com/Navyansgr/ev-efficiency-dc-generator' }],
  },

  petcare: {
    kicker: 'Full stack · 2024',
    title: 'PetCare',
    image: './assets/images/project-petcare.jpg',
    stack: ['HTML', 'CSS', 'JavaScript'],
    role: 'Front-end build',
    problem:
      'Pet owners track vaccinations, grooming and feeding across a mix of paper, memory and text messages — and the thing most often forgotten is the one with a deadline attached.',
    approach: [
      'Built profiles per pet, with health and vaccination reminders attached to each one.',
      'Added grooming and nutrition tracking so the routine lives in one place.',
      'Made the whole thing responsive and shipped it with a live demo.',
    ],
    outcome:
      'My first properly finished front-end product — the point where I learned that shipping and deploying is a skill of its own, separate from building.',
    links: [{ label: 'GitHub', href: 'https://github.com/Navyansgr/your_first_kid' }],
  },
};

(function () {
  const container = document.querySelector('[data-project-modal-container]');
  if (!container) return;

  const overlay = container.querySelector('[data-project-overlay]');
  const closeBtn = container.querySelector('[data-project-close]');
  const imgEl = container.querySelector('[data-project-img]');
  const kickerEl = container.querySelector('[data-project-kicker]');
  const titleEl = container.querySelector('[data-project-title]');
  const stackEl = container.querySelector('[data-project-stack]');
  const contentEl = container.querySelector('[data-project-content]');

  let lastFocused = null;

  /** Escapes anything that lands in innerHTML, so copy edits can never break the page. */
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );

  function render(project) {
    imgEl.src = project.image;
    imgEl.alt = project.title;
    kickerEl.textContent = project.kicker;
    titleEl.textContent = project.title;

    stackEl.innerHTML = project.stack.map((t) => `<li>${esc(t)}</li>`).join('');

    const parts = [];

    parts.push(`<h4>My role</h4><p>${esc(project.role)}</p>`);
    parts.push(`<h4>The problem</h4><p>${esc(project.problem)}</p>`);

    if (project.approach) {
      parts.push(
        `<h4>Approach</h4><ol>${project.approach.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`,
      );
    }

    if (project.metrics) {
      parts.push(
        `<h4>Results</h4><ul class="modal-metrics">${project.metrics
          .map(
            (m) =>
              `<li><span class="modal-metric-value">${esc(m.value)}</span>` +
              `<span class="modal-metric-label">${esc(m.label)}</span>` +
              (m.against ? `<span class="modal-metric-against">${esc(m.against)}</span>` : '') +
              `</li>`,
          )
          .join('')}</ul>`,
      );
    }

    if (project.note) parts.push(`<p class="modal-note">${esc(project.note)}</p>`);
    if (project.outcome) parts.push(`<h4>What it came to</h4><p>${esc(project.outcome)}</p>`);

    if (project.links) {
      parts.push(
        `<div class="modal-links">${project.links
          .map(
            (l) =>
              `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`,
          )
          .join('')}</div>`,
      );
    }

    contentEl.innerHTML = parts.join('');
  }

  function open(key, trigger) {
    const project = PROJECTS[key];
    if (!project) return;
    lastFocused = trigger;
    render(project);
    container.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    container.classList.remove('active');
    document.body.style.overflow = '';
    container.querySelector('.project-modal').scrollTop = 0;
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-project-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open(el.dataset.projectOpen, el);
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('active')) close();
  });
})();
