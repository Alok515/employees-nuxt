import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async () => {

  const auth = useAuthStore()

  if (!auth.user) {
    await auth.fetchSession()
  }

  if (!auth.user) {
    return navigateTo("/")
  }

})
