<template>
  <div class="mt-4">
    <div v-if="!noCurrentBudget">
      <strong>Current budget for {{ month }}</strong>
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
</template>

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
    getCurrentBalance() {
      return this.expenses.reduce((currentTotal, expense) => {
        return parseFloat(expense.price) + currentTotal
      }, 0)
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
          if (res.data !== '') {
            this.limit = res.data.limit
            this.expenses = res.data.expenses
            this.currentBalance = this.getCurrentBalance()
            this.month = this.fullDate(res.data.created_at)
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