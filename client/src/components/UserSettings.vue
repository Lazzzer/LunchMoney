<template>
  <div>
    <strong>UserSettings</strong> 
    <br>
    {{ name }} {{ email }} {{ currency }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.state.currentUserName,
      email: this.$store.state.currentUserEmail,
      currency: this.$store.state.currentCurrency
    }
  },
  beforeCreate() {
    this.$axios.get('/user')
      .then(res => {
        console.log(res)
      })
      .catch()
  },
}
</script>