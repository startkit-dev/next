import { createEnv } from "@t3-oss/env-nextjs"

import { env as client } from "./client"

export const env = createEnv({
  experimental__runtimeEnv: process.env,
  extends: [client],
  server: {
    // DATABASE_URL: z.string().url(),
    // OPEN_AI_API_KEY: z.string().min(1)
  }
})
