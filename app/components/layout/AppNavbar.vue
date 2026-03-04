<script setup lang="ts">
type NavLink = {
  label: string
  to: string
}

defineProps<{
  companyName: string
  isLoginScreen: boolean
  showLogout: boolean
  isLoggingOut: boolean
  navLinks: NavLink[]
}>()

const emit = defineEmits<{
  logout: []
}>()

const route = useRoute()
</script>

<template>
  <header class="mb-6 rounded-2xl border border-white/70 bg-white/85 px-4 py-4 shadow-sm backdrop-blur sm:px-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <NuxtLink to="/" class="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        {{ companyName }}
      </NuxtLink>

      <nav v-if="!isLoginScreen" class="flex flex-wrap items-center gap-2">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-2 text-sm font-medium transition"
          :class="route.path === link.to
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <button
        v-if="showLogout"
        type="button"
        :disabled="isLoggingOut"
        class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        @click="emit('logout')"
      >
        {{ isLoggingOut ? "Logging out..." : "Logout" }}
      </button>
    </div>
  </header>
</template>
