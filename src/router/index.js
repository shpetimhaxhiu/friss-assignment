import Vue from 'vue'
import VueRouter from 'vue-router'
import FormulasList from '../components/FormulasList.vue'
import FormulaForm from '../components/FormulaForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List of Formulas',
    component: FormulasList
  },
  {
    path: '/formulas',
    name: 'List of Formulas',
    component: FormulasList
  },
  {
    path: '/create',
    name: 'Create New',
    component: FormulaForm
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
