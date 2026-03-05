import { v4 as uuid } from "uuid"
import { readDB, writeDB } from "./db"
import { SEED_DEPARTMENTS, SEED_ROLES } from "~~/data/data"

export const seedEmployeesIfEmpty = async () => {

  const db = await readDB()

  if (db.employees.length > 0) {
    return
  }

  const employees = Array.from({ length: 5000 }).map((_, i) => ({
    id: uuid(),
    name: `Employee ${i + 1}`,
    role: SEED_ROLES[Math.floor(Math.random() * SEED_ROLES.length)],
    department: SEED_DEPARTMENTS[Math.floor(Math.random() * SEED_DEPARTMENTS.length)],
    salary: Math.floor(Math.random() * 80000) + 30000
  }))

  db.employees = employees

  await writeDB(db)

  console.log("Seeded 5000 employees")
}
