import { z } from "zod"

export const employeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2),
  department: z.string().min(2),
  salary: z.number().min(1000)
})