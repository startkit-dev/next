import Link from "next/link"
import { Logo } from "@/components/icons/brand/logo"
import { OAuthButton } from "@/components/shared/oauth-button"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth/actions/logout"
import { getSession } from "@/lib/auth/get-session"

export default async function Home() {
  const { user } = await getSession()

  return (
    <main className="flex grow flex-col items-center justify-center gap-8">
      <Link className="group flex flex-row items-center gap-2" href="/">
        <Logo className="size-11" />
        <span className="font-mono text-3xl font-extrabold">StartKit</span>
      </Link>

      <div className="flex flex-col items-center justify-center gap-4">
        {user ? (
          <form action={logout}>
            <Button
              className="rounded-full"
              size="lg"
              type="submit"
              variant="outline"
            >
              Sign out
            </Button>
          </form>
        ) : (
          <OAuthButton className="rounded-full" provider="github" size="lg" />
        )}
      </div>
    </main>
  )
}
