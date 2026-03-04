import { readDB, writeDB } from "../../utils/db"

export default defineEventHandler(async (event) => {

  const id = getRouterParam(event, "id")

  const db = await readDB()

  const index = db.employees.findIndex((e: any) => e.id === id)

  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Employee not found"
    })
  }

  const deleted = db.employees.splice(index, 1)

  await writeDB(db)

  return {
    success: true,
    deleted: deleted[0]
  }

})