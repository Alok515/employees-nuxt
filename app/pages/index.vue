<script setup>

const email = ref("")
const password = ref("")

const auth = useAuthStore()

const login = async () => {

    await auth.login(email.value, password.value)

    navigateTo("/dashboard")

}

</script>

<template>

    <div class="p-10">

        <h1>Login</h1>

        <input v-model="email" placeholder="email" />

        <input v-model="password" type="password" />

        <button @click="login">Login</button>

    </div>

</template>