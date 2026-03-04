import type { User } from "~~/types"

export const useAuthStore = defineStore("auth", () => {
  const { $api } = useNuxtApp()

  const user = ref<User | null>(null)

  const login = async (email:string,password:string) => {
    try {
      await $api("/api/login",{
        method:"POST",
        body:{email,password}
      })

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
    const res: { user: User | null } = await $api("/session")
    user.value = res.user
  }

  const logout = async () => {
    await $api("/api/logout", {
      method: "POST"
    })
    user.value = null
  }

  return { user, login, fetchSession, logout }

})
