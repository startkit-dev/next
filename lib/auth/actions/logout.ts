import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { lucia } from "@/lib/auth/lucia"

import { getSession } from "../get-session"

type ActionResult = {
  error: string | null
}

export async function logout(): Promise<ActionResult> {
  "use server"

  const cookieStore = await cookies()
  const { session } = await getSession()

  if (session) {
    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  }

  return redirect("/")
}
