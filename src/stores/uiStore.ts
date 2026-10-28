import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isDrawerOpen = ref(false)
  const isFooterVisible = ref(true)
  const isHeaderVisible = ref(true)
  const isColorMenuOpen = ref(false)

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function toggleColorMenu() {
    isColorMenuOpen.value = !isColorMenuOpen.value
  }

  return {
    isDrawerOpen,
    isFooterVisible,
    isHeaderVisible,
    isColorMenuOpen,
    toggleDrawer,
    toggleColorMenu
  }
})
