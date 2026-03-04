import { readDB } from "../utils/db"

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const db = await readDB()

  const user = db.users.find(
    (u:any) =>
      u.email === body.email &&
      u.password === body.password
  )

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials"
    })
  }

  setCookie(event, "session", user.id, {
    httpOnly: true,
    maxAge: 60 * 60
  })

  return {
    id: user.id,
    role: user.role
  }
})