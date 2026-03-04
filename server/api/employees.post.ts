import { readDB, writeDB } from "../utils/db"
import { v4 as uuid } from "uuid"

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const db = await readDB()

  const newEmployee = {
    id: uuid(),
    name: body.name,
    role: body.role,
    department: body.department,
    salary: body.salary
  }

  db.employees.push(newEmployee)

  await writeDB(db)

  return newEmployee
})