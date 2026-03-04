<script setup>
const { $api } = useNuxtApp()
definePageMeta({ middleware: "auth" })

const { data } = await useAsyncData(
    "dashboard",
    () => $api("/api/dashboard")
)
const totalEmployees = computed(() => data.value?.totalEmployees ?? 0)
</script>

<template>
    <section class="space-y-6">
        <header class="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_14px_35px_-25px_rgba(15,23,42,0.6)] backdrop-blur sm:p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Dashboard</p>
            <h1 class="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Employee Overview</h1>
            <p class="mt-2 text-sm text-slate-600 sm:text-base">A quick snapshot of your workforce and actions.</p>
        </header>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article class="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:col-span-2">
                <p class="text-sm font-medium text-slate-500">Total Employees</p>
                <p class="mt-3 text-4xl font-semibold text-slate-900">{{ totalEmployees }}</p>
                <p class="mt-2 text-sm text-slate-600">Current records available in the directory.</p>
            </article>

            <NuxtLink to="/employees" class="group rounded-2xl border border-slate-200/80 bg-white p-6 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md">
                <p class="text-sm font-medium text-slate-500">Directory</p>
                <h2 class="mt-3 text-xl font-semibold text-slate-900">View Employees</h2>
                <p class="mt-2 text-sm text-slate-600">Browse employees in a responsive grid layout.</p>
                <span class="mt-5 inline-block text-sm font-semibold text-cyan-700 transition group-hover:translate-x-1">Open list</span>
            </NuxtLink>

            <NuxtLink to="/employees/new" class="group rounded-2xl border border-slate-200/80 bg-white p-6 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
                <p class="text-sm font-medium text-slate-500">Actions</p>
                <h2 class="mt-3 text-xl font-semibold text-slate-900">Add Employee</h2>
                <p class="mt-2 text-sm text-slate-600">Create a new profile with validated employee details.</p>
                <span class="mt-5 inline-block text-sm font-semibold text-emerald-700 transition group-hover:translate-x-1">Create record</span>
            </NuxtLink>
        </div>
    </section>
</template>
