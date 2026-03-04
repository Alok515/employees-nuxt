export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: config.public.apiBase,

        retry: 2,
        retryDelay: 300,

        onRequest({ options }) {
            options.headers = {
                ...options.headers,
            }
        },

        onResponseError({ response }) {

            if (response.status === 401) {
                navigateTo("/")
            }

            if (response.status >= 500) {
                console.error("Server error")
            }

        }

    })

    return {
        provide: {
            api
        }
    }
})
