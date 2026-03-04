export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  routeRules: {
    "/employees": { swr: 60 }
  },
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '/api'
    }
  }
})