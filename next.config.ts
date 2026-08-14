import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export — the whole site is HTML, CSS, JS and images on disk, which
   * is what lets it run free forever on GitHub Pages with no server.
   *
   * The trade-off is that next/image cannot resize on request, so every asset
   * is pre-sized by scripts/build-images.mjs instead. See README.
   */
  output: "export",
  images: { unoptimized: true },

  // GitHub Pages serves /about as /about/index.html.
  trailingSlash: true,
};

export default nextConfig;
