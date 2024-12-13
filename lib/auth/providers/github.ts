import { GitHub } from "arctic"
import { z } from "zod"
import { env } from "@/env/server"

const githubUserSchema = z.object({
  id: z.number(),
  login: z.string()
})

export const github = new GitHub(env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET)

export async function authorizeGithub(code: string) {
  const tokens = await github.validateAuthorizationCode(code)
  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`
    }
  })

  const githubUser = githubUserSchema.parse(await githubUserResponse.json())
  return githubUser
}
