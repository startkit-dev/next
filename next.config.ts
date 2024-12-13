import createMDX from "@next/mdx"

import type { NextConfig } from "next"
import "./env/client"
import "./env/server"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // @see {@link https://nextjs.org/docs/app/building-your-application/configuring/mdx#using-plugins-with-turbopack}
  options: {
    rehypePlugins: [],
    remarkPlugins: []
  }
})

export default withMDX(nextConfig)
