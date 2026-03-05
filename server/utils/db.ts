import { promises as fs, constants } from "node:fs"
import { dirname, resolve } from "node:path"
import seedDb from "../../main.db.json"

const localDbPath = resolve("main.db.json")
const runtimeDbPath = process.env.VERCEL ? "/tmp/main.db.json" : localDbPath

let isReady = false

const getSeedDb = () => {
  // Prevent accidental in-memory mutation of imported seed.
  return JSON.parse(JSON.stringify(seedDb))
}

const ensureDbFile = async () => {
  if (isReady) return

  try {
    await fs.access(runtimeDbPath, constants.R_OK)
    isReady = true
    return
  } catch {
    // Fall through and try to initialize from existing source data.
  }

  await fs.mkdir(dirname(runtimeDbPath), { recursive: true })
  await fs.writeFile(runtimeDbPath, JSON.stringify(getSeedDb(), null, 2))
  isReady = true
}

export const readDB = async () => {
  await ensureDbFile()
  const data = await fs.readFile(runtimeDbPath, "utf-8")
  return JSON.parse(data)
}

export const writeDB = async (data: any) => {
  await ensureDbFile()
  await fs.writeFile(runtimeDbPath, JSON.stringify(data, null, 2))
}
