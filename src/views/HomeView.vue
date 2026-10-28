<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PageTitle from '@/components/shell/PageTitle.vue'
import AppCard from '@/components/card/AppCard.vue'
import ImageCard from '@/components/card/ImageCard.vue'
import ListGroup from '@/components/navigation/ListGroup.vue'
import ListItem from '@/components/navigation/ListItem.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppDivider from '@/components/ui/AppDivider.vue'
import { useToast } from '@/composables/useToast'
import { Sparkles, Smartphone, Zap, Palette, Layers, CheckSquare, ArrowRight, ShieldCheck } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

function sayHello() {
  toast.success('Selamat Datang di AppKit Vue 3.5!')
}
</script>

<template>
  <DefaultLayout title="AppKit Mobile">
    <PageTitle title="Selamat Datang" subtitle="Next-Gen Mobile Template">
      <template #actions>
        <button 
          @click="sayHello" 
          class="w-8 h-8 rounded-full bg-[var(--color-highlight-fade)] text-[var(--color-highlight)] flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
        >
          <Sparkles class="w-4 h-4" />
        </button>
      </template>
    </PageTitle>

    <!-- Hero Card Banner -->
    <ImageCard 
      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
      :height="260"
      overlay="gradient"
      :overlay-opacity="75"
      effect="scale"
    >
      <template #top>
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md text-white">
          <Zap class="w-3 h-3 mr-1 text-amber-300" /> Powered by Vue 3.5
        </span>
      </template>
      <template #bottom>
        <h2 class="text-2xl font-black text-white tracking-tight leading-tight">
          Modern Touch Layout
        </h2>
        <p class="text-xs text-white/80 mt-1 line-clamp-2">
          Komponen mobile-first dengan animasi halus, 16 tema warna highlight, dan nuansa native app.
        </p>
        <div class="mt-3">
          <AppButton size="sm" @click="router.push('/components')">
            <span>Jelajahi Komponen</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </AppButton>
        </div>
      </template>
    </ImageCard>

    <!-- Feature Highlights -->
    <div class="grid grid-cols-2 gap-3 mx-4 mb-4">
      <AppCard :boxed="false" class="rounded-2xl border border-black/5 dark:border-white/5 p-4 text-center">
        <div class="w-10 h-10 rounded-2xl bg-[var(--color-highlight-fade)] text-[var(--color-highlight)] mx-auto flex items-center justify-center mb-2">
          <Smartphone class="w-5 h-5" />
        </div>
        <h4 class="text-xs font-bold text-[var(--color-theme-heading)]">Safe-Area Notch</h4>
        <p class="text-[11px] text-[var(--color-theme-muted)] mt-0.5">Adaptif iPhone notch & Dynamic Island.</p>
      </AppCard>

      <AppCard :boxed="false" class="rounded-2xl border border-black/5 dark:border-white/5 p-4 text-center">
        <div class="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 mx-auto flex items-center justify-center mb-2">
          <Palette class="w-5 h-5" />
        </div>
        <h4 class="text-xs font-bold text-[var(--color-theme-heading)]">16 Highlight Colors</h4>
        <p class="text-[11px] text-[var(--color-theme-muted)] mt-0.5">Ubah aksen warna dinamis secara instan.</p>
      </AppCard>
    </div>

    <!-- Quick Navigation List -->
    <ListGroup title="Menu Utama">
      <ListItem 
        title="Koleksi Komponen UI" 
        subtitle="Action sheet, dialog modal, tabs, accordion" 
        :icon="Layers" 
        to="/components" 
      />
      <ListItem 
        title="Form & Validasi OTP" 
        subtitle="Floating labels, PIN 6 digit, switcher" 
        :icon="CheckSquare" 
        badge="Hot"
        to="/forms" 
      />
      <ListItem 
        title="Fintech Wallet Demo" 
        subtitle="Desain kartu dompet & riwayat transaksi" 
        :icon="ShieldCheck" 
        to="/wallet" 
      />
    </ListGroup>

    <AppDivider label="Tentang Template" />

    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-1">PWA & Zero-DOM Queries</h3>
      <p class="text-xs text-[var(--color-theme-text)] leading-relaxed">
        Template ini dibangun tanpa jQuery atau Bootstrap JS. Seluruh interaksi sentuh dan drawer berjalan melalui sistem reaktif modern Vue 3.5+.
      </p>
    </AppCard>
  </DefaultLayout>
</template>
