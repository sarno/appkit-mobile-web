import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ComponentsView from '@/views/ComponentsView.vue'
import FormDemoView from '@/views/FormDemoView.vue'
import WalletDemoView from '@/views/WalletDemoView.vue'
import AuthView from '@/views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsView
  },
  {
    path: '/forms',
    name: 'forms',
    component: FormDemoView
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: WalletDemoView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
