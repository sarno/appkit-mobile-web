<script setup lang="ts">
import { Star } from 'lucide-vue-next'

const rating = defineModel<number>({ default: 5 })

const {
  max = 5,
  readonly = false
} = defineProps<{
  max?: number
  readonly?: boolean
}>()

function setRating(val: number) {
  if (!readonly) {
    rating.value = val
  }
}
</script>

<template>
  <div class="inline-flex items-center space-x-1">
    <button 
      v-for="index in max" 
      :key="index"
      @click="setRating(index)"
      :disabled="readonly"
      type="button"
      class="p-0.5 transition-transform"
      :class="readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-90'"
    >
      <Star 
        class="w-4 h-4" 
        :class="index <= rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300 dark:text-neutral-700'"
      />
    </button>
  </div>
</template>
