<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PageTitle from '@/components/shell/PageTitle.vue'
import AppCard from '@/components/card/AppCard.vue'
import ListGroup from '@/components/navigation/ListGroup.vue'
import ListItem from '@/components/navigation/ListItem.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useToast } from '@/composables/useToast'
import { Send, ArrowDownLeft, PlusCircle, CreditCard, ShoppingBag, Coffee, ArrowUpRight } from 'lucide-vue-next'

const toast = useToast()

function actionClick(name: string) {
  toast.info(`Membuka menu ${name}`)
}
</script>

<template>
  <DefaultLayout title="Mobile Wallet">
    <PageTitle title="Dompet Saya" subtitle="Saldo & Transaksi Keuangan" />

    <!-- Credit Card Visual -->
    <div class="mx-4 mb-4 p-5 rounded-[24px] bg-[var(--color-highlight-gradient)] text-white shadow-xl shadow-[var(--color-highlight)]/25 relative overflow-hidden">
      <!-- Background Circles Pattern -->
      <div class="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
      <div class="absolute right-12 -bottom-16 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-semibold uppercase tracking-wider text-white/80">Kartu Utama</span>
        <CreditCard class="w-6 h-6 text-white" />
      </div>

      <p class="text-xs text-white/80">Total Saldo Aktif</p>
      <h2 class="text-2xl font-black tracking-tight text-white mt-0.5 mb-5">
        Rp 14.850.000
      </h2>

      <div class="flex items-center justify-between text-xs text-white/90 font-mono tracking-widest">
        <span>•••• •••• •••• 8842</span>
        <span>09/28</span>
      </div>
    </div>

    <!-- Quick Actions Row -->
    <div class="grid grid-cols-3 gap-2.5 mx-4 mb-4">
      <AppCard :boxed="false" class="rounded-2xl border border-black/5 dark:border-white/5 p-3 text-center cursor-pointer active:scale-95 transition-transform" @click="actionClick('Transfer')">
        <div class="w-10 h-10 rounded-full bg-[var(--color-highlight-fade)] text-[var(--color-highlight)] mx-auto flex items-center justify-center mb-1.5">
          <Send class="w-4.5 h-4.5" />
        </div>
        <span class="text-xs font-bold text-[var(--color-theme-heading)]">Transfer</span>
      </AppCard>

      <AppCard :boxed="false" class="rounded-2xl border border-black/5 dark:border-white/5 p-3 text-center cursor-pointer active:scale-95 transition-transform" @click="actionClick('Top Up')">
        <div class="w-10 h-10 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 mx-auto flex items-center justify-center mb-1.5">
          <PlusCircle class="w-4.5 h-4.5" />
        </div>
        <span class="text-xs font-bold text-[var(--color-theme-heading)]">Top Up</span>
      </AppCard>

      <AppCard :boxed="false" class="rounded-2xl border border-black/5 dark:border-white/5 p-3 text-center cursor-pointer active:scale-95 transition-transform" @click="actionClick('Minta Dana')">
        <div class="w-10 h-10 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-1.5">
          <ArrowDownLeft class="w-4.5 h-4.5" />
        </div>
        <span class="text-xs font-bold text-[var(--color-theme-heading)]">Terima</span>
      </AppCard>
    </div>

    <!-- Transaction History List -->
    <ListGroup title="Riwayat Mutasi Terakhir">
      <ListItem 
        title="Belanja Online di Toko" 
        subtitle="Hari ini, 14:20 WIB" 
        :icon="ShoppingBag"
      >
        <template #right>
          <span class="text-xs font-bold text-red-500">-Rp 320.000</span>
        </template>
      </ListItem>

      <ListItem 
        title="Transfer Masuk dari Budi" 
        subtitle="Kemarin, 09:15 WIB" 
        :icon="ArrowUpRight"
      >
        <template #right>
          <span class="text-xs font-bold text-green-500">+Rp 1.500.000</span>
        </template>
      </ListItem>

      <ListItem 
        title="Pembayaran Coffee Shop" 
        subtitle="26 Okt, 18:45 WIB" 
        :icon="Coffee"
      >
        <template #right>
          <span class="text-xs font-bold text-red-500">-Rp 48.000</span>
        </template>
      </ListItem>
    </ListGroup>

    <div class="px-4 mb-4">
      <AppButton full variant="outline" size="sm" @click="toast.info('Menampilkan semua transaksi')">
        Lihat Semua Mutasi
      </AppButton>
    </div>
  </DefaultLayout>
</template>
