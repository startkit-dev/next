import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

import { env as shared } from "./shared"

export const env = createEnv({
  experimental__runtimeEnv: process.env,
  extends: [shared],
  server: {
    DATABASE_URL: z.string().url(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string()
  }
})
