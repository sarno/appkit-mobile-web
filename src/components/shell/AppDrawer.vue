<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'
import { useHighlight } from '@/composables/useHighlight'
import { useTheme } from '@/composables/useTheme'
import type { HighlightColor } from '@/types'
import { X, Moon, Sun, Home, Layers, CheckSquare, Wallet, Palette } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const uiStore = useUiStore()
const router = useRouter()
const { currentHighlight, setHighlight } = useHighlight()
const { isDark, toggleTheme } = useTheme()

const colors: { name: HighlightColor; label: string; bg: string }[] = [
  { name: 'blue', label: 'Blue', bg: '#4A89DC' },
  { name: 'red', label: 'Red', bg: '#DA4453' },
  { name: 'green', label: 'Green', bg: '#8CC152' },
  { name: 'grass', label: 'Grass', bg: '#2ABA66' },
  { name: 'orange', label: 'Orange', bg: '#E9573F' },
  { name: 'yellow', label: 'Yellow', bg: '#F6BB42' },
  { name: 'teal', label: 'Teal', bg: '#7DB1B1' },
  { name: 'mint', label: 'Mint', bg: '#37BC9B' },
  { name: 'pink', label: 'Pink', bg: '#D770AD' },
  { name: 'magenta', label: 'Plum', bg: '#967ADC' }
]

function navigate(to: string) {
  uiStore.isDrawerOpen = false
  router.push(to)
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop Overlay -->
    <Transition name="fade">
      <div 
        v-if="uiStore.isDrawerOpen" 
        @click="uiStore.isDrawerOpen = false"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
      />
    </Transition>

    <!-- Drawer Body -->
    <Transition name="drawer-slide">
      <aside 
        v-if="uiStore.isDrawerOpen" 
        class="fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[80vw] bg-[var(--color-theme-card)] shadow-2xl flex flex-col justify-between overflow-y-auto"
      >
        <!-- Top Hero Card (AppKit Brand) -->
        <div>
          <div class="relative p-5 bg-[var(--color-highlight-gradient)] text-white">
            <button 
              @click="uiStore.isDrawerOpen = false" 
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white cursor-pointer active:scale-90 transition-transform"
            >
              <X class="w-4 h-4" />
            </button>
            <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
              <Layers class="w-6 h-6 text-white" />
            </div>
            <h2 class="text-xl font-black tracking-tight">AppKit Mobile</h2>
            <p class="text-xs text-white/80">Modern Vue 3.5 Component System</p>
          </div>

          <!-- Navigation Links -->
          <div class="p-3">
            <p class="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-theme-muted)]">
              Menu Utama
            </p>
            <nav class="space-y-1">
              <button 
                @click="navigate('/')"
                class="w-full px-3 py-2.5 rounded-xl flex items-center space-x-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 active:scale-98 transition-all cursor-pointer text-left"
              >
                <Home class="w-4.5 h-4.5 text-[var(--color-highlight)]" />
                <span class="text-[var(--color-theme-heading)]">Dashboard</span>
              </button>
              <button 
                @click="navigate('/components')"
                class="w-full px-3 py-2.5 rounded-xl flex items-center space-x-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 active:scale-98 transition-all cursor-pointer text-left"
              >
                <Layers class="w-4.5 h-4.5 text-[var(--color-highlight)]" />
                <span class="text-[var(--color-theme-heading)]">Semua Komponen</span>
              </button>
              <button 
                @click="navigate('/forms')"
                class="w-full px-3 py-2.5 rounded-xl flex items-center space-x-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 active:scale-98 transition-all cursor-pointer text-left"
              >
                <CheckSquare class="w-4.5 h-4.5 text-[var(--color-highlight)]" />
                <span class="text-[var(--color-theme-heading)]">Form & Input OTP</span>
              </button>
              <button 
                @click="navigate('/wallet')"
                class="w-full px-3 py-2.5 rounded-xl flex items-center space-x-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 active:scale-98 transition-all cursor-pointer text-left"
              >
                <Wallet class="w-4.5 h-4.5 text-[var(--color-highlight)]" />
                <span class="text-[var(--color-theme-heading)]">Fintech Wallet Demo</span>
              </button>
            </nav>

            <div class="my-3 border-t border-black/5 dark:border-white/5" />

            <!-- Highlight Colors Picker -->
            <p class="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-theme-muted)] flex items-center justify-between">
              <span>Warna Highlight</span>
              <Palette class="w-3.5 h-3.5 text-[var(--color-highlight)]" />
            </p>
            <div class="grid grid-cols-5 gap-2 px-3 py-2">
              <button 
                v-for="color in colors" 
                :key="color.name"
                @click="setHighlight(color.name)"
                class="w-8 h-8 rounded-full border-2 transition-transform cursor-pointer active:scale-90 flex items-center justify-center"
                :style="{ backgroundColor: color.bg }"
                :class="currentHighlight === color.name ? 'border-white ring-2 ring-black/40 scale-110' : 'border-transparent'"
                :title="color.label"
              />
            </div>
          </div>
        </div>

        <!-- Bottom Controls (Theme Switch) -->
        <div class="p-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
          <span class="text-xs font-semibold text-[var(--color-theme-heading)]">Mode Gelap</span>
          <button 
            @click="toggleTheme" 
            class="w-10 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 p-0.5 flex items-center transition-colors cursor-pointer"
          >
            <div 
              class="w-5 h-5 rounded-full bg-white dark:bg-[var(--color-highlight)] shadow-sm flex items-center justify-center transform transition-transform"
              :class="isDark ? 'translate-x-4' : 'translate-x-0'"
            >
              <Sun v-if="!isDark" class="w-3 h-3 text-amber-500" />
              <Moon v-else class="w-3 h-3 text-white" />
            </div>
          </button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.drawer-slide-enter-active, .drawer-slide-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer-slide-enter-from, .drawer-slide-leave-to { transform: translateX(-100%); }
</style>
