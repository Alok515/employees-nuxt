<script setup lang="ts">
import DynamicFormFields from "~/components/form/DynamicFormFields.vue"
import { LOGIN_FORM_FIELDS } from "~~/data/data"
import { loginSchema } from "~~/schemas/auth"

const isSubmitting = ref(false)
const formError = ref("")

type LoginFieldKey = (typeof LOGIN_FORM_FIELDS)[number]["key"]
type LoginFormData = Record<LoginFieldKey, string>

const loginData = reactive<LoginFormData>({
    email: "",
    password: ""
})

const fieldErrors = reactive<Record<LoginFieldKey, string>>({
    email: "",
    password: ""
})

const auth = useAuthStore()

function resetErrors() {
    formError.value = ""
    fieldErrors.email = ""
    fieldErrors.password = ""
}

const login = async () => {
    if (isSubmitting.value) {
        return
    }

    resetErrors()

    const result = loginSchema.safeParse({
        email: loginData.email,
        password: loginData.password
    })

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        fieldErrors.email = errors.email?.[0] ?? ""
        fieldErrors.password = errors.password?.[0] ?? ""
        return
    }

    isSubmitting.value = true

    try {
        await auth.login(result.data.email, result.data.password)
        navigateTo("/dashboard")
    } catch (error: any) {
        formError.value = error?.message ?? "Unable to sign in. Please try again."
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section class="mx-auto flex w-full max-w-5xl items-center py-2">
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

            <form class="flex h-full flex-col justify-center rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8" @submit.prevent="login">
                <h2 class="text-2xl font-semibold text-slate-900">Sign in</h2>
                <p class="mt-2 text-sm text-slate-600">Use your credentials to access the dashboard.</p>

                <DynamicFormFields v-model="loginData" :fields="LOGIN_FORM_FIELDS" :errors="fieldErrors" tone="cyan" />

                <p v-if="formError" class="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {{ formError }}
                </p>

                <button type="submit" :disabled="isSubmitting" class="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400">
                    {{ isSubmitting ? "Signing in..." : "Login" }}
                </button>
            </form>
        </div>
    </section>
</template>
