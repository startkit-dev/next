import { db } from "@/drizzle/client"
import { sessionsTable, usersTable } from "@/drizzle/schema"
import { env } from "@/env/server"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"

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
  sessionCookie: {
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      githubId: attributes.githubId,
      username: attributes.username
    }
  }
})
