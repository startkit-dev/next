import Image from "next/image"
import Link from "next/link"

import { Logo } from "@/components/icons/brand/logo"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex grow flex-col items-center justify-center">
      <div className="container flex max-w-md flex-col items-start gap-8">
        <div className="flex flex-row items-center gap-2">
          <Logo className="size-11" />
          <h1 className="font-mono text-3xl font-extrabold">StartKit</h1>
        </div>
        <ol className="list-inside list-decimal text-left font-mono text-sm">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              app/page.tsx
            </code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            className="gap-2 rounded-full"
            size="lg"
            variant="default"
            asChild
          >
            <Link
              href="https://vercel.com/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt="Vercel logomark"
                className="dark:invert"
                height={20}
                src="https://nextjs.org/icons/vercel.svg"
                width={20}
              />
              Deploy now
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
