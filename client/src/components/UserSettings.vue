<template>
  <div>
    UserSettings! {{ name }} {{ email }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.state.currentUserName,
      email: this.$store.state.currentUserEmail
    }
  },
  beforeCreate() {
    // this.$axios.get(`/user/${this.$store.state.currentUserName}`)
    this.$axios.get('/user/Lazar')
      .then(res => {
        console.log(res)
        this.authorized = true
      })
      .catch()
  },
}
</script>