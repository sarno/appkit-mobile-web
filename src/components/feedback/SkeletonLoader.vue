<script setup lang="ts">
const {
  lines = 3,
  avatar = false
} = defineProps<{
  lines?: number
  avatar?: boolean
}>()
</script>

<template>
  <div class="animate-pulse flex space-x-3 p-4 bg-[var(--color-theme-card)] rounded-2xl border border-black/5 dark:border-white/5 my-2">
    <div v-if="avatar" class="rounded-2xl bg-neutral-200 dark:bg-neutral-800 h-11 w-11 shrink-0" />
    <div class="flex-1 space-y-2 py-1">
      <div class="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full w-3/4" />
      <div v-for="i in lines" :key="i" class="h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full" :style="{ width: `${100 - (i * 15)}%` }" />
    </div>
  </div>
</template>
