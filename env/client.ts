import { createEnv } from "@t3-oss/env-nextjs"
import { vercel } from "@t3-oss/env-nextjs/presets"
import { z } from "zod"

export const env = createEnv({
  extends: [vercel()],
  client: {
    NEXT_PUBLIC_HOST: z.string().url().optional()
  },
  shared: {
    NODE_ENV: z
      .enum(["test", "development", "production"])
      .default("development")
  },
  runtimeEnv: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NODE_ENV: process.env.NODE_ENV
  }
})
