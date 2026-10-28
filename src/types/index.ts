import type { Component } from 'vue'

export type HighlightColor = 
  | 'blue' | 'red' | 'green' | 'grass' | 'orange' 
  | 'yellow' | 'sunny' | 'teal' | 'mint' | 'pink' 
  | 'pink2' | 'magenta' | 'brown' | 'gray' | 'aqua' | 'night' | 'dark'

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface NavItem {
  id: string
  label: string
  icon: Component
  to?: string
  isCenterAction?: boolean
  badge?: number | string
  action?: () => void
}

export interface TabItem {
  id: string | number
  label: string
  icon?: Component
  badge?: string | number
}

export interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}
