import { fullURL } from "@/lib/url-fns/full-url"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "daily",
      lastModified: new Date(),
      priority: 1,
      url: fullURL().toString()
    }
  ]
}
