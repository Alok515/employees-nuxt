import type { User } from "~~/types"

export const useAuthStore = defineStore("auth", () => {

  const user = ref<User | null>(null)

  const login = async (email:string,password:string) => {

    await $fetch("/api/login",{
      method:"POST",
      body:{email,password}
    })

    await fetchSession()
  }

  const fetchSession = async () => {
    const res = await $fetch("/api/session")
    user.value = res.user
  }

  return { user, login, fetchSession }

})