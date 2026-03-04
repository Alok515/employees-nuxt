import type { User } from "~~/types"

export const useAuthStore = defineStore("auth", () => {
  const { $api } = useNuxtApp()

  const user = ref<User | null>(null)

  const login = async (email:string,password:string) => {

    await $api("/api/login",{
      method:"POST",
      body:{email,password}
    })

    await fetchSession()
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
