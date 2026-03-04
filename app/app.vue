<template>
  <div
    class="relative min-h-screen overflow-x-hidden bg-slate-100 text-slate-800 [font-family:'Sora','Manrope','Avenir_Next','Segoe_UI',sans-serif]"
  >
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute -left-24 top-[-7rem] h-72 w-72 rounded-full bg-cyan-200/60 blur-3xl" />
      <div class="absolute right-[-6rem] top-20 h-80 w-80 rounded-full bg-amber-200/70 blur-3xl" />
      <div class="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-emerald-200/60 blur-3xl" />
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <NuxtErrorBoundary>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>
