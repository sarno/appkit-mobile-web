<script setup lang="ts">
const {
  margins = true,
  label = ''
} = defineProps<{
  margins?: boolean
  label?: string
}>()
</script>

<template>
  <div :class="['relative flex items-center my-4', margins ? 'mx-4' : 'mx-0']">
    <div class="flex-grow border-t border-black/5 dark:border-white/5" />
    <span v-if="label" class="shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-[var(--color-theme-muted)]">
      {{ label }}
    </span>
    <div class="flex-grow border-t border-black/5 dark:border-white/5" />
  </div>
</template>
