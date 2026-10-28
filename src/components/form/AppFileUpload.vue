<script setup lang="ts">
import { ref } from 'vue'
import { UploadCloud, Image, X } from 'lucide-vue-next'

const {
  accept = 'image/*',
  maxSizeMb = 5,
  label = 'Unggah Foto Profil'
} = defineProps<{
  accept?: string
  maxSizeMb?: number
  label?: string
}>()

const emit = defineEmits<{
  (e: 'change', file: File | null): void
}>()

const previewUrl = ref<string | null>(null)
const fileName = ref('')
const fileSize = ref('')
const fileType = ref('')
const errorMsg = ref('')

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    
    if (file.size > maxSizeMb * 1024 * 1024) {
      errorMsg.value = `Ukuran file melebihi batas ${maxSizeMb} MB`
      return
    }

    errorMsg.value = ''
    fileName.value = file.name
    fileSize.value = `${(file.size / 1024).toFixed(1)} KB`
    fileType.value = file.type

    if (file.type.startsWith('image/')) {
      previewUrl.value = URL.createObjectURL(file)
    }

    emit('change', file)
  }
}

function removeFile() {
  previewUrl.value = null
  fileName.value = ''
  fileSize.value = ''
  fileType.value = ''
  errorMsg.value = ''
  emit('change', null)
}
</script>

<template>
  <div class="mb-4">
    <label class="block text-xs font-semibold text-[var(--color-theme-heading)] mb-1.5">
      {{ label }}
    </label>

    <!-- Empty Upload State -->
    <div 
      v-if="!fileName"
      class="relative border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl p-5 text-center bg-[var(--color-theme-card)] hover:border-[var(--color-highlight)] transition-colors cursor-pointer"
    >
      <input 
        type="file" 
        :accept="accept"
        @change="handleFileChange"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div class="w-12 h-12 rounded-full bg-[var(--color-highlight-fade)] text-[var(--color-highlight)] mx-auto flex items-center justify-center mb-2">
        <UploadCloud class="w-6 h-6" />
      </div>
      <p class="text-xs font-bold text-[var(--color-theme-heading)]">Pilih atau Seret Foto ke Sini</p>
      <p class="text-[11px] text-[var(--color-theme-muted)] mt-0.5">Mendukung JPG, PNG, WEBP (Maks {{ maxSizeMb }} MB)</p>
    </div>

    <!-- Uploaded File State with Live Preview -->
    <div 
      v-else 
      class="flex items-center justify-between p-3 rounded-2xl bg-[var(--color-theme-card)] border border-black/5 dark:border-white/10 shadow-xs"
    >
      <div class="flex items-center space-x-3 min-w-0 pr-2">
        <img 
          v-if="previewUrl" 
          :src="previewUrl" 
          alt="Preview" 
          class="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10 shrink-0"
        />
        <div v-else class="w-12 h-12 rounded-xl bg-[var(--color-highlight-fade)] text-[var(--color-highlight)] flex items-center justify-center shrink-0">
          <Image class="w-6 h-6" />
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold text-[var(--color-theme-heading)] truncate">{{ fileName }}</p>
          <p class="text-[10px] text-[var(--color-theme-muted)] mt-0.5">{{ fileSize }} • {{ fileType }}</p>
        </div>
      </div>

      <button 
        @click="removeFile"
        class="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 active:scale-90 transition-transform cursor-pointer shrink-0"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <p v-if="errorMsg" class="text-[11px] text-red-500 mt-1 pl-1 font-semibold">
      {{ errorMsg }}
    </p>
  </div>
</template>
