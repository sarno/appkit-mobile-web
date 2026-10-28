<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { X } from 'lucide-vue-next'

const isOpen = defineModel<boolean>({ default: false })

const {
  title = '',
  subtitle = '',
  detached = true
} = defineProps<{
  title?: string
  subtitle?: string
  detached?: boolean
}>()

const sheetRef = useTemplateRef<HTMLDivElement>('sheetEl')
let startY = 0
let currentTranslateY = 0

function close() {
  isOpen.value = false
}

function onTouchStart(e: TouchEvent) {
  startY = e.touches[0].clientY
}

function onTouchMove(e: TouchEvent) {
  const deltaY = e.touches[0].clientY - startY
  if (deltaY > 0 && sheetRef.value) {
    currentTranslateY = deltaY
    sheetRef.value.style.transform = `translateY(${deltaY}px)`
  }
}

function onTouchEnd() {
  if (currentTranslateY > 90) {
    close()
  }
  if (sheetRef.value) {
    sheetRef.value.style.transform = ''
  }
  currentTranslateY = 0
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop Overlay -->
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        @click="close"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
      />
    </Transition>

    <!-- Bottom Sheet Content -->
    <Transition name="sheet-slide">
      <div 
        v-if="isOpen" 
        ref="sheetEl"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        class="fixed z-50 max-w-md mx-auto bg-[var(--color-theme-card)] shadow-2xl transition-transform"
        :class="[
          detached 
            ? 'left-3 right-3 bottom-5 rounded-[22px] border border-black/5 dark:border-white/10' 
            : 'left-0 right-0 bottom-0 rounded-t-[28px] border-t border-black/5 dark:border-white/10'
        ]"
      >
        <!-- Pull Handle Indicator -->
        <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mt-3 mb-1 cursor-grab" />

        <!-- Header -->
        <div v-if="title || $slots.header" class="px-5 pt-2 pb-3 flex items-center justify-between border-b border-black/5 dark:border-white/5">
          <slot name="header">
            <div>
              <p v-if="subtitle" class="text-xs font-semibold text-[var(--color-highlight)]">{{ subtitle }}</p>
              <h3 class="text-base font-bold text-[var(--color-theme-heading)]">{{ title }}</h3>
            </div>
            <button @click="close" class="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer">
              <X class="w-5 h-5" />
            </button>
          </slot>
        </div>

        <!-- Body -->
        <div class="p-5 max-h-[75vh] overflow-y-auto overscroll-contain">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.sheet-slide-enter-active, .sheet-slide-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.sheet-slide-enter-from, .sheet-slide-leave-to { transform: translateY(110%); }
</style>
