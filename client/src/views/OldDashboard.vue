<template>
  <div v-if="authorized" class="login">
    <h1 class="text-4xl font-black mb-10">Dashboard Page</h1>
    <form @submit.prevent="onSubmit">
      <input class="border border-black" type="submit" name="submit" value="Logout">
    </form>
    <user-settings></user-settings>
    <current-budget></current-budget>
    <budget-historic></budget-historic>
  </div>
</template>
<script>
import UserSettings from '../components/UserSettings.vue'
import CurrentBudget from '../components/CurrentBudget.vue'
import BudgetHistoric from '../components/BudgetHistoric.vue'

export default {
  components: {
    UserSettings,
    CurrentBudget,
    BudgetHistoric
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
          this.$cookies.isKey('refresh-token') ? this.$cookies.remove('refresh-token') : null
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