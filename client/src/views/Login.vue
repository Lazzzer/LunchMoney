<template>
  <div class="login">
    <h1 class="text-4xl font-black mb-10">Login Page</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="name" class="border border-black" type="name" name="name" placeholder="Type here...">
      <input v-model="password" class="border border-black" type="password" name="password" placeholder="Type here...">
      <input class="border border-black" type="submit" name="submit" value="Login">
    </form>
    <div v-if="hasError">
      <h1 class="text-2xl text-red-500">Can't log in...</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      hasError: false
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('/login', {
        name: this.name,
        password: this.password
      })
        .then((res) => {
          console.log(res)
          if (res.status === 202) {
            this.$cookies.set('refresh_token', res.data.token.refreshToken)
            this.$cookies.set('token', res.data.token.token)
            this.$router.push('dashboard')
          } else {
            this.hasError = true
          }
        }).catch((err) => {
          console.log(err)
          this.hasError = true
        })
    }
  },
}
</script>