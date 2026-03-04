<script setup lang="ts">
import { employeeSchema } from "~~/schemas/employee"

const { $api } = useNuxtApp()

const employeeData = reactive({
    name: "",
    role: "",
    department: "",
    salary: ""
})
const formError = ref("")
const fieldErrors = reactive({
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
                <label class="text-sm font-medium text-slate-700 sm:col-span-2">
                    Name <span class="text-rose-600">*</span>
                    <input v-model="employeeData.name" required placeholder="John Carter" class="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-200" :class="fieldErrors.name ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-emerald-500'" />
                    <p v-if="fieldErrors.name" class="mt-1 text-xs font-medium text-rose-600">
                        {{ fieldErrors.name }}
                    </p>
                </label>

                <label class="text-sm font-medium text-slate-700">
                    Role <span class="text-rose-600">*</span>
                    <input v-model="employeeData.role" required placeholder="Software Engineer" class="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-200" :class="fieldErrors.role ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-emerald-500'" />
                    <p v-if="fieldErrors.role" class="mt-1 text-xs font-medium text-rose-600">
                        {{ fieldErrors.role }}
                    </p>
                </label>

                <label class="text-sm font-medium text-slate-700">
                    Department <span class="text-rose-600">*</span>
                    <input v-model="employeeData.department" required placeholder="Engineering" class="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-200" :class="fieldErrors.department ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-emerald-500'" />
                    <p v-if="fieldErrors.department" class="mt-1 text-xs font-medium text-rose-600">
                        {{ fieldErrors.department }}
                    </p>
                </label>

                <label class="text-sm font-medium text-slate-700 sm:col-span-2">
                    Salary <span class="text-rose-600">*</span>
                    <input v-model="employeeData.salary" required type="number" min="1000" step="100" placeholder="50000" class="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-200" :class="fieldErrors.salary ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-emerald-500'" />
                    <p v-if="fieldErrors.salary" class="mt-1 text-xs font-medium text-rose-600">
                        {{ fieldErrors.salary }}
                    </p>
                </label>

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
