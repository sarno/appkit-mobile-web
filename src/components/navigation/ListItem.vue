<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import type { Component } from 'vue'

const {
  title,
  subtitle = '',
  icon = undefined,
  iconBg = '',
  avatarSrc = '',
  badge = '',
  showChevron = true,
  to = ''
} = defineProps<{
  title: string
  subtitle?: string
  icon?: Component
  iconBg?: string
  avatarSrc?: string
  badge?: string | number
  showChevron?: boolean
  to?: string
}>()

const router = useRouter()

function handleClick() {
  if (to) router.push(to)
}
</script>

<template>
  <component 
    :is="to ? 'button' : 'div'"
    @click="handleClick"
    class="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-black/2 dark:hover:bg-white/5 active:bg-black/5 dark:active:bg-white/10 transition-colors focus:outline-none cursor-pointer"
  >
    <div class="flex items-center space-x-3.5 flex-1 min-w-0 pr-2">
      <!-- Icon Container -->
      <div 
        v-if="icon" 
        class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
        :class="iconBg || 'bg-[var(--color-highlight-fade)] text-[var(--color-highlight)]'"
      >
        <component :is="icon" class="w-4.5 h-4.5" />
      </div>

      <!-- Avatar Image -->
      <img 
        v-else-if="avatarSrc" 
        :src="avatarSrc" 
        alt="Avatar" 
        class="w-9 h-9 rounded-xl object-cover shrink-0 border border-black/10 dark:border-white/10" 
      />

      <!-- Text Details -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-[var(--color-theme-heading)] truncate leading-snug">
          {{ title }}
        </p>
        <p v-if="subtitle" class="text-xs text-[var(--color-theme-muted)] truncate mt-0.5">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Right Controls -->
    <div class="flex items-center space-x-2 shrink-0">
      <span 
        v-if="badge" 
        class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-highlight-fade)] text-[var(--color-highlight)]"
      >
        {{ badge }}
      </span>
      <slot name="right" />
      <ChevronRight v-if="showChevron" class="w-4 h-4 text-gray-400 opacity-60" />
    </div>
  </component>
</template>
