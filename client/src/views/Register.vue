<template>
  <div class="register">
    <h1 class="text-4xl font-black mb-10">Register Page</h1>
    <div v-if="userCreated">
      <h1 class="text-2xl text-green-500 mb-10">User created!</h1>
      <router-link to="/login" class="p-4 border border-black">Log In</router-link>
      <router-link to="/" class="p-2">Go back</router-link>

    </div>
    <div v-else>
      <form @submit.prevent="onSubmit">
        <input v-model="name" class="border border-black" type="name" name="name" placeholder="Type here...">
        <input v-model="email" class="border border-black" type="email" name="email" placeholder="Type here...">
        <input v-model="password" class="border border-black" type="password" name="password" placeholder="Type here...">
        <select v-model="currency" id="currency" class="border border-black">
          <option hidden disabled>CURRENCY</option>
          <option>CHF</option>
          <option>EUR</option>
          <option>USD</option>
        </select>
        <input class="border border-black" type="submit" name="submit" value="Register">
      </form>
      <div v-if="hasError">
        <h1 class="text-2xl text-red-500"><strong class="text-red-800 uppercase">{{ errorField }} : </strong>{{ errorMessage }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      currency: 'CURRENCY',
      userCreated: null,
      hasError: false,
      errorMessage: null,
      errorField: null
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('/register', {
        name: this.name.toLowerCase(),
        email: this.email.toLowerCase(),
        password: this.password,
        currency: this.currency
      })
        .then(res => {
          console.log(res)
          res.status === 201 ? this.userCreated = true : this.hasError = true
        })
        .catch(err => {
          console.log(err.response)
          this.errorMessage = err.response.data[0].message
          this.errorField = err.response.data[0].field
          this.hasError = true
        })
    }
  },
}
</script>
