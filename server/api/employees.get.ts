import { EMPLOYEE_PAGE_SIZE } from "~~/data/data"

export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event)

  const page = Number(query.page) || 1
  const limit = EMPLOYEE_PAGE_SIZE

  const db = await readDB()

  const start = (page - 1) * limit
  const end = start + limit

  return {
    data: db.employees.slice(start, end),
    total: db.employees.length
  }

}, {
  maxAge: 60
})
