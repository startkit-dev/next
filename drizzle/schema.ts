import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: text("id").primaryKey()
})

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date"
  }).notNull()
})
