import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

/**
 * On regarde dans le sessionStorage si on a déjà définit la clé jwt; si c'est le cas l'utilisateur est connecté
 * 
 * @returns l'état de connexion de l'utilisateur
 */
export function isAuthenticated() {
  return !!sessionStorage.getItem('jwt')
}


export default router
