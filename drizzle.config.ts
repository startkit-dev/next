import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle/migrations",
  schema: "./drizzle/schema.ts"
})
