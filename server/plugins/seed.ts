import { seedEmployeesIfEmpty } from "../utils/seedEmployees"

export default defineNitroPlugin(async () => {
  await seedEmployeesIfEmpty()
})