import { generateState } from "arctic"
import { cookies } from "next/headers"

import { env } from "@/env/server"
import { github } from "@/lib/auth/providers/github"

export async function GET(): Promise<Response> {
  const state = generateState()
  const url = await github.createAuthorizationURL(state)

  cookies().set("github_oauth_state", state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: env.NODE_ENV === "production"
  })

  return Response.redirect(url)
}
