import { generateState } from "arctic"
import { cookies } from "next/headers"
import { env } from "@/env/server"
import { github } from "@/lib/auth/providers/github"

export async function GET(): Promise<Response> {
  const cookieStore = await cookies()

  const state = generateState()
  const url = await github.createAuthorizationURL(state)

  cookieStore.set("github_oauth_state", state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: env.NODE_ENV === "production"
  })

  return Response.redirect(url)
}
