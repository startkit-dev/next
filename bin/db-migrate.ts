import { migrate } from "drizzle-orm/neon-http/migrator"

import { db } from "@/drizzle/client"

const main = async () => {
  console.log("Migrating the database ...")
  await migrate(db, { migrationsFolder: "drizzle/migrations" })
  console.log("Migration completed")
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error: unknown) => {
    console.error("Error during migration:", error)
    process.exit(1)
  })
