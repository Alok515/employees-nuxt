<script setup>

const route = useRoute()

const { data } = await useAsyncData(
    "employee",
    () => $fetch(`/api/employees/${route.params.id}`)
)

const update = async () => {

    await $fetch(`/api/employees/${route.params.id}`, {
        method: "PATCH",
        body: data.value
    })

}

</script>

<template>

    <div v-if="data">

        <input v-model="data.name" />

        <input v-model="data.role" />

        <input v-model="data.department" />

        <button @click="update">
            Update
        </button>

    </div>

</template>