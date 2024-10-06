import { fullURL } from "@/lib/url-fns/full-url"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*"
    },
    sitemap: fullURL("/sitemap.xml").toString()
  }
}
