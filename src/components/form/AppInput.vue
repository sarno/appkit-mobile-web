<script setup lang="ts">
import { ref, computed, useId } from 'vue'
import { Check, X } from 'lucide-vue-next'
import type { Component } from 'vue'

const model = defineModel<string | number>({ default: '' })

const {
  label,
  type = 'text',
  icon = undefined,
  required = false,
  valid = null,
  errorMessage = ''
} = defineProps<{
  label: string
  type?: string
  icon?: Component
  required?: boolean
  valid?: boolean | null
  errorMessage?: string
}>()

const inputId = useId()
const isFocused = ref(false)
const hasValue = computed(() => model.value !== '' && model.value !== null && model.value !== undefined)
const isFloating = computed(() => isFocused.value || hasValue.value)
</script>

<template>
  <div class="mb-4 relative">
    <div 
      class="relative flex items-center bg-[var(--color-theme-card)] rounded-xl border transition-all duration-200"
      :class="[
        valid === true && 'border-green-500 ring-1 ring-green-500/20',
        valid === false && 'border-red-500 ring-1 ring-red-500/20',
        valid === null && isFocused && 'border-[var(--color-highlight)] ring-2 ring-[var(--color-highlight)]/20',
        valid === null && !isFocused && 'border-black/10 dark:border-white/10'
      ]"
    >
      <!-- Leading Icon -->
      <div v-if="icon" class="pl-3.5 pr-1 text-[var(--color-theme-muted)]">
        <component :is="icon" class="w-5 h-5" />
      </div>

      <!-- Input Element & Floating Label -->
      <div class="relative flex-1 py-2 px-3">
        <input 
          :id="inputId"
          :type="type" 
          v-model="model"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="w-full bg-transparent pt-3 pb-1 text-sm text-[var(--color-theme-heading)] focus:outline-none placeholder-transparent"
          placeholder=" "
        />
        <label 
          :for="inputId"
          class="absolute left-3 transition-all duration-200 pointer-events-none select-none text-xs"
          :class="[
            isFloating 
              ? 'top-1 text-[10px] font-semibold text-[var(--color-highlight)]' 
              : 'top-3.5 text-sm text-[var(--color-theme-muted)]',
            valid === false && 'text-red-500!'
          ]"
        >
          {{ label }} <span v-if="required" class="text-red-500">*</span>
        </label>
      </div>

      <!-- Validation Icons -->
      <div class="pr-3 flex items-center">
        <Check v-if="valid === true" class="w-4 h-4 text-green-500" />
        <X v-else-if="valid === false" class="w-4 h-4 text-red-500" />
      </div>
    </div>

    <!-- Error message caption -->
    <p v-if="errorMessage && valid === false" class="text-[11px] text-red-500 mt-1 pl-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
