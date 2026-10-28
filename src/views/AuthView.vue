<script setup lang="ts">
import { ref } from 'vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import AppCard from '@/components/card/AppCard.vue'
import AppInput from '@/components/form/AppInput.vue'
import AppOtpInput from '@/components/form/AppOtpInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useToast } from '@/composables/useToast'
import { Layers, Mail, Lock, ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const step = ref<'login' | 'otp'>('login')
const email = ref('user@appkit.mobile')
const password = ref('')
const otpCode = ref('')

function handleLogin() {
  if (!email.value || !password.value) {
    toast.error('Mohon isi email dan kata sandi')
    return
  }
  step.value = 'otp'
  toast.info('Kode OTP 4 digit telah dikirim ke email')
}

function handleOtpComplete(code: string) {
  toast.success(`Verifikasi berhasil dengan kode ${code}!`)
  setTimeout(() => {
    router.push('/')
  }, 1000)
}
</script>

<template>
  <BlankLayout>
    <div class="px-4 py-8">
      <!-- Back Button -->
      <button 
        @click="step === 'otp' ? step = 'login' : router.push('/')"
        class="w-10 h-10 rounded-full bg-[var(--color-theme-card)] border border-black/5 dark:border-white/5 flex items-center justify-center text-[var(--color-theme-heading)] shadow-xs mb-6 cursor-pointer active:scale-90"
      >
        <ArrowLeft class="w-5 h-5" />
      </button>

      <!-- AppKit Brand -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-3xl bg-[var(--color-highlight-gradient)] text-white mx-auto flex items-center justify-center shadow-xl shadow-[var(--color-highlight)]/30 mb-3">
          <Layers class="w-8 h-8" />
        </div>
        <h1 class="text-2xl font-black tracking-tight text-[var(--color-theme-heading)]">
          {{ step === 'login' ? 'Masuk ke AppKit' : 'Verifikasi Akun' }}
        </h1>
        <p class="text-xs text-[var(--color-theme-muted)] mt-1">
          {{ step === 'login' ? 'Silakan masukkan kredensial akun Anda' : 'Masukkan 4 digit kode yang kami kirimkan' }}
        </p>
      </div>

      <!-- Step 1: Login Form -->
      <AppCard v-if="step === 'login'" :boxed="false" class="rounded-[24px] p-5 border border-black/5 dark:border-white/5 shadow-md">
        <AppInput 
          v-model="email"
          label="Alamat Email"
          type="email"
          :icon="Mail"
          required
        />
        <AppInput 
          v-model="password"
          label="Kata Sandi"
          type="password"
          :icon="Lock"
          required
        />

        <div class="mt-4">
          <AppButton full size="lg" @click="handleLogin">
            Masuk Sekarang
          </AppButton>
        </div>
      </AppCard>

      <!-- Step 2: OTP Form -->
      <AppCard v-else :boxed="false" class="rounded-[24px] p-5 border border-black/5 dark:border-white/5 shadow-md text-center">
        <AppOtpInput 
          v-model="otpCode" 
          :length="4" 
          @complete="handleOtpComplete" 
        />

        <div class="mt-6">
          <AppButton full size="lg" :disabled="otpCode.length < 4" @click="handleOtpComplete(otpCode)">
            Verifikasi & Lanjut
          </AppButton>
        </div>
      </AppCard>

      <p class="text-center text-xs text-[var(--color-theme-muted)] mt-6">
        AppKit Mobile • Modern Vue 3.5 Engine
      </p>
    </div>
  </BlankLayout>
</template>
