<script setup lang="ts">
import { useId } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const model = defineModel<any>()

const {
  label,
  options
} = defineProps<{
  label: string
  options: { label: string; value: any }[]
}>()

const selectId = useId()
</script>

<template>
  <div class="mb-4 relative">
    <div class="relative flex items-center bg-[var(--color-theme-card)] rounded-xl border border-black/10 dark:border-white/10 py-2 px-3 focus-within:border-[var(--color-highlight)] focus-within:ring-2 focus-within:ring-[var(--color-highlight)]/20 transition-all">
      <div class="relative flex-1">
        <label :for="selectId" class="block text-[10px] font-semibold text-[var(--color-highlight)]">
          {{ label }}
        </label>
        <select 
          :id="selectId"
          v-model="model"
          class="w-full bg-transparent text-sm font-medium text-[var(--color-theme-heading)] focus:outline-none appearance-none pr-6 cursor-pointer"
        >
          <option v-for="opt in options" :key="opt.value" :value="opt.value" class="bg-[var(--color-theme-card)] text-[var(--color-theme-heading)]">
            {{ opt.label }}
          </option>
        </select>
      </div>
      <ChevronDown class="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
    </div>
  </div>
</template>
