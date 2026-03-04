import { z } from "zod"

export const employeeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  role: z
    .string()
    .trim()
    .min(1, "Role is required")
    .min(2, "Role must be at least 2 characters"),
  department: z
    .string()
    .trim()
    .min(1, "Department is required")
    .min(2, "Department must be at least 2 characters"),
  salary: z.coerce
    .number()
    .min(1000, "Salary must be at least 1000")
})
