<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useScrollHeader } from '@/composables/useScrollHeader'
import { useTheme } from '@/composables/useTheme'
import { useUiStore } from '@/stores/uiStore'
import { ChevronLeft, Menu, Moon, Sun, Palette } from 'lucide-vue-next'

const {
  title = '',
  showBack = true,
  autoShowOnScroll = false,
  scrollThreshold = 80,
  transparent = false
} = defineProps<{
  title?: string
  showBack?: boolean
  autoShowOnScroll?: boolean
  scrollThreshold?: number
  transparent?: boolean
}>()

const emit = defineEmits<{
  (e: 'back'): void
}>()

const router = useRouter()
const { isHeaderActive } = useScrollHeader(scrollThreshold)
const { isDark, toggleTheme } = useTheme()
const uiStore = useUiStore()

function handleBack() {
  emit('back')
  if (showBack) {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }
}
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-40 max-w-md mx-auto h-[var(--header-height)] pt-[calc(var(--sat)*0.8)] px-3 flex items-center justify-between border-b transition-all duration-300"
    :class="[
      transparent && !isHeaderActive 
        ? 'bg-transparent border-transparent text-white' 
        : 'glass-panel border-black/5 dark:border-white/5 text-[var(--color-theme-heading)] shadow-xs',
      autoShowOnScroll && !isHeaderActive ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 pointer-events-auto translate-y-0'
    ]"
  >
    <!-- Left Button (Back / Custom) -->
    <div class="flex items-center min-w-[36px]">
      <slot name="left">
        <button 
          v-if="showBack" 
          @click="handleBack"
          class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-transform cursor-pointer"
          aria-label="Kembali"
        >
          <ChevronLeft class="w-5 h-5 text-current" />
        </button>
      </slot>
    </div>

    <!-- Center Title / Logo -->
    <div class="flex-1 text-center font-bold text-sm tracking-tight truncate px-2 text-[var(--color-theme-heading)]">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>

    <!-- Right Controls -->
    <div class="flex items-center justify-end min-w-[36px] space-x-1">
      <slot name="right">
        <!-- Palette button for Color Highlights -->
        <button 
          @click="uiStore.toggleColorMenu"
          class="w-8 h-8 rounded-full flex items-center justify-center text-current hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-transform cursor-pointer"
          aria-label="Ubah Warna Highlight"
        >
          <Palette class="w-4 h-4 text-[var(--color-highlight)]" />
        </button>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme"
          class="w-8 h-8 rounded-full flex items-center justify-center text-current hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-transform cursor-pointer"
          aria-label="Ganti Tema"
        >
          <Sun v-if="isDark" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4 text-slate-700" />
        </button>

        <!-- Drawer Toggle -->
        <button 
          @click="uiStore.toggleDrawer"
          class="w-8 h-8 rounded-full flex items-center justify-center text-current hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-transform cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu class="w-4.5 h-4.5" />
        </button>
      </slot>
    </div>
  </header>
</template>
