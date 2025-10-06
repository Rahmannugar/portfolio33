import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/_next/", "/api/"],
      },
    ],
    sitemap: "https://rahmannugar.vercel.app/sitemap.xml",
  };
}
