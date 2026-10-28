<script setup lang="ts">
import AppShell from '@/components/shell/AppShell.vue'
import AppHeader from '@/components/shell/AppHeader.vue'
import AppFooterBar from '@/components/shell/AppFooterBar.vue'
import AppDrawer from '@/components/shell/AppDrawer.vue'
import ActionSheet from '@/components/shell/ActionSheet.vue'
import { useUiStore } from '@/stores/uiStore'
import { useHighlight } from '@/composables/useHighlight'
import type { HighlightColor, NavItem } from '@/types'
import { Home, Layers, CheckSquare, Wallet, Sparkles } from 'lucide-vue-next'

const {
  title = 'AppKit Vue'
} = defineProps<{
  title?: string
}>()

const uiStore = useUiStore()
const { currentHighlight, setHighlight } = useHighlight()

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, to: '/' },
  { id: 'components', label: 'Komponen', icon: Layers, to: '/components' },
  { id: 'quick', label: 'Action', icon: Sparkles, isCenterAction: true, action: () => { uiStore.isColorMenuOpen = true } },
  { id: 'forms', label: 'Forms', icon: CheckSquare, to: '/forms' },
  { id: 'wallet', label: 'Dompet', icon: Wallet, to: '/wallet', badge: 'New' }
]

const colors: { name: HighlightColor; label: string; bg: string }[] = [
  { name: 'blue', label: 'Biru Classic', bg: '#4A89DC' },
  { name: 'red', label: 'Merah Crimson', bg: '#DA4453' },
  { name: 'green', label: 'Hijau Apple', bg: '#8CC152' },
  { name: 'grass', label: 'Hijau Emerald', bg: '#2ABA66' },
  { name: 'orange', label: 'Oranye Sunset', bg: '#E9573F' },
  { name: 'yellow', label: 'Kuning Amber', bg: '#F6BB42' },
  { name: 'teal', label: 'Biru Teal', bg: '#7DB1B1' },
  { name: 'mint', label: 'Mint Turquoise', bg: '#37BC9B' },
  { name: 'pink', label: 'Pink Rose', bg: '#D770AD' },
  { name: 'magenta', label: 'Ungu Plum', bg: '#967ADC' }
]
</script>

<template>
  <AppShell>
    <!-- Top Header -->
    <AppHeader :title="title" />

    <!-- Main Scrollable Content -->
    <main class="flex-1 pt-[calc(var(--header-height)+8px)] pb-[calc(var(--footer-height)+16px)]">
      <slot />
    </main>

    <!-- Bottom Footer Bar (Style 6) -->
    <AppFooterBar :items="navItems" :style-variant="6" />

    <!-- Left Offcanvas Navigation Drawer -->
    <AppDrawer />

    <!-- Color Highlights Quick Action Sheet -->
    <ActionSheet v-model="uiStore.isColorMenuOpen" title="Pilih Warna Highlight" subtitle="Tema Visual Dinamis">
      <div class="grid grid-cols-2 gap-2.5">
        <button 
          v-for="color in colors" 
          :key="color.name"
          @click="setHighlight(color.name); uiStore.isColorMenuOpen = false"
          class="flex items-center space-x-3 p-3 rounded-xl border text-left active:scale-95 transition-all cursor-pointer"
          :class="currentHighlight === color.name ? 'border-[var(--color-highlight)] bg-[var(--color-highlight-fade)]' : 'border-black/5 dark:border-white/10 bg-[var(--color-theme-card)]'"
        >
          <div class="w-7 h-7 rounded-full shadow-xs shrink-0" :style="{ backgroundColor: color.bg }" />
          <span class="text-xs font-bold text-[var(--color-theme-heading)]">{{ color.label }}</span>
        </button>
      </div>
    </ActionSheet>
  </AppShell>
</template>
