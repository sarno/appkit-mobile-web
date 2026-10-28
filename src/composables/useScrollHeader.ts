import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollHeader(threshold: number = 80) {
  const isHeaderActive = ref(false)

  const handleScroll = () => {
    isHeaderActive.value = window.scrollY > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { isHeaderActive }
}
