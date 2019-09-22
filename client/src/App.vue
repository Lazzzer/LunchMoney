<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view />
  </div>
</template>

<style src="./assets/tailwind.css"></style>

<script>
export default {
  created() {
    this.$axios.interceptors.request.use(config => {
      // Do something before request is sent
      if (config.url.includes('dashboard') || config.url.includes('refresh') || config.url.includes('user') || config.url.includes('logout') || config.url.includes('budget') || config.url.includes('expense')) {
        if (this.$cookies.isKey('refresh_token')) {
          config.headers.Authorization = 'bearer ' + this.$cookies.get('token')
          config.headers.refresh_token = this.$cookies.get('refresh_token')
          //console.log(config)
        }
      }
      return config
    }, error => {
      return Promise.reject(error)
    })

    // Add a response interceptor
    this.$axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response
    }, error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response.status === 401) {
        console.log(error.response)
        if (!error.response.config.url.includes('refresh') && !error.response.config.url.includes('register') && !error.response.config.url.includes('login')) {
          this.$axios.post('/refresh')
            .then(res => {
              this.$cookies.set('token', res.data.token)
              this.$router.go()
            })
            .catch(err => {
              console.log('erasing cookies...')
              this.$cookies.isKey('refresh_token') ? this.$cookies.remove('refresh_token') : null
              this.$cookies.isKey('token') ? this.$cookies.remove('token') : null
              this.$router.push('/login')
            })
        }
      }
      return Promise.reject(error)
    })
  }
}
</script>