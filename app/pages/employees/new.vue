<script setup lang="ts">
import DynamicFormFields from "~/components/form/DynamicFormFields.vue"
import { EMPLOYEE_FORM_FIELDS } from "~~/data/data"
import { employeeSchema } from "~~/schemas/employee"

const { $api } = useNuxtApp()

type EmployeeFieldKey = (typeof EMPLOYEE_FORM_FIELDS)[number]["key"]
type EmployeeFormData = Record<EmployeeFieldKey, string>

const employeeData = reactive<EmployeeFormData>({
    name: "",
    role: "",
    department: "",
    salary: ""
})
const formError = ref("")
const fieldErrors = reactive<Record<EmployeeFieldKey, string>>({
    name: "",
    role: "",
    department: "",
    salary: ""
})

function resetErrors() {
    formError.value = ""
    fieldErrors.name = ""
    fieldErrors.role = ""
    fieldErrors.department = ""
    fieldErrors.salary = ""
}

const submit = async () => {
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

    try {
        await $api("/employees", {
            method: "POST",
            body: result.data
        })

        resetData()

        navigateTo("/employees")
    } catch {
        formError.value = "Unable to add employee. Please try again."
    }
}

function resetData() {
    formError.value = ""
    employeeData.name = ""
    employeeData.role = ""
    employeeData.department = ""
    employeeData.salary = ""
}
</script>

<template>
    <section class="mx-auto max-w-3xl">
        <div class="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_14px_35px_-25px_rgba(15,23,42,0.6)] backdrop-blur sm:p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Create Record</p>
            <h1 class="mt-3 text-3xl font-semibold text-slate-900">Add Employee</h1>
            <p class="mt-2 text-sm text-slate-600">Enter valid profile details to add a new employee.</p>

            <form class="mt-8 grid gap-4 sm:grid-cols-2" @submit.prevent="submit">
                <DynamicFormFields v-model="employeeData" :fields="EMPLOYEE_FORM_FIELDS" :errors="fieldErrors" tone="emerald" />

                <p v-if="formError" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:col-span-2">
                    {{ formError }}
                </p>

                <div class="flex flex-wrap gap-3 sm:col-span-2">
                    <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
                        Add Employee
                    </button>
                    <NuxtLink to="/employees" class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                        Cancel
                    </NuxtLink>
                </div>
            </form>
        </div>
    </section>
</template>
