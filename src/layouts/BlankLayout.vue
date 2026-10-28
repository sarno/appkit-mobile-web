<script setup lang="ts">
import AppShell from '@/components/shell/AppShell.vue'
</script>

<template>
  <AppShell>
    <main class="min-h-screen flex flex-col justify-center">
      <slot />
    </main>
  </AppShell>
</template>
