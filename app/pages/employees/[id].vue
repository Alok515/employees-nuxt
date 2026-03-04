<script setup>
const { $api } = useNuxtApp()
const route = useRoute()

const { data } = await useAsyncData(
    () => `employee-${route.params.id}`,
    () => $api(`/employees/${route.params.id}`)
)

const update = async () => {
    await $api(`/employees/${route.params.id}`, {
        method: "PATCH",
        body: data.value
    })
}
</script>

<template>
    <section class="mx-auto max-w-3xl">
        <div v-if="data" class="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_14px_35px_-25px_rgba(15,23,42,0.6)] backdrop-blur sm:p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Profile Editor</p>
            <h1 class="mt-3 text-3xl font-semibold text-slate-900">Update Employee</h1>
            <p class="mt-2 text-sm text-slate-600">Employee ID: {{ data.id }}</p>

            <div class="mt-8 grid gap-4 sm:grid-cols-2">
                <label class="text-sm font-medium text-slate-700 sm:col-span-2">
                    Name
                    <input v-model="data.name" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-200" />
                </label>

                <label class="text-sm font-medium text-slate-700">
                    Role
                    <input v-model="data.role" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-200" />
                </label>

                <label class="text-sm font-medium text-slate-700">
                    Department
                    <input v-model="data.department" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-200" />
                </label>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
                <button @click="update" class="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500">
                    Update
                </button>
                <NuxtLink to="/employees" class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                    Back to List
                </NuxtLink>
            </div>
        </div>

        <div v-else class="rounded-2xl border border-slate-200/80 bg-white/90 p-6 text-sm text-slate-600">
            Loading employee...
        </div>
    </section>
</template>
