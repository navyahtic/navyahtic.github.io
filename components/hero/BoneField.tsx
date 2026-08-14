"use client";

import { useEffect, useRef } from "react";
import { useCanRunWebGL } from "@/lib/hooks";
import { boneCloud, sphereCloud, POINT_COUNT } from "@/lib/bone-cloud";

/**
 * The signature hero element: a point cloud that drifts between a femur form,
 * a tibia form, and a diffuse cloud — a nod to the morphing research without
 * pretending to be a scan of anything real. The geometry is generated
 * procedurally in lib/bone-cloud.ts.
 *
 * Raw WebGL2, no library: two float buffers, one draw call, one interpolation
 * in the vertex shader. Costs a few kilobytes rather than the ~600 a
 * three.js scene would.
 *
 * Degrades to a static CSS render on low-end devices and under
 * prefers-reduced-motion — see useCanRunWebGL.
 */

const VERT = `#version 300 es
precision highp float;

in vec3 aFemur;
in vec3 aTibia;
in vec3 aCloud;
in float aSeed;

uniform float uTime;
uniform float uMorph;    // 0 = femur, 1 = tibia
uniform float uDisperse; // 0 = bone, 1 = diffuse cloud
uniform vec2  uPointer;
uniform vec2  uViewport;

out float vDepth;
out float vSeed;

mat3 rotateY(float a) {
  float s = sin(a), c = cos(a);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}
mat3 rotateX(float a) {
  float s = sin(a), c = cos(a);
  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
}

void main() {
  // Smoothstep rather than linear: the shapes hold their read at each end
  // and do the travelling in the middle.
  vec3 bone = mix(aFemur, aTibia, smoothstep(0.0, 1.0, uMorph));
  vec3 pos  = mix(bone, aCloud, uDisperse);

  // Per-point breathing so the surface never looks frozen.
  float wobble = sin(uTime * 0.6 + aSeed * 6.283) * 0.012;
  pos += normalize(pos + 0.0001) * wobble;

  // The cursor turns the model; it does not fling it.
  mat3 rot = rotateY(uTime * 0.12 + uPointer.x * 0.5) * rotateX(uPointer.y * 0.28);
  pos = rot * pos;

  vDepth = pos.z;
  vSeed = aSeed;

  // Plain orthographic-ish projection with a gentle perspective divide.
  float persp = 1.0 / (2.6 - pos.z * 0.45);
  vec2 screen = pos.xy * persp;
  screen.x *= uViewport.y / uViewport.x;

  gl_Position = vec4(screen, 0.0, 1.0);
  gl_PointSize = mix(1.6, 3.4, smoothstep(-1.0, 1.0, pos.z)) * persp * 1.8;
}`;

const FRAG = `#version 300 es
precision highp float;

in float vDepth;
in float vSeed;
out vec4 outColor;

uniform float uAccent;

void main() {
  // Round points with a soft edge — square points read as noise.
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float d = dot(uv, uv);
  if (d > 1.0) discard;
  float alpha = (1.0 - d) * 0.85;

  // Dark points on a white page — the inverse of the usual point-cloud look.
  vec3 graphite = vec3(0.10, 0.10, 0.10);
  vec3 ember    = vec3(0.863, 0.267, 0.216);

  // A thin slice of points carries the accent; depth does the rest.
  float isAccent = step(0.93, fract(vSeed * 7.31));
  vec3 col = mix(graphite, ember, isAccent * uAccent);

  // Nearer points sit darker; far ones fade toward the page.
  float depthFade = smoothstep(-1.2, 1.0, vDepth);
  outColor = vec4(col, alpha * (0.06 + depthFade * 0.30));
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function BoneField() {
  const canRun = useCanRunWebGL();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canRun) return;
    const el = canvas.current;
    if (!el) return;

    const gl = el.getContext("webgl2", {
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // ── Geometry ──────────────────────────────────────────────
    const femur = boneCloud("femur");
    const tibia = boneCloud("tibia");
    const cloud = sphereCloud();
    const seeds = new Float32Array(POINT_COUNT);
    for (let i = 0; i < POINT_COUNT; i++) seeds[i] = Math.random();

    const bind = (name: string, data: Float32Array, size: number) => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, name);
      if (loc < 0) return;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    };

    bind("aFemur", femur, 3);
    bind("aTibia", tibia, 3);
    bind("aCloud", cloud, 3);
    bind("aSeed", seeds, 1);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uMorph = gl.getUniformLocation(program, "uMorph");
    const uDisperse = gl.getUniformLocation(program, "uDisperse");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uViewport = gl.getUniformLocation(program, "uViewport");
    const uAccent = gl.getUniformLocation(program, "uAccent");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // ── State ─────────────────────────────────────────────────
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let disperse = 1; // starts scattered and gathers into bone on load
    let running = true;
    let frame = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (el.width !== w * dpr || el.height !== h * dpr) {
        el.width = w * dpr;
        el.height = h * dpr;
        gl.viewport(0, 0, el.width, el.height);
      }
    };

    const onMove = (e: MouseEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const render = (now: number) => {
      if (!running) return;
      resize();

      const t = (now - start) / 1000;
      smoothX += (pointerX - smoothX) * 0.05;
      smoothY += (pointerY - smoothY) * 0.05;

      // Gather in over the first ~2s, then hold the bone form.
      disperse += ((t < 0.4 ? 1 : 0) - disperse) * 0.028;

      // Slow crossfade between the two bones, with a long hold at each end.
      const cycle = (Math.sin(t * 0.19) + 1) / 2;
      const morph = smoothstep(0.32, 0.68, cycle);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTime, t);
      gl.uniform1f(uMorph, morph);
      gl.uniform1f(uDisperse, disperse);
      gl.uniform2f(uPointer, smoothX, smoothY);
      gl.uniform2f(uViewport, el.width, el.height);
      gl.uniform1f(uAccent, 1);

      gl.drawArrays(gl.POINTS, 0, POINT_COUNT);
      frame = requestAnimationFrame(render);
    };

    // Stop the loop when the tab or the section is not visible — no point
    // burning a GPU on something nobody is looking at.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(render);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [canRun]);

  // Static fallback: a soft field that reads as the same object at rest.
  if (canRun === false) {
    return (
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.05),transparent_62%)]" />
        <div className="absolute top-1/2 left-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,68,55,0.08),transparent_68%)]" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ opacity: canRun ? 1 : 0, transition: "opacity 1.2s ease-out" }}
    />
  );
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
