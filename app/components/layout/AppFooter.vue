<script setup lang="ts">
defineProps<{
  companyName: string
  currentYear: number
}>()
</script>

<template>
  <footer class="mt-auto border-t border-slate-200/90 bg-white/55 py-6 text-sm text-slate-600 backdrop-blur">
    <div class="flex flex-wrap items-center justify-between gap-2 px-4">
      <p>© {{ currentYear }} {{ companyName }}.</p>
      <p>Built for modern employee operations.</p>
    </div>
  </footer>
</template>
