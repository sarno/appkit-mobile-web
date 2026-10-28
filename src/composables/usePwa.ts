import { ref, onMounted } from 'vue'

export function usePwa() {
  const deferredPrompt = ref<any>(null)
  const isInstallable = ref(false)
  const isStandalone = ref(false)
  const isIOS = ref(false)

  onMounted(() => {
    isStandalone.value = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true

    isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      isInstallable.value = true
    })
  })

  async function promptInstall() {
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt()
      const { outcome } = await deferredPrompt.value.userChoice
      if (outcome === 'accepted') {
        isInstallable.value = false
      }
      deferredPrompt.value = null
    }
  }

  return {
    isInstallable,
    isStandalone,
    isIOS,
    promptInstall
  }
}
