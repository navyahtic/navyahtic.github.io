"use client";

import { useEffect, useState } from "react";

/** Tracks the OS reduced-motion setting live, not just on mount. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True only for devices with a precise pointer — gates the custom cursor and tilt. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = () => setFine(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}

/**
 * Cheap capability check for the WebGL hero. A phone with four cores and 2GB
 * should get the static render rather than a stuttering point cloud.
 */
export function useCanRunWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOk(false);
      return;
    }
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) {
      setOk(false);
      return;
    }
    if (nav.deviceMemory && nav.deviceMemory <= 4) {
      setOk(false);
      return;
    }
    try {
      const canvas = document.createElement("canvas");
      setOk(Boolean(canvas.getContext("webgl2")));
    } catch {
      setOk(false);
    }
  }, []);

  return ok;
}
