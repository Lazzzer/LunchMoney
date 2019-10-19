import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (window.$cookies.isKey('refresh_token') && window.$cookies.isKey('token')) {
          next('dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "register" */ './views/Register.vue'),
      beforeEnter: (to, from, next) => {
        if (window.$cookies.isKey('refresh_token') && window.$cookies.isKey('token')) {
          next('dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (window.$cookies.isKey('refresh_token') && window.$cookies.isKey('token')) {
          next('dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () =>
        import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      beforeEnter: (to, from, next) => {
        if (window.$cookies.isKey('refresh_token') && window.$cookies.isKey('token')) {
          next()
        } else {
          next('login')
        }
      }
    },
    {
      path: '/budget/:id',
      name: 'budget',
      component: () =>
        import(/* webpackChunkName: "budget" */ './views/Budget.vue'),
      beforeEnter: (to, from, next) => {
        if (window.$cookies.isKey('refresh_token') && window.$cookies.isKey('token')) {
          next()
        } else {
          next('login')
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
