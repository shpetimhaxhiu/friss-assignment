import Vue from 'vue'
import VueRouter from 'vue-router'
import FormulasPage from '../views/FormulasPage.vue'
import CreatePage from '../views/CreatePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FormulasPage
  },
  {
    path: '/formulas',
    name: 'List',
    component: FormulasPage
  },
  {
    path: '/create',
    name: 'Create',
    component: CreatePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
