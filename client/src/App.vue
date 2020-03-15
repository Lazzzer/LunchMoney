<template>
  <div id="app" class="w-full h-screen mx-auto font-sans android bg-lunchPurple-700" style="max-width:650px;">
    <router-view />
  </div>
</template>
<style src="./assets/tailwind.css"></style>

<script>
export default {
  created() {
    //   this.$axios.interceptors.request.use(config => {
    //     // Do something before request is sent
    //     if (config.url.includes('dashboard') || config.url.includes('settings') || config.url.includes('refresh') || config.url.includes('user') || config.url.includes('logout') || config.url.includes('budget') || config.url.includes('expense') || config.url.includes('stats')) {
    //       if (this.$cookies.isKey('refresh-token')) {
    //         config.headers.Authorization = 'bearer ' + this.$cookies.get('token')
    //         config.headers.common['refresh-token'] = this.$cookies.get('refresh-token')
    //         //console.log(config)
    //       }
    //     }
    //     return config
    //   }, error => {
    //     return Promise.reject(error)
    //   })

    //   // Add a response interceptor
    //   this.$axios.interceptors.response.use(function (response) {
    //     return response
    //   }, error => {
    //     if (error.response.status === 401) {
    //       console.log(error.response)
    //       if (!error.response.config.url.includes('refresh') && !error.response.config.url.includes('register') && !error.response.config.url.includes('login')) {
    //         return this.$axios.post('/refresh')
    //           .then(res => {
    //             this.$cookies.set('token', res.data.token)
    //             this.$cookies.set('refresh-token', res.data.refreshToken)
    //             console.log(error.config)

    //             return this.$axios.request(error.config)
    //           })
    //           .catch(err => {
    //             console.log('erasing cookies...')
    //             this.$cookies.isKey('refresh-token') ? this.$cookies.remove('refresh-token') : null
    //             this.$cookies.isKey('token') ? this.$cookies.remove('token') : null
    //             this.$router.push('/login')
    //           })
    //       }
    //     }
    //     return Promise.reject(error)
    //   })
  }
}
</script>