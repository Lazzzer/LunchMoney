<template>
  <div v-if="authorized" class="login">
    <h1 class="text-4xl font-black mb-10">Dashboard Page</h1>
    <user-settings></user-settings>
    <form @submit.prevent="onSubmit">
      <input class="border border-black" type="submit" name="submit" value="Logout">
    </form>
  </div>
</template>
<script>
import UserSettings from '../components/UserSettings.vue'

export default {
  components: {
    UserSettings
  },
  data() {
    return {
      authorized: false
    }
  },
  beforeCreate() {
    this.$axios.get('/user')
      .then(res => {
        console.log(res)
        this.$store.commit('setName', res.data[0])
        this.$store.commit('setEmail', res.data[1])
        this.$store.commit('setCurrency', res.data[2])
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