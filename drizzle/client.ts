import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import { env } from "@/env/server"

export const sql = neon(env.DATABASE_URL)
export const db = drizzle(sql, {
  logger: env.NODE_ENV === "development"
})
