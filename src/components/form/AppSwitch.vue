<script setup lang="ts">
import { useHaptic } from '@/composables/useHaptic'

const model = defineModel<boolean>({ default: false })

const {
  label = '',
  variant = 'ios'
} = defineProps<{
  label?: string
  variant?: 'ios' | 'android'
}>()

const { trigger } = useHaptic()

function toggle() {
  trigger('light')
  model.value = !model.value
}
</script>

<template>
  <div class="flex items-center justify-between cursor-pointer py-1" @click="toggle">
    <span v-if="label" class="text-sm font-medium text-[var(--color-theme-heading)] pr-3 select-none">
      {{ label }}
    </span>

    <!-- iOS Switch -->
    <div 
      v-if="variant === 'ios'"
      class="relative w-12 h-7 rounded-full transition-colors duration-200 p-0.5"
      :class="model ? 'bg-[var(--color-highlight)]' : 'bg-gray-300 dark:bg-gray-700'"
    >
      <div 
        class="w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200"
        :class="model ? 'translate-x-5' : 'translate-x-0'"
      />
    </div>

    <!-- Android Material Switch -->
    <div 
      v-else
      class="relative w-11 h-4 rounded-full transition-colors duration-200"
      :class="model ? 'bg-[var(--color-highlight-fade)]' : 'bg-gray-300 dark:bg-gray-700'"
    >
      <div 
        class="absolute -top-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-200"
        :class="[
          model ? 'translate-x-5 bg-[var(--color-highlight)]' : 'translate-x-0 bg-white dark:bg-gray-400'
        ]"
      />
    </div>
  </div>
</template>
