<template>
  <div v-if="authorized" class="login">
    <h1 class="text-4xl font-black mb-10">Dashboard Page</h1>
    <form @submit.prevent="onSubmit">
      <input class="border border-black" type="submit" name="submit" value="Logout">
    </form>
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
    this.$axios.get('/dashboard')
      .then(res => {
        console.log(res)
        this.authorized = true
      })
      .catch()
  },
  methods: {
    onSubmit() {
      this.$axios.post('/logout')
        .then(res => {
          console.log(res)
          res.status === 202 ? this.authorized = false : ''
          this.$cookies.isKey('refresh_token') ? this.$cookies.remove('refresh_token') : null
          this.$cookies.isKey('token') ? this.$cookies.remove('token') : null
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>