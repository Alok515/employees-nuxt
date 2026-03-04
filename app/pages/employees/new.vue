<script setup>
import { employeeSchema } from "~~/schemas/employee"

const { $api } = useNuxtApp()

const employeeData = reactive({
    name: "",
    role: "",
    department: "",
    salary: 0
})
const error = ref("")

const submit = async () => {
    const result = employeeSchema.safeParse(employeeData)

    if (!result.success) {
        error.value = result.error.message
        return
    }

    await $api("/employees", {
        method: "POST",
        body: employeeData
    })

    resetData()

    navigateTo("/employees")
}

function resetData() {
    error.value = ""
    employeeData.name = ""
    employeeData.role = ""
    employeeData.department = ""
    employeeData.salary = 0
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
                    Name
                    <input v-model="employeeData.name" placeholder="John Carter" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200" />
                </label>

                <label class="text-sm font-medium text-slate-700">
                    Role
                    <input v-model="employeeData.role" placeholder="Software Engineer" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200" />
                </label>

                <label class="text-sm font-medium text-slate-700">
                    Department
                    <input v-model="employeeData.department" placeholder="Engineering" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200" />
                </label>

                <label class="text-sm font-medium text-slate-700 sm:col-span-2">
                    Salary
                    <input v-model.number="employeeData.salary" type="number" min="1000" step="100" placeholder="50000" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200" />
                </label>

                <p v-if="error" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:col-span-2">
                    {{ error }}
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
