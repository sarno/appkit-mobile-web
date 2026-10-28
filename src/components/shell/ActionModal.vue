<script setup lang="ts">
import { X, CheckCircle2, AlertTriangle, Info, AlertOctagon } from 'lucide-vue-next'

const isOpen = defineModel<boolean>({ default: false })

const {
  title = '',
  variant = 'info'
} = defineProps<{
  title?: string
  variant?: 'success' | 'warning' | 'danger' | 'info'
}>()

function close() {
  isOpen.value = false
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        @click="close"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      >
        <!-- Modal Card -->
        <Transition name="modal-pop">
          <div 
            @click.stop
            class="w-full max-w-xs bg-[var(--color-theme-card)] rounded-[24px] p-5 shadow-2xl border border-black/5 dark:border-white/10 text-center relative"
          >
            <button 
              @click="close"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
            >
              <X class="w-4.5 h-4.5" />
            </button>

            <!-- Status Icon -->
            <div class="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
              :class="[
                variant === 'success' && 'bg-green-100 text-green-600 dark:bg-green-950/60 dark:text-green-400',
                variant === 'warning' && 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
                variant === 'danger' && 'bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400',
                variant === 'info' && 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
              ]"
            >
              <CheckCircle2 v-if="variant === 'success'" class="w-7 h-7" />
              <AlertTriangle v-else-if="variant === 'warning'" class="w-7 h-7" />
              <AlertOctagon v-else-if="variant === 'danger'" class="w-7 h-7" />
              <Info v-else class="w-7 h-7" />
            </div>

            <h3 v-if="title" class="text-base font-bold text-[var(--color-theme-heading)] mb-1">
              {{ title }}
            </h3>

            <div class="text-xs text-[var(--color-theme-text)] mb-4">
              <slot />
            </div>

            <div v-if="$slots.footer" class="mt-4">
              <slot name="footer" />
            </div>
            <button 
              v-else 
              @click="close"
              class="w-full py-2.5 rounded-xl font-bold text-xs bg-[var(--color-highlight-gradient)] text-white shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              Mengerti
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-pop-enter-active, .modal-pop-leave-active { transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease; }
.modal-pop-enter-from, .modal-pop-leave-to { transform: scale(0.92); opacity: 0; }
</style>
