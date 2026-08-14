import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

// Required for `output: export` — the file is emitted at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}
