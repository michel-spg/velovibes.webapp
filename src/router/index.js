import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import BikesView from '../views/BikesView.vue'
import BikeDetailsView from '../views/BikeDetailsView.vue'

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
      path: "/:catchAll(.*)",
      component: NotFoundView,
    },
  ]
})

export default router
