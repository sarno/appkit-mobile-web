<script setup lang="ts">
import { onMounted } from 'vue'
import { useHighlight } from '@/composables/useHighlight'
import { useTheme } from '@/composables/useTheme'
import OfflineDetector from '@/components/feedback/OfflineDetector.vue'
import AppToast from '@/components/feedback/AppToast.vue'

const {
  maxWidth = 'max-w-md'
} = defineProps<{
  maxWidth?: string
}>()

const { initHighlight } = useHighlight()
useTheme() // Initialize dark/light mode

onMounted(() => {
  initHighlight()
})
</script>

<template>
  <div id="page" class="min-h-screen bg-neutral-200 dark:bg-black text-[var(--color-theme-text)] flex justify-center font-sans antialiased transition-colors duration-300">
    <div :class="['w-full', maxWidth, 'min-h-screen flex flex-col relative bg-[var(--color-theme-bg)] shadow-2xl overflow-x-hidden']">
      <OfflineDetector />
      <slot />
      <AppToast />
    </div>
  </div>
</template>
