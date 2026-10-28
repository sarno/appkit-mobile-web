<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PageTitle from '@/components/shell/PageTitle.vue'
import AppCard from '@/components/card/AppCard.vue'
import ActionSheet from '@/components/shell/ActionSheet.vue'
import ActionModal from '@/components/shell/ActionModal.vue'
import AppTabs from '@/components/navigation/AppTabs.vue'
import AppAccordion from '@/components/navigation/AppAccordion.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppBadge from '@/components/feedback/AppBadge.vue'
import AppSnackbar from '@/components/feedback/AppSnackbar.vue'
import SkeletonLoader from '@/components/feedback/SkeletonLoader.vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import { useToast } from '@/composables/useToast'
import { Sparkles, MessageSquare, AlertCircle, Heart, Star, Compass } from 'lucide-vue-next'

const toast = useToast()
const isSheetOpen = ref(false)
const isModalOpen = ref(false)
const isSnackbarOpen = ref(false)
const showSkeleton = ref(false)
const activeTab = ref('tab-1')
const searchQuery = ref('')

const tabs = [
  { id: 'tab-1', label: 'Overview', icon: Sparkles },
  { id: 'tab-2', label: 'Fitur', icon: Compass, badge: '5' },
  { id: 'tab-3', label: 'Ulasan', icon: Star }
]

function triggerToast(type: 'success' | 'error' | 'warning' | 'info') {
  if (type === 'success') toast.success('Tindakan berhasil disimpan!')
  if (type === 'error') toast.error('Terjadi kesalahan pada jaringan')
  if (type === 'warning') toast.warning('Penyimpanan memori hampir penuh')
  if (type === 'info') toast.info('Fitur baru telah tersedia di versi 3.5')
}

function triggerSnackbar() {
  isSnackbarOpen.value = true
}
</script>

