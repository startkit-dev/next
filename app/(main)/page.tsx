import { TriangleIcon } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/icons/brand/logo"
import { OAuthButton } from "@/components/shared/oauth-button"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth/actions/logout"
import { getSession } from "@/lib/auth/get-session"

export default async function Home() {
  const { user } = await getSession()

  return (
    <main className="flex grow flex-col items-center justify-center">
      <div className="container flex max-w-md flex-col items-center gap-8 sm:items-start">
        <div className="flex flex-row items-center gap-2">
          <Logo className="size-11" />
          <h1 className="font-mono text-3xl font-extrabold">StartKit</h1>
        </div>
        <ol className="list-inside list-decimal text-center font-mono text-sm sm:text-left">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              app/page.tsx
            </code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {user ? (
            <form action={logout} className="flex-1">
              <Button
                className="w-full gap-2 rounded-full"
                size="lg"
                type="submit"
                variant="secondary"
              >
                Sign out
              </Button>
            </form>
          ) : (
            <OAuthButton className="rounded-full" provider="github" />
          )}

          <Button
            className="flex-1 gap-2 rounded-full"
            size="lg"
            variant="default"
            asChild
          >
            <Link
              href="https://vercel.com/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TriangleIcon className="size-4 fill-current" />
              Deploy now
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
