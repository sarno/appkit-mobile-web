<script setup lang="ts">
const isOpen = defineModel<boolean>({ default: false })

const {
  message = '',
  actionText = 'Tutup'
} = defineProps<{
  message: string
  actionText?: string
}>()

const emit = defineEmits<{
  (e: 'action'): void
}>()

function onAction() {
  emit('action')
  isOpen.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div 
        v-if="isOpen"
        class="fixed bottom-[calc(var(--footer-height)+16px)] left-4 right-4 z-50 max-w-sm mx-auto p-3.5 rounded-2xl bg-neutral-900/90 dark:bg-neutral-100/95 text-white dark:text-neutral-900 shadow-2xl backdrop-blur-xl flex items-center justify-between space-x-3 text-xs"
      >
        <span class="font-medium truncate">{{ message }}</span>
        <button 
          @click="onAction"
          class="font-bold text-[var(--color-highlight)] dark:text-[var(--color-highlight-light)] uppercase tracking-wider text-[11px] shrink-0 cursor-pointer active:scale-95"
        >
          {{ actionText }}
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
