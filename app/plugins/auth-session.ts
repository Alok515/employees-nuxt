export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  if (auth.sessionLoaded) {
    return
  }

  try {
    await auth.fetchSession()
  } catch {
    // Keep app usable even if session bootstrap fails.
  }
})
