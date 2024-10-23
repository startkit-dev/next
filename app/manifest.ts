import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#fff",
    description: siteConfig.description,
    display: "standalone",
    icons: [
      { sizes: "48x48", src: "/favicon.ico", type: "image/x-icon" },
      { sizes: "16x16", src: "/icon1.png", type: "image/png" },
      { sizes: "32x32", src: "/icon2.png", type: "image/png" },
      { sizes: "192x192", src: "/icon3.png", type: "image/png" },
      { sizes: "512x512", src: "/icon4.png", type: "image/png" }
    ],
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    start_url: "/"
  }
}
