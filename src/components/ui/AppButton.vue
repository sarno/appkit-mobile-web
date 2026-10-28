<script setup lang="ts">
import { useHaptic } from '@/composables/useHaptic'

const {
  variant = 'highlight',
  size = 'md',
  full = false,
  rounded = 'md',
  disabled = false
} = defineProps<{
  variant?: 'highlight' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent): void
}>()

const { trigger } = useHaptic()

function handleClick(e: MouseEvent) {
  if (!disabled) {
    trigger('light')
    emit('click', e)
  }
}

const sizeClasses = {
  sm: 'py-1.5 px-3 text-xs',
  md: 'py-2.5 px-4 text-xs font-bold',
  lg: 'py-3.5 px-6 text-sm font-bold'
}

const roundedClasses = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full'
}
</script>

<template>
  <button 
    @click="handleClick"
    :disabled="disabled"
    class="inline-flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-97 select-none disabled:opacity-40 disabled:cursor-not-allowed"
    :class="[
      sizeClasses[size],
      roundedClasses[rounded],
      full ? 'w-full' : '',
      variant === 'highlight' && 'bg-[var(--color-highlight-gradient)] text-white shadow-md shadow-[var(--color-highlight)]/25 hover:brightness-105',
      variant === 'outline' && 'border-2 border-[var(--color-highlight)] text-[var(--color-highlight)] hover:bg-[var(--color-highlight-fade)]',
      variant === 'ghost' && 'text-[var(--color-theme-heading)] hover:bg-black/5 dark:hover:bg-white/5',
      variant === 'danger' && 'bg-red-600 text-white shadow-md shadow-red-600/25',
      variant === 'success' && 'bg-green-600 text-white shadow-md shadow-green-600/25'
    ]"
  >
    <slot />
  </button>
</template>
