import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import BikesView from '../views/BikesView.vue'
import BikeDetailsView from '../views/BikeDetailsView.vue'
import AddBikeView from '@/views/AddBikeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bikes',
      name: 'bikes',
      component: BikesView
    },
    {
      path: '/bikes/:id',
      name: 'bikeDetails',
      component: BikeDetailsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bikes/add',
      name: 'addBike',
      component: AddBikeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: "/:catchAll(.*)",
      component: NotFoundView,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
