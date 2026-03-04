import { v4 as uuid } from "uuid"
import { readDB, writeDB } from "./db"

const roles = ["Developer", "Designer", "Manager", "QA"]
const departments = ["Engineering", "Product", "Design", "HR"]

export const seedEmployeesIfEmpty = async () => {

  const db = await readDB()

  if (db.employees.length > 0) {
    return
  }

  const employees = Array.from({ length: 5000 }).map((_, i) => ({
    id: uuid(),
    name: `Employee ${i + 1}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    salary: Math.floor(Math.random() * 80000) + 30000
  }))

  db.employees = employees

  await writeDB(db)

  console.log("Seeded 5000 employees")
}