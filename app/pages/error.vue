<script setup lang="ts">
defineProps({
  error: Object
})
</script>

<template>
  <section class="mx-auto flex w-full max-w-2xl items-center py-2">
    <div class="w-full rounded-3xl border border-rose-200/60 bg-white/90 p-8 text-center shadow-[0_16px_40px_-30px_rgba(244,63,94,0.55)]">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">Error</p>
      <h1 class="mt-4 text-3xl font-semibold text-slate-900">Something went wrong</h1>
      <p class="mt-3 text-sm text-slate-600">{{ error?.message }}</p>

      <button @click="clearError({ redirect: '/' })" class="mt-8 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
        Go Home
      </button>
    </div>
  </section>
</template>
