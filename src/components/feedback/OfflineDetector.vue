<script setup lang="ts">
import { useOffline } from '@/composables/useOffline'
import { WifiOff } from 'lucide-vue-next'

const { isOnline } = useOffline()
</script>

<template>
  <Transition name="slide-down">
    <div 
      v-if="!isOnline" 
      class="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto bg-red-600 text-white text-xs font-semibold px-4 py-2 flex items-center justify-center space-x-2 shadow-lg"
    >
      <WifiOff class="w-4 h-4 animate-pulse" />
      <span>Koneksi internet terputus. Mode offline aktif.</span>
    </div>
  </Transition>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { transform: translateY(-100%); opacity: 0; }
</style>
