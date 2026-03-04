<script setup lang="ts">
const route = useRoute()

const page = computed(() => Number(route.query.page) || 1)
const prevPage = computed(() => page.value - 1)
const nextPage = computed(() => page.value + 1)

const { employees, total, loading, fetchEmployees } = useEmployees();

await fetchEmployees(page.value);

watch(page, () => {
    fetchEmployees(page.value)
});
</script>

<template>
    <section class="space-y-6">
        <header class="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_14px_35px_-25px_rgba(15,23,42,0.6)] backdrop-blur sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Directory</p>
                <h1 class="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Employees</h1>
                <p class="mt-2 text-sm text-slate-600">Page {{ page }} • Total {{ total }}</p>
            </div>
            <NuxtLink to="/employees/new" class="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Add Employee
            </NuxtLink>
        </header>

        <div v-if="loading" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <UiEmployeeSkeleton v-for="i in 12" :key="i" />
        </div>

        <div v-else-if="!employees.length" class="rounded-2xl border border-dashed border-slate-300 bg-white/75 p-10 text-center">
            <h2 class="text-xl font-semibold text-slate-900">No employees yet</h2>
            <p class="mt-2 text-sm text-slate-600">Create your first employee profile to get started.</p>
            <NuxtLink to="/employees/new" class="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500">
                Add Employee
            </NuxtLink>
        </div>

        <template v-else>
            <main class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <EmployeeCard v-for="emp in employees" :key="emp.id" :employee="emp" />
            </main>

            <footer class="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="text-sm text-slate-600">
                    Showing page <span class="font-semibold text-slate-900">{{ page }}</span>
                </div>

                <div class="flex items-center gap-2">
                    <button @click="navigateTo(`/employees?page=${prevPage}`)" :disabled="page <= 1" class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
                        Prev
                    </button>

                    <button @click="navigateTo(`/employees?page=${nextPage}`)" class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                        Next
                    </button>
                </div>
            </footer>
        </template>
    </section>
</template>
