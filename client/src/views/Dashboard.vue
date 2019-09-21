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
    this.$axios.get('/dashboard')
      .then(res => {
        console.log(res)
        this.authorized = true
      })
      .catch()
  }
}
</script>