export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '/api',
      companyName: 'Alok People Co.'
    }
  }
})
