<script setup lang="ts">
import { useHaptic } from '@/composables/useHaptic'
import type { TabItem } from '@/types'

const activeTab = defineModel<string | number>({ required: true })

const {
  tabs,
  variant = 'pill'
} = defineProps<{
  tabs: TabItem[]
  variant?: 'pill' | 'underline'
}>()

const { trigger } = useHaptic()

function selectTab(id: string | number) {
  trigger('light')
  activeTab.value = id
}
</script>

<template>
  <div class="px-4 mb-4">
    <!-- Pill Segmented Variant -->
    <div 
      v-if="variant === 'pill'"
      class="flex items-center p-1 rounded-2xl bg-[var(--color-theme-card)] border border-black/5 dark:border-white/5 shadow-xs"
    >
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="selectTab(tab.id)"
        class="flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer relative"
        :class="[
          activeTab === tab.id 
            ? 'bg-[var(--color-highlight-gradient)] text-white shadow-sm' 
            : 'text-[var(--color-theme-muted)] hover:text-[var(--color-theme-text)]'
        ]"
      >
        <component :is="tab.icon" v-if="tab.icon" class="w-3.5 h-3.5" />
        <span>{{ tab.label }}</span>
        <span 
          v-if="tab.badge" 
          class="text-[9px] font-bold px-1.5 py-0.2 rounded-full"
          :class="activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[var(--color-theme-text)]'"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- Underline Variant -->
    <div 
      v-else
      class="flex border-b border-black/5 dark:border-white/5"
    >
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="selectTab(tab.id)"
        class="flex-1 pb-2.5 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer border-b-2"
        :class="[
          activeTab === tab.id 
            ? 'border-[var(--color-highlight)] text-[var(--color-highlight)]' 
            : 'border-transparent text-[var(--color-theme-muted)] hover:text-[var(--color-theme-text)]'
        ]"
      >
        <component :is="tab.icon" v-if="tab.icon" class="w-3.5 h-3.5" />
        <span>{{ tab.label }}</span>
      </button>
    </div>
  </div>
</template>
