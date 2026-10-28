<script setup lang="ts">
const {
  title,
  subtitle = '',
  sticky = false
} = defineProps<{
  title: string
  subtitle?: string
  sticky?: boolean
}>()
</script>

<template>
  <div 
    class="px-4.5 pt-4 pb-2 flex items-center justify-between"
    :class="sticky ? 'sticky top-[var(--header-height)] z-30 glass-panel border-b border-black/5 dark:border-white/5' : ''"
  >
    <div>
      <p v-if="subtitle" class="text-xs font-semibold tracking-wide uppercase text-[var(--color-highlight)] mb-0.5">
        {{ subtitle }}
      </p>
      <h1 class="text-2xl font-extrabold tracking-tight text-[var(--color-theme-heading)]">
        {{ title }}
      </h1>
    </div>

    <!-- Action Icons Slot -->
    <div v-if="$slots.actions" class="flex items-center space-x-2">
      <slot name="actions" />
    </div>
  </div>
</template>
