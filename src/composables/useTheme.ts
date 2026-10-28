import { ref, onMounted } from 'vue'
import type { ThemeMode } from '@/types'

const currentTheme = ref<ThemeMode>('auto')
const isDark = ref(false)

export function useTheme() {
  function applyTheme(dark: boolean) {
    isDark.value = dark
    const root = document.documentElement
    
    root.classList.add('no-transitions')
    if (dark) {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      document.body.classList.add('theme-dark')
      document.body.classList.remove('theme-light')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
      document.body.classList.add('theme-light')
      document.body.classList.remove('theme-dark')
    }
    
    setTimeout(() => {
      root.classList.remove('no-transitions')
    }, 150)
  }

  function setTheme(mode: ThemeMode) {
    currentTheme.value = mode
    localStorage.setItem('appkit_theme', mode)

    if (mode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark)
    } else {
      applyTheme(mode === 'dark')
    }
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  onMounted(() => {
    const saved = (localStorage.getItem('appkit_theme') as ThemeMode) || 'auto'
    currentTheme.value = saved

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (currentTheme.value === 'auto') {
        applyTheme(e.matches)
      }
    })

    setTheme(saved)
  })

  return {
    currentTheme,
    isDark,
    setTheme,
    toggleTheme
  }
}
