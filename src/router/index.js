import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import BikesView from '../views/BikesView.vue'
import BikeDetailsView from '../views/BikeDetailsView.vue'
import AddBikeView from '@/views/AddBikeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

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
      component: BikeDetailsView
    },
    {
      path: '/bikes/add',
      name: 'addBike',
      component: AddBikeView
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

export default router
