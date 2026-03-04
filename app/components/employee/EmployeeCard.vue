<script setup lang="ts">
import type { Employee } from "~~/types"

const props = defineProps<{
  employee: Employee
}>()

const salaryLabel = computed(() =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(props.employee.salary)
)
</script>

<template>
  <NuxtLink
    :to="`/employees/${employee.id}`"
    class="group block rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <h3 class="text-lg font-semibold text-slate-900">{{ employee.name }}</h3>
        <p class="mt-1 text-sm font-medium text-slate-600">{{ employee.role }}</p>
      </div>
      <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        {{ salaryLabel }}
      </span>
    </div>

    <div class="mt-5 flex items-center justify-between gap-3">
      <p class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
        {{ employee.department }}
      </p>
      <span class="text-sm font-semibold text-cyan-700 transition group-hover:translate-x-1">Open profile</span>
    </div>
  </NuxtLink>
</template>
