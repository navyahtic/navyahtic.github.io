/**
 * Procedural point clouds for the hero animation.
 *
 * These are stylised long-bone forms — a shaft that flares into condyles at
 * one end and a plateau at the other — not scans and not derived from any
 * patient or donor data. They exist to gesture at the research, so they are
 * built to read as bone at a glance and nothing more.
 *
 * Everything is generated at module load: ~12k points across three buffers is
 * about 430 KB of Float32Array, cheaper than shipping any mesh file and it
 * lets the shader interpolate index-to-index without a correspondence step.
 */

export const POINT_COUNT = 12000;

type Bone = "femur" | "tibia";

/** Deterministic PRNG so the cloud is identical every load. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Radius profile along the bone's long axis.
 * `t` runs 0 (distal) to 1 (proximal).
 */
function profile(bone: Bone, t: number): { radius: number; offsetX: number } {
  if (bone === "femur") {
    // Distal end: the condyles — two lobes, so it is widest right at the base.
    if (t < 0.18) {
      const k = t / 0.18;
      return { radius: 0.34 - k * 0.14, offsetX: 0 };
    }
    // Shaft: long, slightly bowed, narrowest around the midpoint.
    if (t < 0.78) {
      const k = (t - 0.18) / 0.6;
      const waist = 0.2 - Math.sin(k * Math.PI) * 0.055;
      return { radius: waist, offsetX: Math.sin(k * Math.PI) * 0.06 };
    }
    // Proximal end: neck angling off toward the head.
    const k = (t - 0.78) / 0.22;
    return { radius: 0.17 + k * 0.1, offsetX: 0.06 + k * 0.2 };
  }

  // Tibia: broad plateau at the top, triangular shaft, narrow at the ankle.
  if (t < 0.16) {
    const k = t / 0.16;
    return { radius: 0.15 + k * 0.03, offsetX: 0 };
  }
  if (t < 0.82) {
    const k = (t - 0.16) / 0.66;
    return { radius: 0.18 + k * 0.05, offsetX: -Math.sin(k * Math.PI) * 0.03 };
  }
  const k = (t - 0.82) / 0.18;
  return { radius: 0.23 + k * 0.11, offsetX: 0 };
}

/**
 * Builds a point cloud shaped like a long bone, oriented along Y.
 * Points sit on the surface with a little inward scatter so the cloud has
 * some body to it rather than reading as a hollow shell.
 */
export function boneCloud(bone: Bone): Float32Array {
  const out = new Float32Array(POINT_COUNT * 3);
  const rand = rng(bone === "femur" ? 0x5eed : 0xb04e);

  for (let i = 0; i < POINT_COUNT; i++) {
    const t = rand();
    const theta = rand() * Math.PI * 2;
    const { radius, offsetX } = profile(bone, t);

    // Cross-section is an ellipse, not a circle — bones are not dowels.
    let rx = radius;
    let rz = radius * 0.72;

    // The condyles and plateau get a two-lobe cross-section.
    const isEnd = bone === "femur" ? t < 0.16 : t > 0.84;
    if (isEnd) {
      const lobe = 1 + Math.abs(Math.cos(theta)) * 0.45;
      rx *= lobe;
      rz *= 1.15;
    }

    // Pull a fraction of points inward to suggest volume.
    const shell = 0.72 + rand() * 0.28;

    const x = Math.cos(theta) * rx * shell + offsetX;
    const z = Math.sin(theta) * rz * shell;
    const y = (t - 0.5) * 1.85;

    // Surface roughness — real bone is not a lathe part.
    const j = 0.012;
    out[i * 3] = x + (rand() - 0.5) * j;
    out[i * 3 + 1] = y + (rand() - 0.5) * j;
    out[i * 3 + 2] = z + (rand() - 0.5) * j;
  }

  return out;
}

/** The dispersed state points gather from on load. */
export function sphereCloud(): Float32Array {
  const out = new Float32Array(POINT_COUNT * 3);
  const rand = rng(0xc10d);

  for (let i = 0; i < POINT_COUNT; i++) {
    // Even distribution over a sphere, then pushed out to a shell.
    const u = rand() * 2 - 1;
    const theta = rand() * Math.PI * 2;
    const r = Math.cbrt(rand()) * 0.55 + 0.85;
    const s = Math.sqrt(1 - u * u);

    out[i * 3] = s * Math.cos(theta) * r;
    out[i * 3 + 1] = u * r * 1.25;
    out[i * 3 + 2] = s * Math.sin(theta) * r;
  }

  return out;
}
