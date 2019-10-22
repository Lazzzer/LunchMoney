import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueCookies from 'vue-cookies'
import VueAxios from './plugins/axios'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(VueCookies)
Vue.use(VueAxios)
Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

