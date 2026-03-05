import { readDB, writeDB } from "../../utils/db"
import { EMPLOYEE_PAGE_SIZE } from "~~/data/data"

export default defineEventHandler(async (event) => {

  const id = getRouterParam(event, "id")

  const body = await readBody(event)

  const db = await readDB()

  const index = db.employees.findIndex((e: any) => e.id === id)

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Employee not found"
    })
  }

  db.employees[index] = {
    ...db.employees[index],
    ...body
  }

  await writeDB(db)

  const total = db.employees.length
  const page = Math.max(1, Math.floor(index / EMPLOYEE_PAGE_SIZE) + 1)

  return {
    employee: db.employees[index],
    index,
    total,
    page,
    pageSize: EMPLOYEE_PAGE_SIZE
  }
})