<template>
  <DefaultLayout title="Katalog Komponen">
    <PageTitle title="Komponen UI" subtitle="Mobile Interactive Primitives" />

    <!-- Search Bar -->
    <SearchBar 
      v-model="searchQuery" 
      placeholder="Cari komponen..."
      :trending-tags="['Sheet', 'Modal', 'Tabs', 'Toast', 'Cards', 'Snackbar']"
    />

    <!-- Segmented Tabs -->
    <AppTabs v-model="activeTab" :tabs="tabs" variant="pill" />

    <!-- Overlays & Modals Showcase -->
    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-2">Bottom Sheets & Modals</h3>
      <p class="text-xs text-[var(--color-theme-muted)] mb-4">
        Interaksi overlay mobile dengan backdrop-blur dan dukungan gesture swipe-down-to-dismiss.
      </p>

      <div class="grid grid-cols-2 gap-2">
        <AppButton size="sm" @click="isSheetOpen = true">
          <span>Buka Bottom Sheet</span>
        </AppButton>
        <AppButton size="sm" variant="outline" @click="isModalOpen = true">
          <span>Buka Dialog Modal</span>
        </AppButton>
      </div>
    </AppCard>

    <!-- Snackbar & Skeleton Loader -->
    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-2">Snackbar & Skeleton Shimmer</h3>
      <div class="grid grid-cols-2 gap-2 mb-3">
        <AppButton size="sm" variant="outline" @click="triggerSnackbar">
          Tampilkan Snackbar
        </AppButton>
        <AppButton size="sm" variant="ghost" @click="showSkeleton = !showSkeleton">
          {{ showSkeleton ? 'Sembunyikan Skeleton' : 'Tes Skeleton Loader' }}
        </AppButton>
      </div>

      <SkeletonLoader v-if="showSkeleton" :lines="2" avatar />
    </AppCard>

    <!-- Toast Notifications Showcase -->
    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-2">Imperative Toasts (useToast)</h3>
      <p class="text-xs text-[var(--color-theme-muted)] mb-3">
        Dipicu langsung via composable tanpa perlu membuat state lokal:
      </p>
      <div class="grid grid-cols-2 gap-2">
        <AppButton size="sm" variant="success" @click="triggerToast('success')">Toast Sukses</AppButton>
        <AppButton size="sm" variant="danger" @click="triggerToast('error')">Toast Error</AppButton>
        <AppButton size="sm" variant="outline" @click="triggerToast('warning')">Toast Peringatan</AppButton>
        <AppButton size="sm" variant="highlight" @click="triggerToast('info')">Toast Info</AppButton>
      </div>
    </AppCard>

    <!-- Accordion Showcase -->
    <div class="mx-4 mb-4 bg-[var(--color-theme-card)] rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden shadow-xs">
      <AppAccordion title="Bagaimana cara kerja safe area?" :icon="Compass" :default-open="true">
        Safe area insets menggunakan CSS environment variables env(safe-area-inset-top) dan env(safe-area-inset-bottom) yang dikalkulasi secara reaktif untuk iPhone berponi atau Dynamic Island.
      </AppAccordion>
      <AppAccordion title="Apakah mendukung Dark Mode?" :icon="Heart">
        Ya, sistem tema mendeteksi prefers-color-scheme secara otomatis dan mendukung switch manual dengan persistensi di localStorage.
      </AppAccordion>
      <AppAccordion title="Apakah menggunakan jQuery?" :icon="AlertCircle">
        100% Bebas dari jQuery dan Bootstrap JS. Seluruh interaksi dikendalikan secara deklaratif oleh Vue 3.5.
      </AppAccordion>
    </div>

    <!-- Badges Showcase -->
    <AppCard>
      <h3 class="text-sm font-bold text-[var(--color-theme-heading)] mb-2">Pill Badges</h3>
      <div class="flex flex-wrap gap-1.5">
        <AppBadge variant="highlight">Highlight</AppBadge>
        <AppBadge variant="success">Active</AppBadge>
        <AppBadge variant="warning">Pending</AppBadge>
        <AppBadge variant="danger">High Priority</AppBadge>
        <AppBadge variant="neutral">Draft</AppBadge>
      </div>
    </AppCard>

    <!-- Action Sheet Instance -->
    <ActionSheet v-model="isSheetOpen" title="Opsi Tindakan Cepat" subtitle="Swipe ke bawah untuk menutup">
      <div class="space-y-3">
        <p class="text-xs text-[var(--color-theme-text)]">
          Ini adalah contoh ActionSheet mobile yang dapat ditutup dengan menarik handle ke bawah atau menekan area luar (backdrop).
        </p>
        <AppButton full @click="isSheetOpen = false; toast.success('Aksi 1 Berhasil')">
          <MessageSquare class="w-4 h-4" />
          <span>Kirim Pesan Konfirmasi</span>
        </AppButton>
        <AppButton full variant="outline" @click="isSheetOpen = false">
          <span>Batal</span>
        </AppButton>
      </div>
    </ActionSheet>

    <!-- Action Modal Instance -->
    <ActionModal v-model="isModalOpen" title="Konfirmasi Perubahan" variant="warning">
      <p>Apakah Anda yakin ingin menerapkan perubahan konfigurasi pada sistem AppKit?</p>
      <template #footer>
        <div class="grid grid-cols-2 gap-2 mt-4">
          <AppButton size="sm" variant="outline" @click="isModalOpen = false">Batal</AppButton>
          <AppButton size="sm" variant="highlight" @click="isModalOpen = false; toast.success('Tersimpan!')">Ya, Terapkan</AppButton>
        </div>
      </template>
    </ActionModal>

    <!-- Snackbar Instance -->
    <AppSnackbar 
      v-model="isSnackbarOpen" 
      message="Item berhasil ditambahkan ke daftar favorit!" 
      action-text="Urungkan"
      @action="toast.info('Tindakan diurungkan')" 
    />
  </DefaultLayout>
</template>
