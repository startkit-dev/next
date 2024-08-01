import { db } from "@/drizzle/client"
import { migrate } from "drizzle-orm/neon-http/migrator"

const main = async () => {
  try {
    console.log("Migrating the database ...")
    await migrate(db, { migrationsFolder: "drizzle/migrations" })
    console.log("Migration completed")
  } catch (error) {
    console.error("Error during migration:", error)
    process.exit(1)
  }
}

main()
