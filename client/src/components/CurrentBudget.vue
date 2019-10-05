<template>
  <div class="mt-4">
    <div v-if="!noCurrentBudget">
      Current budget for {{ month }}
      <br>
      {{ currentBalance }}/{{ limit }} {{ currency }}
    </div>
    <div v-else>
      No current Budget
      <br>
      Create one :

      <form @submit.prevent="onSubmit">
        <input v-model="limit" class="border border-black" type="limit" name="limit" placeholder="Type your limit here..." required>
        <input class="border border-black" type="submit" name="submit" value="Create Budget">
      </form>

    </div>
  </div>
  </divclass="mt-4"></template>

<script>
export default {
  data() {
    return {
      noCurrentBudget: null,
      limit: null,
      currentBalance: null,
      expenses: null,
      month: '',
      currency: this.$store.state.currentCurrency
    }
  },
  created() {
    this.getCurrentBudget()
  },
  methods: {
    fullDate: (dateToParse) => {
      let date = new Date(dateToParse)
      console.log(date)
      return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) + ' ' + date.getFullYear()
    },
    onSubmit() {
      this.$axios.post('/budget/create', {
        limit: this.limit
      })
        .then((res) => {
          console.log(res)
          res.status === 201 ? this.getCurrentBudget() : null
        }).catch((err) => {
          console.log(err.response)
        })
    },
    getCurrentBudget() {
      this.$axios.get('/budget/current')
        .then(res => {
          console.log(res)
          if (res.data[0] !== undefined) {
            this.limit = res.data[0].limit
            this.currentBalance = res.data[0].currentBalance
            this.expenses = res.data[0].expenses
            this.month = this.fullDate(res.data[0].created_at)
            this.noCurrentBudget = false
          } else {
            this.noCurrentBudget = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
}
</script>