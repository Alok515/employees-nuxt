import type { User } from "~~/types"

export const useAuthStore = defineStore("auth", () => {
  const { $api } = useNuxtApp()

  const user = ref<User | null>(null)
  const sessionLoaded = ref(false)

  const login = async (email:string,password:string) => {
    try {
      const res: { id: string; role: string } = await $api("/login",{
        method:"POST",
        body:{email,password}
      })

      user.value = {
        id: res.id,
        role: res.role
      }
      sessionLoaded.value = true

      await fetchSession()
    } catch (error: any) {
      const status = error?.statusCode ?? error?.status ?? error?.response?.status

      if (status === 401) {
        throw new Error("Wrong email or password")
      }

      throw new Error("Unable to sign in. Please try again.")
    }
  }

  const fetchSession = async () => {
    try {
      const res: { user: User | null } = await $api("/session")
      user.value = res.user
      sessionLoaded.value = true
    } catch (error) {
      user.value = null
      throw error
    }
  }

  const logout = async () => {
    await $api("/logout", {
      method: "POST"
    })
    user.value = null
    sessionLoaded.value = true
  }

  return { user, sessionLoaded, login, fetchSession, logout }

})
