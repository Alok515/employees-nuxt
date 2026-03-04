<script setup lang="ts">
defineProps({
  error: Object
})
</script>

<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold">Something went wrong</h1>
    <p>{{ error?.message }}</p>

    <button @click="clearError({ redirect: '/' })">
      Go Home
    </button>
  </div>
</template>