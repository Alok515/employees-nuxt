import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async () => {

  const auth = useAuthStore()

  if (!auth.sessionLoaded) {
    try {
      await auth.fetchSession()
    } catch {
      // Ignore and let redirect logic run below.
    }
  }

  if (!auth.user) {
    return navigateTo("/")
  }

})
