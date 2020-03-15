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
      name: 'JohnDoe',
      email: 'johndoe@demo.com',
      currency: 'USD'
    }
  },
  beforeCreate() {
    // this.$axios.get('/user')
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch()
  },
}
</script>