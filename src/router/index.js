import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('../views/RankingView.vue')
  },
  {
    path: '/food/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
    props: true
  },
  {
    path: '/random',
    name: 'random',
    component: () => import('../views/RandomView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router