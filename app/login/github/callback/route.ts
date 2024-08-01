import { findOrCreateUserFromOAuth } from "@/lib/auth/find-or-create-user-from-oauth"
import { lucia } from "@/lib/auth/lucia"
import { authorizeGithub } from "@/lib/auth/providers/github"
import { validateOauthCallback } from "@/lib/auth/validate-oauth-callback"
import { OAuth2RequestError } from "arctic"
import { cookies } from "next/headers"

export async function GET(req: Request): Promise<Response> {
  const code = validateOauthCallback(req)
  if (!code) {
    return new Response(null, {
      status: 400
    })
  }

  try {
    const githubUser = await authorizeGithub(code)
    const userId = await findOrCreateUserFromOAuth("github", githubUser.id)
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    })
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      })
    }

    return new Response(null, {
      status: 500
    })
  }
}
