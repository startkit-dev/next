import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import type { PropsWithChildren } from "react"

export default function LegalLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container prose prose-zinc py-8 dark:prose-invert lg:prose-xl">
        <Button className="px-0 no-underline" variant="link" asChild>
          <Link href="/">← Back to {siteConfig.name}</Link>
        </Button>
        <article className="">{children}</article>
      </main>
      <Footer />
    </div>
  )
}
