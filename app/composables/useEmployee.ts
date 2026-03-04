import type { Employee } from "~~/types"


export const useEmployees = () => {

  const employees = ref<Employee[]>([])
  const total = ref(0)
  const loading = ref(false)

  const { $api } = useNuxtApp()

  const fetchEmployees = async (page = 1) => {

    loading.value = true

    try {

      const res: { data: Employee[], total: number }  = await $api(`/employees?page=${page}`)

      employees.value = res.data
      total.value = res.total

    } catch (error) {

      console.error("Failed to fetch employees", error)

    } finally {

      loading.value = false

    }

  }

  return {
    employees,
    total,
    loading,
    fetchEmployees
  }

}