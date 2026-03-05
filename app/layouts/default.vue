<script setup lang="ts">
import AppFooter from "~/components/layout/AppFooter.vue"
import AppNavbar from "~/components/layout/AppNavbar.vue"
import { COMPANY_FALLBACK_NAME, NAV_LINKS } from "~~/data/data"

const route = useRoute()
const auth = useAuthStore()
const runtimeConfig = useRuntimeConfig()

const currentYear = useState("current-year", () => new Date().getFullYear())
const isLoggingOut = ref(false)
const companyName = computed(() =>
  runtimeConfig.public.companyName || COMPANY_FALLBACK_NAME
)

const isLoginScreen = computed(() =>
  route.path === "/" || route.path === "/login"
)

const showLogout = computed(() =>
  !isLoginScreen.value && Boolean(auth.user)
)

const navLinks = NAV_LINKS

const logout = async () => {
  if (isLoggingOut.value) {
    return
  }

  isLoggingOut.value = true

  try {
    await auth.logout()
    await navigateTo("/")
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col">
    <AppNavbar
      :company-name="companyName"
      :is-login-screen="isLoginScreen"
      :show-logout="showLogout"
      :is-logging-out="isLoggingOut"
      :nav-links="navLinks"
      @logout="logout"
    />

    <main class="flex-1 pb-4">
      <slot />
    </main>

    <AppFooter :company-name="companyName" :current-year="currentYear" />
  </div>
</template>
