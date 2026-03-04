export interface User {
  id: string
  role: string
}

export  interface Employee {
  id: string
  name: string
  role: string
  department: string
  salary: number
}

export type EmployeesResponse = {
  data: Employee[]
  total: number
}