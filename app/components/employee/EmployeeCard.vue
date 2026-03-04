<script setup lang="ts">
import type { Employee } from "~~/types"

defineProps<{
  employee: Employee
}>()

</script>

<template>
  <NuxtLink :to="`/employees/${employee.id}`">
  <h3>{{ employee.name }}</h3>
    <p>{{ employee.role }}</p>
    <p>{{ employee.department }}</p>
</NuxtLink>
  <div class="border p-4 rounded mb-3" >
  </div>
</template>