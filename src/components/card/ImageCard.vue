<script setup lang="ts">
import { computed } from 'vue'

const {
  src,
  height = 300,
  overlay = 'gradient',
  overlayOpacity = 70,
  effect = 'none',
  boxed = true
} = defineProps<{
  src: string
  height?: 'cover' | 'cover-card' | 'cover-full' | number
  overlay?: 'gradient' | 'black' | 'white' | 'none'
  overlayOpacity?: number
  effect?: 'scale' | 'rotate' | 'blur' | 'grayscale' | 'none'
  boxed?: boolean
}>()

const heightClass = computed(() => {
  if (height === 'cover' || height === 'cover-full') return 'min-h-[85vh]'
  if (height === 'cover-card') return 'min-h-[calc(100vh-220px)]'
  return ''
})

const heightStyle = computed(() => {
  if (typeof height === 'number') {
    return { height: `${height}px` }
  }
  return {}
})
</script>

<template>
  <div 
    class="relative overflow-hidden flex flex-col justify-between group transition-all duration-300"
    :class="[
      boxed ? 'mx-4 mb-4 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.12)]' : 'mx-0 mb-4 rounded-none',
      heightClass
    ]"
    :style="heightStyle"
  >
    <!-- Background Image -->
    <img 
      :src="src" 
      alt="Card Background" 
      class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 will-change-transform"
      :class="[
        effect === 'scale' && 'group-hover:scale-105 active:scale-105',
        effect === 'rotate' && 'group-hover:rotate-1 group-hover:scale-105',
        effect === 'blur' && 'filter blur-[1px] group-hover:blur-none',
        effect === 'grayscale' && 'filter grayscale group-hover:grayscale-0'
      ]"
    />

    <!-- Overlays -->
    <div 
      v-if="overlay !== 'none'"
      class="absolute inset-0 z-1 pointer-events-none transition-opacity"
      :class="[
        overlay === 'gradient' && 'bg-gradient-to-t from-black/90 via-black/40 to-transparent',
        overlay === 'black' && 'bg-black',
        overlay === 'white' && 'bg-white'
      ]"
      :style="{ opacity: overlayOpacity / 100 }"
    />

    <!-- Card Top Slot -->
    <div class="relative z-10 p-4">
      <slot name="top" />
    </div>

    <!-- Card Center Slot -->
    <div class="relative z-10 p-4 my-auto">
      <slot name="center" />
    </div>

    <!-- Card Bottom Slot -->
    <div class="relative z-10 p-4">
      <slot name="bottom">
        <slot />
      </slot>
    </div>
  </div>
</template>
