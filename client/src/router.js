import Vue from 'vue'
import Router from 'vue-router'
import SignIn from './views/SignIn.vue'
import Wifles from './views/Wifles.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/sign-in'
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/wifles',
      name: 'wifles',
      component: Wifles
    }
  ]
})
