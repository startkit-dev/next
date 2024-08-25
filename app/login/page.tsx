import Image from "next/image"
import Link from "next/link"

import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth/actions/logout"
import { getSession } from "@/lib/auth/get-session"

import logo from "../icon4.png"

export default async function Home() {
  const { user } = await getSession()

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Link className="group flex flex-row items-center gap-2" href="/">
          <Image
            alt="StartKit logo"
            className="aspect-square transition-all group-hover:-rotate-12 group-hover:scale-105 dark:invert"
            height={42}
            src={logo}
            width={42}
            priority
          />
          <span className="font-mono text-3xl font-extrabold">StartKit</span>
        </Link>

        <div className="flex flex-col items-center gap-4">
          {user ? (
            <form action={logout}>
              <Button
                className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base"
                type="submit"
              >
                Sign out
              </Button>
            </form>
          ) : (
            <a
              className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base"
              href="/login/github"
            >
              Login
            </a>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
