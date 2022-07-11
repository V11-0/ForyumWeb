import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/UserModule'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/welcome',
    name: 'Welcome',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "welcome" */ '../views/WelcomeView.vue')
  }
]

const router = new VueRouter({
  routes
})

const userModule = getModule(UserModule, store)

router.beforeEach((to, from, next) => {
  // For every route except 'welcome'
  if (to.name !== 'Welcome') {
    // Not Authenticated, redirect to Login page
    if (!userModule.hasSession) {
      next({ name: 'Welcome' })
    } else next()
  } else next()
})

export default router
