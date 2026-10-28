<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { Component } from 'vue'

const {
  title,
  subtitle = '',
  icon = undefined,
  defaultOpen = false
} = defineProps<{
  title: string
  subtitle?: string
  icon?: Component
  defaultOpen?: boolean
}>()

const isOpen = ref(defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="border-b border-black/5 dark:border-white/5 last:border-b-0">
    <button 
      @click="toggle"
      class="w-full py-3.5 px-4 flex items-center justify-between text-left hover:bg-black/2 dark:hover:bg-white/5 cursor-pointer transition-colors"
    >
      <div class="flex items-center space-x-3">
        <component :is="icon" v-if="icon" class="w-4.5 h-4.5 text-[var(--color-highlight)]" />
        <div>
          <span class="text-sm font-semibold text-[var(--color-theme-heading)]">{{ title }}</span>
          <p v-if="subtitle" class="text-xs text-[var(--color-theme-muted)] mt-0.5">{{ subtitle }}</p>
        </div>
      </div>
      <ChevronDown 
        class="w-4 h-4 text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }" 
      />
    </button>
    
    <div 
      v-show="isOpen"
      class="px-4 pb-4 pt-1 text-xs text-[var(--color-theme-text)] leading-relaxed"
    >
      <slot />
    </div>
  </div>
</template>
