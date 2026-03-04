<script setup>

definePageMeta({ middleware: "auth" })

const { data } = await useAsyncData(
    "dashboard",
    () => $fetch("/api/dashboard")
)

</script>

<template>

    <div>

        <h1>Dashboard</h1>

        <p>Total Employees: {{ data?.totalEmployees }}</p>

        <NuxtLink to="/employees">View Employees</NuxtLink>

        <NuxtLink to="/employees/new">
            Add Employee
        </NuxtLink>

    </div>

</template>