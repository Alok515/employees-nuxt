<script setup lang="ts">
import DynamicFormFields from "~/components/form/DynamicFormFields.vue"
import { EMPLOYEE_FORM_FIELDS } from "~~/data/data"
import { employeeSchema } from "~~/schemas/employee"
import type { Employee } from "~~/types"

definePageMeta({ middleware: "auth" })

const { $api } = useNuxtApp()
const route = useRoute()

type EmployeeFieldKey = (typeof EMPLOYEE_FORM_FIELDS)[number]["key"]
type EmployeeFormData = Record<EmployeeFieldKey, string>
type EmployeeUpdateResponse = {
  employee: Employee
  index: number
  total: number
  page: number
  pageSize: number
}

const formError = ref("")
const isUpdating = ref(false)
const fieldErrors = reactive<Record<EmployeeFieldKey, string>>({
  name: "",
  role: "",
  department: "",
  salary: ""
})
const employeeData = reactive<EmployeeFormData>({
  name: "",
  role: "",
  department: "",
  salary: ""
})

const { data: employee, pending } = await useAsyncData(
  () => `employee-${route.params.id}`,
  () => $api<Employee>(`/employees/${route.params.id}`)
)

watchEffect(() => {
  if (!employee.value) {
    return
  }

  employeeData.name = employee.value.name ?? ""
  employeeData.role = employee.value.role ?? ""
  employeeData.department = employee.value.department ?? ""
  employeeData.salary = String(employee.value.salary ?? "")
})

function resetErrors() {
  formError.value = ""
  fieldErrors.name = ""
  fieldErrors.role = ""
  fieldErrors.department = ""
  fieldErrors.salary = ""
}

const update = async () => {
  resetErrors()

  const result = employeeSchema.safeParse(employeeData)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    fieldErrors.name = errors.name?.[0] ?? ""
    fieldErrors.role = errors.role?.[0] ?? ""
    fieldErrors.department = errors.department?.[0] ?? ""
    fieldErrors.salary = errors.salary?.[0] ?? ""
    return
  }

  isUpdating.value = true

  try {
    const updateResponse = await $api<EmployeeUpdateResponse>(`/employees/${route.params.id}`, {
      method: "PATCH",
      body: result.data
    })

    const targetPage = Number.isFinite(updateResponse.page) && updateResponse.page > 0
      ? updateResponse.page
      : 1

    await navigateTo(`/employees?page=${targetPage}`)
  } catch {
    formError.value = "Unable to update employee. Please try again."
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <section class="mx-auto max-w-3xl">
    <div
      v-if="employee"
      class="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_14px_35px_-25px_rgba(15,23,42,0.6)] backdrop-blur sm:p-8"
    >
      <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Profile Editor</p>
      <h1 class="mt-3 text-3xl font-semibold text-slate-900">Update Employee</h1>
      <p class="mt-2 text-sm text-slate-600">Employee ID: {{ employee.id }}</p>

      <form class="mt-8 grid gap-4 sm:grid-cols-2" @submit.prevent="update">
        <DynamicFormFields
          v-model="employeeData"
          :fields="EMPLOYEE_FORM_FIELDS"
          :errors="fieldErrors"
          tone="cyan"
        />

        <p
          v-if="formError"
          class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:col-span-2"
        >
          {{ formError }}
        </p>

        <div class="mt-2 flex flex-wrap gap-3 sm:col-span-2">
          <button
            type="submit"
            :disabled="isUpdating"
            class="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isUpdating ? "Updating..." : "Update Employee" }}
          </button>
          <NuxtLink
            to="/employees"
            class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Back to List
          </NuxtLink>
        </div>
      </form>
    </div>

    <div v-else class="rounded-2xl border border-slate-200/80 bg-white/90 p-6 text-sm text-slate-600">
      {{ pending ? "Loading employee..." : "Employee not found." }}
    </div>
  </section>
</template>
