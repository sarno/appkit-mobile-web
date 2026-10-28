<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useHaptic } from '@/composables/useHaptic'
import type { NavItem } from '@/types'

const {
  items,
  styleVariant = 6
} = defineProps<{
  items: NavItem[]
  styleVariant?: 1 | 2 | 3 | 4 | 5 | 6
}>()

const route = useRoute()
const router = useRouter()
const { trigger } = useHaptic()

function onItemClick(item: NavItem) {
  trigger('light')
  if (item.action) {
    item.action()
  } else if (item.to) {
    router.push(item.to)
  }
}

function isActive(item: NavItem) {
  if (!item.to) return false
  if (item.to === '/') return route.path === '/'
  return route.path === item.to || route.path.startsWith(item.to + '/')
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto h-[var(--footer-height)] pb-[calc(var(--sab)*1.1)] glass-panel border-t border-black/5 dark:border-white/5 flex items-center justify-around px-2 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
    <template v-for="item in items" :key="item.id">
      
      <!-- Special Elevated Center Circle Button (Signature Style 6) -->
      <div v-if="styleVariant === 6 && item.isCenterAction" class="relative -top-5 flex flex-col items-center">
        <button 
          @click="onItemClick(item)"
          class="w-13 h-13 rounded-full bg-[var(--color-highlight-gradient)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-highlight)]/35 active:scale-90 transition-transform cursor-pointer"
          :aria-label="item.label"
        >
          <component :is="item.icon" class="w-6 h-6 text-white" />
        </button>
        <span class="text-[10px] font-medium mt-1 text-[var(--color-theme-text)] opacity-80">{{ item.label }}</span>
      </div>

      <!-- Standard Navigation Item -->
      <button 
        v-else 
        @click="onItemClick(item)"
        class="relative flex-1 flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer select-none"
        :class="[
          isActive(item) ? 'text-[var(--color-highlight)] font-semibold' : 'text-[var(--color-theme-muted)] hover:text-[var(--color-theme-text)]'
        ]"
      >
        <!-- Icon & Badge Container -->
        <div class="relative flex items-center justify-center">
          <component 
            :is="item.icon" 
            class="w-5 h-5 transition-transform duration-200" 
            :class="{ 'scale-110': isActive(item) }" 
          />
          <span 
            v-if="item.badge" 
            class="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center shadow-xs"
          >
            {{ item.badge }}
          </span>
        </div>

        <!-- Label -->
        <span class="text-[10px] mt-0.5 tracking-tight">{{ item.label }}</span>

        <!-- Active Bottom Indicator Line (Style 6 & Style 5) -->
        <span 
          v-if="isActive(item) && (styleVariant === 6 || styleVariant === 5)" 
          class="absolute bottom-1 w-6 h-0.75 rounded-full bg-[var(--color-highlight)] transition-all"
        />
      </button>
    </template>
  </nav>
</template>
