<script setup lang="ts">
import { Plus, Minus } from 'lucide-vue-next'
import { useHaptic } from '@/composables/useHaptic'

const model = defineModel<number>({ default: 1 })

const {
  min = 1,
  max = 99,
  step = 1
} = defineProps<{
  min?: number
  max?: number
  step?: number
}>()

const { trigger } = useHaptic()

function increment() {
  if (model.value + step <= max) {
    trigger('light')
    model.value += step
  }
}

function decrement() {
  if (model.value - step >= min) {
    trigger('light')
    model.value -= step
  }
}
</script>

<template>
  <div class="inline-flex items-center rounded-xl bg-[var(--color-theme-card)] border border-black/10 dark:border-white/10 p-1 shadow-xs">
    <button 
      @click="decrement"
      :disabled="model <= min"
      class="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-theme-heading)] hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all disabled:opacity-30 cursor-pointer"
      aria-label="Kurangi"
    >
      <Minus class="w-4 h-4" />
    </button>
    <span class="w-10 text-center font-bold text-sm text-[var(--color-theme-heading)] select-none">
      {{ model }}
    </span>
    <button 
      @click="increment"
      :disabled="model >= max"
      class="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-theme-heading)] hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all disabled:opacity-30 cursor-pointer"
      aria-label="Tambah"
    >
      <Plus class="w-4 h-4" />
    </button>
  </div>
</template>
