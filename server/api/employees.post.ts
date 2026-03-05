import { readDB, writeDB } from "../utils/db"
import { v4 as uuid } from "uuid"
import { employeeSchema } from "~~/schemas/employee"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const parsed = employeeSchema.safeParse(body)

    if (!parsed.success) {
        throw createError({
            statusCode: 400,
            statusMessage: parsed.error.issues[0]?.message ?? "Invalid employee payload"
        })
    }
    const db = await readDB()

    const newEmployee = {
        id: uuid(),
        name: parsed.data.name,
        role: parsed.data.role,
        department: parsed.data.department,
        salary: parsed.data.salary
    }

    db.employees.unshift(newEmployee)

    await writeDB(db)

    return newEmployee
})