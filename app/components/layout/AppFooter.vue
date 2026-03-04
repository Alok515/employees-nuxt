<script setup lang="ts">
defineProps<{
  companyName: string
  currentYear: number
}>()
</script>

<template>
  <footer class="mt-8 border-t border-slate-200/90 py-6 text-sm text-slate-600">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <p>© {{ currentYear }} {{ companyName }}.</p>
      <p>Built for modern employee operations.</p>
    </div>
  </footer>
</template>
