<template>
  <div class="mt-4">
    <div v-if="!noBudget">
      <strong>All Budgets</strong>

      <div v-for="(budget, index) in budgets" :key="`budget-${index}`" class="border mb-4">
        {{ fullDate(budget.created_at) }}
        <br>
        {{ budgetDifference(budget.currentBalance, budget.limit) }} {{ currency }}
        <br>
        {{ budget.currentBalance }}/{{ budget.limit }} {{ currency }}
      </div>
      <br>
    </div>
    <div v-else>
      No old budget found
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noBudget: null,
      budgets: [],
      currency: this.$store.state.currentCurrency
    }
  },
  created() {
    this.getAllBudget()
  },
  methods: {
    fullDate: (dateToParse) => {
      let date = new Date(dateToParse)
      return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) + ' ' + date.getFullYear()
    },
    budgetDifference(currentBalance, limit) {
      return parseFloat(limit) - parseFloat(currentBalance) > 0 ? '+' + (parseFloat(limit) - parseFloat(currentBalance)) : (parseFloat(limit) - parseFloat(currentBalance))
    },
    getAllBudget() {
      this.$axios.get('/budget/all')
        .then(res => {
          console.log(res)
          if (res.data[0] !== undefined) {
            this.budgets = res.data
            this.noBudget = false
          } else {
            this.noBudget = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
}
</script>