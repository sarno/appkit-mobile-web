import { ref, computed } from 'vue'
import type { HighlightColor } from '@/types'

const activeHighlight = ref<HighlightColor>('blue')

export function useHighlight() {
  function setHighlight(color: HighlightColor) {
    activeHighlight.value = color
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-highlight', color)
      localStorage.setItem('appkit_highlight', color)
    }
  }

  function initHighlight() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('appkit_highlight') as HighlightColor
      if (saved) {
        setHighlight(saved)
      } else {
        setHighlight('blue')
      }
    }
  }

  return {
    currentHighlight: computed(() => activeHighlight.value),
    setHighlight,
    initHighlight
  }
}
