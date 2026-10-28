import { ref } from 'vue'
import type { ToastItem } from '@/types'

const toasts = ref<ToastItem[]>([])

export function useToast() {
  function show(message: string, type: ToastItem['type'] = 'info', duration: number = 3000) {
    const id = Math.random().toString(36).substring(2, 9)
    const item: ToastItem = { id, message, type, duration }
    toasts.value.push(item)

    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
    return id
  }

  function remove(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    show,
    remove,
    success: (msg: string, d?: number) => show(msg, 'success', d),
    error: (msg: string, d?: number) => show(msg, 'error', d),
    warning: (msg: string, d?: number) => show(msg, 'warning', d),
    info: (msg: string, d?: number) => show(msg, 'info', d)
  }
}
