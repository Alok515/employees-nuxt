import { readDB } from "../utils/db"
import type { User } from "~~/types"


export default defineEventHandler(async (event) => {

  const session = getCookie(event, "session")

  if (!session) return { user: null }

  const db = await readDB()

  const user: User | null = db.users.find((u:any) => u.id === session) ?? null

  return { user }
})
