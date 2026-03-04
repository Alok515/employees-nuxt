<script setup>
const email = ref("")
const password = ref("")
const isSubmitting = ref(false)

const auth = useAuthStore()

const login = async () => {
    if (isSubmitting.value) {
        return
    }
    isSubmitting.value = true
    try {
        await auth.login(email.value, password.value)
        navigateTo("/dashboard")
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section class="mx-auto flex min-h-[72vh] max-w-5xl items-center">
        <div class="grid w-full gap-6 rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_22px_50px_-28px_rgba(15,23,42,0.55)] backdrop-blur sm:p-8 lg:grid-cols-[1.1fr_1fr]">
            <div class="rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-6 text-white sm:p-8">
                <p class="text-xs font-semibold uppercase tracking-[0.32em] text-white/80">Employee Hub</p>
                <h1 class="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                    Smooth and focused team management.
                </h1>
                <p class="mt-4 max-w-md text-sm text-white/85 sm:text-base">
                    Track people, roles, and departments in one simple dashboard designed for speed.
                </p>
            </div>

            <form class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8" @submit.prevent="login">
                <h2 class="text-2xl font-semibold text-slate-900">Sign in</h2>
                <p class="mt-2 text-sm text-slate-600">Use your credentials to access the dashboard.</p>

                <label class="mt-6 block text-sm font-medium text-slate-700">Email</label>
                <input v-model="email" type="email" required placeholder="you@company.com" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-200" />

                <label class="mt-4 block text-sm font-medium text-slate-700">Password</label>
                <input v-model="password" type="password" required placeholder="••••••••" class="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-200" />

                <button type="submit" :disabled="isSubmitting" class="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400">
                    {{ isSubmitting ? "Signing in..." : "Login" }}
                </button>
            </form>
        </div>
    </section>
</template>
