<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

const model = defineModel<string>({ default: '' })

const {
  placeholder = 'Cari apapun di AppKit...',
  trendingTags = []
} = defineProps<{
  placeholder?: string
  trendingTags?: string[]
}>()

function clear() {
  model.value = ''
}

function selectTag(tag: string) {
  model.value = tag
}
</script>

<template>
  <div class="px-4 mb-3">
    <!-- Input Box -->
    <div class="relative flex items-center bg-[var(--color-theme-card)] rounded-2xl border border-black/5 dark:border-white/5 px-3.5 py-2.5 shadow-xs focus-within:ring-2 focus-within:ring-[var(--color-highlight)]/20 focus-within:border-[var(--color-highlight)] transition-all">
      <Search class="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
      <input 
        type="text" 
        v-model="model"
        :placeholder="placeholder"
        class="w-full bg-transparent text-sm text-[var(--color-theme-heading)] placeholder:text-gray-400 focus:outline-none"
      />
      <button 
        v-if="model" 
        @click="clear"
        class="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
      >
        <X class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Trending Tags -->
    <div v-if="trendingTags.length > 0 && !model" class="flex items-center space-x-1.5 mt-2.5 overflow-x-auto no-scrollbar pb-1">
      <span class="text-[10px] font-bold text-[var(--color-theme-muted)] uppercase shrink-0">Populer:</span>
      <button 
        v-for="tag in trendingTags" 
        :key="tag"
        @click="selectTag(tag)"
        class="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--color-theme-card)] border border-black/5 dark:border-white/5 text-[var(--color-theme-heading)] shrink-0 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
      >
        #{{ tag }}
      </button>
    </div>
  </div>
</template>
