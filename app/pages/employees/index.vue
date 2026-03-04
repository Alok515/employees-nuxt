<script setup lang="ts">

const route = useRoute()

const page = computed(() =>
    Number(route.query.page) || 1
)

const {
    employees,
    total,
    loading,
    fetchEmployees
} = useEmployees()

//ssr fetch
await fetchEmployees(page.value);

watch(page, () => {
  fetchEmployees(page.value)
})
</script>


<template>
    <section>
        <EmployeeSkeleton v-if="loading" v-for="i in 5" :key="i" />
        <main v-else>
            <LazyEmployeeCard v-for="emp in employees" :key="emp.id" :employee="emp" />
        </main>
        <footer>
            <button @click="navigateTo(`/employees?page=${page - 1}`)" :disabled="page <= 1">
                Prev
            </button>

            <button @click="navigateTo(`/employees?page=${page + 1}`)">
                Next
            </button>
        </footer>
    </section>
</template>