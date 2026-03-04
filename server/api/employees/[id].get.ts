import { readDB } from "../../utils/db"

export default defineEventHandler(async (event) => {

  const id = getRouterParam(event, "id")

  const db = await readDB()

  const employee = db.employees.find((e: any) => e.id === id)

  if (!employee) {
    throw createError({
      statusCode: 404,
      statusMessage: "Employee not found"
    })
  }

  return employee
})