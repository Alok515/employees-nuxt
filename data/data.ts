export const COMPANY_FALLBACK_NAME = "Alok People Co."
export const EMPLOYEE_PAGE_SIZE = 9

export type DynamicFormField = {
  key: string
  label: string
  type: "text" | "email" | "password" | "number" | "select"
  placeholder: string
  required?: boolean
  wrapperClass?: string
  marginClass?: string
  autoComplete?: string
  min?: number
  step?: number
  options?: readonly string[]
  sanitize?: "numbersOnly"
}

export const NAV_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Employees", to: "/employees" },
  { label: "Add Employee", to: "/employees/new" }
] as const

export const LOGIN_FORM_FIELDS = [
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    required: true,
    marginClass: "mt-6",
    autoComplete: "email"
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    required: true,
    marginClass: "mt-4",
    autoComplete: "current-password"
  }
] as const satisfies readonly DynamicFormField[]

export const SEED_ROLES = ["Developer", "Designer", "Manager", "QA"] as const
export const SEED_DEPARTMENTS = ["Engineering", "Product", "Design", "HR"] as const

export const EMPLOYEE_FORM_FIELDS = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "John Carter",
    required: true,
    wrapperClass: "sm:col-span-2"
  },
  {
    key: "role",
    label: "Role",
    type: "select",
    placeholder: "Select role",
    required: true,
    options: SEED_ROLES,
    wrapperClass: ""
  },
  {
    key: "department",
    label: "Department",
    type: "select",
    placeholder: "Select department",
    required: true,
    options: SEED_DEPARTMENTS,
    wrapperClass: ""
  },
  {
    key: "salary",
    label: "Salary",
    type: "text",
    placeholder: "50000",
    required: true,
    sanitize: "numbersOnly",
    wrapperClass: "sm:col-span-2"
  }
] as const satisfies readonly DynamicFormField[]
