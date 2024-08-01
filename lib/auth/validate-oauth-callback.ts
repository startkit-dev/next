import { cookies } from "next/headers"

/**
 * Validate the OAuth callback and return the code
 *
 * @example
 * ```ts
 * import { validateOauthCallback } from "@/lib/auth/validate-oauth-callback"
 *
 * const code = validateOauthCallback(req)
 * ```
 *
 * @returns the OAuth code, or undefined if it failed validation
 */
export function validateOauthCallback(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const storedState = cookies().get("github_oauth_state")?.value ?? null

  if (code && state && state === storedState) {
    return code
  }
}
