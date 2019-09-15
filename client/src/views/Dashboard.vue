<template>
  <div v-if="authorized" class="login">
    <h1 class="text-4xl font-black mb-10">Dashboard Page</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      authorized: false
    }
  },
  beforeCreate() {
    if (this.$cookies.isKey('refresh_token')) {
      const headers = {
        'Authorization': 'bearer ' + this.$cookies.get('token'),
        'refreshToken': this.$cookies.get('refresh_token')
      }
      this.$axios.get('/dashboard', { headers })
        .then(res => {
          console.log(res)
          this.authorized = true
        })
        .catch(() => {
          this.$axios.post('/refresh', null, { headers: { 'refreshToken': this.$cookies.get('refresh_token') } })
            .then(res => {
              this.$cookies.set('token', res.data.token)
              this.$router.go()
              console.log('token refresh')
            })
            .catch(() => {
              this.$router.push('/login')
            })
        })
    } else {
      this.$router.push('/login')
    }

  }
}
</script>