import { readDB } from "../utils/db"
import { loginSchema } from "~~/schemas/auth"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsedBody = loginSchema.safeParse(body)

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsedBody.error.issues[0]?.message ?? "Invalid login payload"
    })
  }

  const credentials = parsedBody.data
  const db = await readDB()

  const user = db.users.find(
    (u:any) =>
      u.email === credentials.email &&
      u.password === credentials.password
  )

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials"
    })
  }

  setCookie(event, "session", user.id, {
    httpOnly: true,
    maxAge: 60 * 60,
    sameSite: "lax",
    path: "/"
  })

  return {
    id: user.id,
    role: user.role
  }
})
