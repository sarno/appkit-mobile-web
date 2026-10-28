<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-vue-next'

const { toasts, remove } = useToast()
</script>

<template>
  <div class="fixed top-4 left-0 right-0 z-50 pointer-events-none flex flex-col items-center space-y-2 px-4 max-w-md mx-auto">
    <TransitionGroup name="toast">
      <div 
        v-for="item in toasts" 
        :key="item.id"
        class="pointer-events-auto w-full max-w-sm rounded-2xl py-3 px-4 shadow-xl flex items-center justify-between text-xs font-semibold backdrop-blur-xl border border-black/5 dark:border-white/10"
        :class="[
          item.type === 'success' && 'bg-green-600/90 text-white shadow-green-600/20',
          item.type === 'error' && 'bg-red-600/90 text-white shadow-red-600/20',
          item.type === 'warning' && 'bg-amber-600/90 text-white shadow-amber-600/20',
          item.type === 'info' && 'bg-[var(--color-highlight)] text-white shadow-[var(--color-highlight)]/20'
        ]"
      >
        <div class="flex items-center space-x-2.5">
          <CheckCircle2 v-if="item.type === 'success'" class="w-4.5 h-4.5 shrink-0" />
          <AlertOctagon v-else-if="item.type === 'error'" class="w-4.5 h-4.5 shrink-0" />
          <AlertTriangle v-else-if="item.type === 'warning'" class="w-4.5 h-4.5 shrink-0" />
          <Info v-else class="w-4.5 h-4.5 shrink-0" />
          <span>{{ item.message }}</span>
        </div>
        <button @click="remove(item.id)" class="p-1 rounded-full hover:bg-white/20 active:scale-90 cursor-pointer">
          <X class="w-3.5 h-3.5" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-enter-from { opacity: 0; transform: translateY(-16px) scale(0.95); }
.toast-leave-to { opacity: 0; transform: translateY(-8px) scale(0.95); }
</style>
