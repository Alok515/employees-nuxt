import { readDB, writeDB } from "../../utils/db"

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

  return db.employees[index]
})