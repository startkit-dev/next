import { createId } from "@paralleldrive/cuid2"
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date())
})

export const sessionsTable = pgTable("sessions", {
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true
  }).notNull(),
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id)
})

export const oauthAccountsTable = pgTable(
  "oauth_accounts",
  {
    createdAt: timestamp("created_at").notNull().defaultNow(),
    providerId: text("provider_id").notNull(),
    providerUserId: text("provider_user_id").notNull(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdate(() => new Date()),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.providerId, table.providerUserId] })
  })
)
