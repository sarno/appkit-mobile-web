<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PageTitle from '@/components/shell/PageTitle.vue'
import AppCard from '@/components/card/AppCard.vue'
import AppInput from '@/components/form/AppInput.vue'
import AppSelect from '@/components/form/AppSelect.vue'
import AppSwitch from '@/components/form/AppSwitch.vue'
import AppOtpInput from '@/components/form/AppOtpInput.vue'
import AppStepper from '@/components/form/AppStepper.vue'
import AppFileUpload from '@/components/form/AppFileUpload.vue'
import StarRating from '@/components/ui/StarRating.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useToast } from '@/composables/useToast'
import { User, Mail, Lock, Phone } from 'lucide-vue-next'

const toast = useToast()

const name = ref('John Doe')
const email = ref('john.doe@example.com')
const password = ref('')
const phone = ref('')
const city = ref('jakarta')
const isNotificationsEnabled = ref(true)
const isDarkModeAuto = ref(false)
const otpCode = ref('')
const quantity = ref(2)
const userRating = ref(5)

const cityOptions = [
  { label: 'DKI Jakarta', value: 'jakarta' },
  { label: 'Bandung', value: 'bandung' },
  { label: 'Surabaya', value: 'surabaya' },
  { label: 'Yogyakarta', value: 'yogyakarta' },
  { label: 'Bali / Denpasar', value: 'bali' }
]

function onOtpComplete(code: string) {
  toast.success(`Kode OTP ${code} berhasil diverifikasi!`)
}

function onFileUploaded(file: File | null) {
  if (file) {
    toast.success(`Foto ${file.name} siap diunggah!`)
  }
}

function submitForm() {
  toast.success('Formulir berhasil dikirim!')
}
</script>

<template>
  <DefaultLayout title="Form & Input">
    <PageTitle title="Formulir & OTP" subtitle="Two-Way Data Binding" />

    <!-- Text Fields Showcase -->
    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-3">Input Text & Floating Labels</h3>
      
      <AppInput 
        v-model="name"
        label="Nama Lengkap" 
        :icon="User"
        :valid="name.length >= 3"
        required
      />

      <AppInput 
        v-model="email"
        type="email"
        label="Alamat Email" 
        :icon="Mail"
        :valid="email.includes('@')"
        error-message="Format email tidak valid"
        required
      />

      <AppInput 
        v-model="password"
        type="password"
        label="Kata Sandi" 
        :icon="Lock"
      />

      <AppInput 
        v-model="phone"
        type="tel"
        label="Nomor WhatsApp" 
        :icon="Phone"
      />

      <AppSelect 
        v-model="city"
        label="Pilih Wilayah Operasional"
        :options="cityOptions"
      />
    </AppCard>

    <!-- File Upload Component -->
    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-2">Upload File & Foto Profil</h3>
      <AppFileUpload 
        label="Foto Identitas Diri (KTP / Paspor)" 
        :max-size-mb="5" 
        @change="onFileUploaded" 
      />
    </AppCard>

    <!-- OTP Input Showcase -->
    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-1">Verifikasi Kode OTP</h3>
      <p class="text-xs text-[var(--color-theme-muted)] mb-3">
        Auto-advance focus, navigasi backspace mundur, dan paste dari SMS clipboard.
      </p>

      <AppOtpInput 
        v-model="otpCode" 
        :length="4" 
        @complete="onOtpComplete" 
      />

      <div class="text-center">
        <span class="text-xs text-[var(--color-theme-muted)]">Kode terisi: </span>
        <strong class="text-xs text-[var(--color-highlight)]">{{ otpCode || '----' }}</strong>
      </div>
    </AppCard>

    <!-- Switches, Rating & Stepper Showcase -->
    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-3">Switches, Rating & Stepper</h3>

      <div class="space-y-3 divide-y divide-black/5 dark:divide-white/5">
        <AppSwitch 
          v-model="isNotificationsEnabled" 
          label="Notifikasi Push Mobile" 
          variant="ios" 
        />
        <div class="pt-3">
          <AppSwitch 
            v-model="isDarkModeAuto" 
            label="Sinkron Otomatis Mode Malam" 
            variant="android" 
          />
        </div>
        <div class="pt-3 flex items-center justify-between">
          <div>
            <span class="text-sm font-medium text-[var(--color-theme-heading)]">Penilaian Bintang</span>
            <p class="text-xs text-[var(--color-theme-muted)]">Kepuasan layanan</p>
          </div>
          <StarRating v-model="userRating" />
        </div>
        <div class="pt-3 flex items-center justify-between">
          <div>
            <span class="text-sm font-medium text-[var(--color-theme-heading)]">Jumlah Item (Stepper)</span>
            <p class="text-xs text-[var(--color-theme-muted)]">Kuantitas pemesanan</p>
          </div>
          <AppStepper v-model="quantity" :min="1" :max="10" />
        </div>
      </div>
    </AppCard>

    <div class="px-4 mb-6">
      <AppButton full size="lg" @click="submitForm">
        Simpan Pengaturan Form
      </AppButton>
    </div>
  </DefaultLayout>
</template>
