import { cookies } from "next/headers"
import { cache } from "react"
import { lucia } from "./lucia"
import type { Session, User } from "lucia"

type Auth =
  | {
      user: User
      session: Session
    }
  | {
      user: null
      session: null
    }

/**
 * Get the current user and session
 *
 * @example
 * ```ts
 * import { getSession } from "@/lib/auth/get-session"
 *
 * const { user, session } = await getSession()
 * ```
 */
export const getSession = cache(async (): Promise<Auth> => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) {
    return {
      session: null,
      user: null
    }
  }

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return result
})
