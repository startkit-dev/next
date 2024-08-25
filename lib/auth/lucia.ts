import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"

import { db } from "@/drizzle/client"
import { sessionsTable, usersTable } from "@/drizzle/schema"
import { env } from "@/env/server"

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  githubId: number
  username: string
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable)

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      githubId: attributes.githubId,
      username: attributes.username
    }
  },
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === "production"
    },
    expires: false
  }
})
