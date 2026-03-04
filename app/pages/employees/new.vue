<script setup>

const name = ref("")
const role = ref("")
const department = ref("")
const salary = ref("")

const submit = async () => {

    await $fetch("/api/employees", {
        method: "POST",
        body: {
            name: name.value,
            role: role.value,
            department: department.value,
            salary: salary.value
        }
    })

    navigateTo("/employees")

}

</script>

<template>

    <div>

        <h1>Add Employee</h1>

        <input v-model="name" placeholder="name" />

        <input v-model="role" />

        <input v-model="department" />

        <input v-model="salary" />

        <button @click="submit">
            Add
        </button>

    </div>

</template>