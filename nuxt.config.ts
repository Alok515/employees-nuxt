export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  routeRules: {
    "/employees": { swr: 60 }
  },
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '/api',
      companyName: 'Northridge People Co.'
    }
  }
})
