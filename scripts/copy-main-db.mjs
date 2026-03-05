import { mkdir, copyFile, access } from "node:fs/promises"
import { constants } from "node:fs"
import { resolve } from "node:path"

const sourcePath = resolve("main.db.json")
const outputDir = resolve(".output")
const targetPath = resolve(outputDir, "main.db.json")

try {
  await access(sourcePath, constants.R_OK)
} catch {
  console.error(`Source DB file not found: ${sourcePath}`)
  process.exit(1)
}

await mkdir(outputDir, { recursive: true })
await copyFile(sourcePath, targetPath)

console.log(`Copied ${sourcePath} -> ${targetPath}`)
