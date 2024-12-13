import { createId } from "@paralleldrive/cuid2"
import { and, eq } from "drizzle-orm"
import { db } from "@/drizzle/client"
import { oauthAccountsTable, usersTable } from "@/drizzle/schema"
import { transaction } from "@/drizzle/transaction"

/**
 * Find or create the user from the OAuth provider.
 *
 * @example
 * ```ts
 * import { findOrCreateUserFromOAuth } from "@/lib/auth/find-or-create-user-from-oauth"
 *
 * const githubUser = await authorizeGithub(code)
 * const userId = await findOrCreateUserFromOAuth("github",
 *  githubUser.id
 * )
 * ```
 *
 * @returns the user ID of the user
 */
export async function findOrCreateUserFromOAuth(
  providerId: string,
  providerUserId: string | number
) {
  const [existingAccount] = await db
    .select()
    .from(oauthAccountsTable)
    .where(
      and(
        eq(oauthAccountsTable.providerId, providerId),
        eq(oauthAccountsTable.providerUserId, providerUserId.toString())
      )
    )
    .limit(1)

  if (existingAccount) {
    return existingAccount.userId
  }

  const userId = createId()
  await transaction(
    db.insert(usersTable).values({
      id: userId
    }),

    db.insert(oauthAccountsTable).values({
      providerId,
      providerUserId: providerUserId.toString(),
      userId
    })
  )

  return userId
}
