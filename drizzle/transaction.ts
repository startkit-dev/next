import { sql } from "./client"

import type {
  AnyPgDeleteBase,
  AnyPgInsert,
  AnyPgSelect,
  PgUpdateBase
} from "drizzle-orm/pg-core"

type AnyPgUpdate = PgUpdateBase<never, never, never, never>

type PgQuery = AnyPgInsert | AnyPgDeleteBase | AnyPgSelect | AnyPgUpdate

/**
 * Perform a transaction with the given queries.
 *
 * @example
 * ```ts
 * import { db } from "./client"
 * import { usersTable } from "./schema"
 * import { transaction } from "./transaction"
 *
 * await transaction(
 *  db.insert(usersTable).values({ id: "1" }).toSQL(),
 *  db.insert(usersTable).values({ id: "2" }).toSQL(),
 * )
 * ```
 *
 * @param queries The queries to perform in the transaction. These must be `.toSQL` queries from drizzle.
 */
export function transaction(...queries: PgQuery[]) {
  return sql.transaction(
    queries.map((query) => {
      const { sql: querySql, params } = query.toSQL()
      return sql(querySql, params)
    })
  )
}
