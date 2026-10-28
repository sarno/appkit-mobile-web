<script setup lang="ts">
const {
  boxed = true,
  rounded = 'lg',
  elevation = 1,
  colorVariant = 'default'
} = defineProps<{
  boxed?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  elevation?: 0 | 1 | 2 | 3
  colorVariant?: 'default' | 'highlight' | 'dark' | 'fade'
}>()

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-[20px]',
  xl: 'rounded-[30px]'
}

const elevationMap = {
  0: 'shadow-none',
  1: 'shadow-[0_2px_14px_rgba(0,0,0,0.06)]',
  2: 'shadow-[0_5px_20px_rgba(0,0,0,0.10)]',
  3: 'shadow-[0_8px_30px_rgba(0,0,0,0.14)]'
}
</script>

<template>
  <div 
    class="relative overflow-hidden transition-all duration-200"
    :class="[
      boxed ? 'mx-4 mb-4' : 'mx-0 mb-4 rounded-none',
      boxed ? roundedMap[rounded] : '',
      elevationMap[elevation],
      colorVariant === 'default' && 'bg-[var(--color-theme-card)] text-[var(--color-theme-text)] border border-black/5 dark:border-white/5',
      colorVariant === 'highlight' && 'bg-[var(--color-highlight-gradient)] text-white',
      colorVariant === 'fade' && 'bg-[var(--color-highlight-fade)] text-[var(--color-highlight)]',
      colorVariant === 'dark' && 'bg-[#1b1d21] text-white'
    ]"
  >
    <div class="p-4.5">
      <slot />
    </div>
  </div>
</template>
