<script setup lang="ts">
const {
  title = '',
  boxed = true
} = defineProps<{
  title?: string
  boxed?: boolean
}>()
</script>

<template>
  <div :class="boxed ? 'mx-4 mb-4' : 'mx-0 mb-4'">
    <h6 v-if="title" class="px-2 mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-theme-muted)]">
      {{ title }}
    </h6>
    <div class="bg-[var(--color-theme-card)] border border-black/5 dark:border-white/5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden divide-y divide-black/5 dark:divide-white/5"
         :class="boxed ? 'rounded-2xl' : 'rounded-none'">
      <slot />
    </div>
  </div>
</template>
