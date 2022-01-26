import Vue from 'vue'
import VueRouter from 'vue-router'
import FormulasPage from '../views/FormulasPage.vue'
import CreatePage from '../views/CreatePage.vue'

Vue.use(VueRouter)

const DEFAULT_TITLE = "FRISS";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FormulasPage,
    meta: {
      title: "List of Formulas"
    }
  },
  {
    path: '/formulas',
    name: 'List',
    component: FormulasPage,
    meta: {
      title: "List of Formulas"
    }
  },
  {
    path: '/create',
    name: 'Create',
    component: CreatePage,
    meta: {
      title: "Create new Formula"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = `${DEFAULT_TITLE} - ${to.meta.title}` || DEFAULT_TITLE;
  })
})

export default router
