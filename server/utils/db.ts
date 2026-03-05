import { promises as fs, constants } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const localDbPath = resolve("main.db.json")
const bundledDbPath = fileURLToPath(new URL("./main.db.json", import.meta.url))
const runtimeDbPath = process.env.VERCEL ? "/tmp/main.db.json" : localDbPath
const sourceCandidates = [
  bundledDbPath,
  resolve(".output/server/main.db.json"),
  resolve(".output/main.db.json"),
  localDbPath
]

let isReady = false

const findReadableSource = async () => {
  for (const candidate of sourceCandidates) {
    try {
      await fs.access(candidate, constants.R_OK)
      return candidate
    } catch {
      // Try next candidate.
    }
  }

  throw new Error("No readable main.db.json source found.")
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

  const sourcePath = await findReadableSource()

  await fs.mkdir(dirname(runtimeDbPath), { recursive: true })
  await fs.copyFile(sourcePath, runtimeDbPath)
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
