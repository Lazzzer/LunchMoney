import axiosHttp from 'axios'

export const axios = axiosHttp

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'https://vps.lazarpavicevic.ch/' : ''

export default {
    install(Vue) {
        Vue.prototype.$axios = axiosHttp
    }
}