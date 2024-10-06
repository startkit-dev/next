import "./globals.css"
import { TailwindIndicator } from "@/components/layout/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { fullURL } from "@/lib/url-fns/full-url"
import { cn } from "@/lib/utils/cn"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import type { PropsWithChildren } from "react"

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  description: siteConfig.description,
  metadataBase: fullURL(),
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: "A sane way to start your next next.js project",
    type: "website",
    url: fullURL()
  },
  title: {
    default: `A sane way to start your next next.js project | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.author.twitter,
    description: siteConfig.description,
    site: siteConfig.handles.twitter,
    title: "A sane way to start your next next.js project"
  }
}

export const viewport: Viewport = {
  themeColor: "var(--background)"
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "font-sans antialiased"
        )}
      >
        <ThemeProvider attribute="class">
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
