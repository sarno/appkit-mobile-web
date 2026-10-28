<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const model = defineModel<string>({ default: '' })

const {
  length = 4
} = defineProps<{
  length?: number
}>()

const emit = defineEmits<{
  (e: 'complete', code: string): void
}>()

const digits = ref<string[]>(Array(length).fill(''))
const inputRefs = ref<HTMLInputElement[]>([])

watch(model, (newVal) => {
  if (newVal) {
    const arr = newVal.slice(0, length).split('')
    digits.value = [...arr, ...Array(length - arr.length).fill('')]
  }
})

onMounted(() => {
  if (model.value) {
    const arr = model.value.slice(0, length).split('')
    digits.value = [...arr, ...Array(length - arr.length).fill('')]
  }
})

function onInput(index: number, e: Event) {
  const val = (e.target as HTMLInputElement).value.slice(-1)
  digits.value[index] = val
  emitValue()

  if (val && index < length - 1) {
    inputRefs.value[index + 1]?.focus()
  }
}

function onKeyDown(index: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text') || ''
  const clean = pasted.replace(/\D/g, '').slice(0, length)
  clean.split('').forEach((char, i) => {
    digits.value[i] = char
  })
  emitValue()
  inputRefs.value[Math.min(clean.length, length - 1)]?.focus()
}

function emitValue() {
  const fullCode = digits.value.join('')
  model.value = fullCode
  if (fullCode.length === length && !digits.value.includes('')) {
    emit('complete', fullCode)
  }
}
</script>

<template>
  <div class="flex items-center justify-center space-x-3 my-4" @paste="onPaste">
    <input 
      v-for="(_, index) in length" 
      :key="index"
      :ref="(el) => { if (el) inputRefs[index] = el as HTMLInputElement }"
      type="tel"
      inputmode="numeric"
      maxlength="1"
      :value="digits[index]"
      @input="onInput(index, $event)"
      @keydown="onKeyDown(index, $event)"
      @focus="(e) => (e.target as HTMLInputElement).select()"
      class="w-13 h-14 text-center text-2xl font-black rounded-2xl bg-[var(--color-theme-card)] border-2 border-black/10 dark:border-white/10 text-[var(--color-theme-heading)] focus:border-[var(--color-highlight)] focus:ring-4 focus:ring-[var(--color-highlight)]/15 focus:outline-none transition-all shadow-xs"
    />
  </div>
</template>
