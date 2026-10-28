<script setup lang="ts">
const {
  variant = 'highlight'
} = defineProps<{
  variant?: 'highlight' | 'success' | 'warning' | 'danger' | 'neutral'
}>()
</script>

<template>
  <span 
    class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-xs"
    :class="[
      variant === 'highlight' && 'bg-[var(--color-highlight-fade)] text-[var(--color-highlight)]',
      variant === 'success' && 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
      variant === 'warning' && 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
      variant === 'danger' && 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
      variant === 'neutral' && 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
    ]"
  >
    <slot />
  </span>
</template>
