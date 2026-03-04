import { promises as fs } from "fs"
import { resolve } from "path"

const dbPath = resolve("main.db.json")

export const readDB = async () => {
  const data = await fs.readFile(dbPath, "utf-8")
  return JSON.parse(data)
}

export const writeDB = async (data: any) => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2))
}