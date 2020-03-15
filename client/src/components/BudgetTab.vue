<template>
  <div class="mt-4 border expenseTab border-lunchPink-600 rounded-lunch" style="height:calc(100% - 194px);">
    <h2 class="mx-auto mt-5 mb-2 text-base italic font-black  w-17/20 text-lunchPink-600">BUDGET HISTORIC</h2>
    <div v-if="!noBudget" class="mx-auto overflow-y-scroll w-17/20" style="height:calc(100% - 80px);">
      <div v-for="(budget, index) in budgets" :key="`budget-${index}`"
           class="relative w-full mb-2 bg-lunchPurple-500 rounded-expenses h-13"
      >
        <router-link :to="{name: 'budget', params: {id: budget._id}}" class="absolute w-full h-full no-highlight-color"></router-link>
        <div class="flex justify-between">
          <h3 class="pt-2 ml-4 text-sm italic text-white uppercase">{{ fullDate(budget.created_at) }}</h3>
          <span :class="[budgetDifference(getCurrentBalance(budget.expenses), budget.limit) >= 0 ? 'text-green-400': 'text-red-400','text-xs font-bold italic mt-3 pr-4']">{{ budgetDifference(getCurrentBalance(budget.expenses), budget.limit) }}</span>
        </div>
        <div class="flex justify-end mr-4 -mt-1">
          <span class="text-sm font-bold text-white">{{ getCurrentBalance(budget.expenses).toFixed(2) }} / <span class="text-lunchPink-600">{{ parseFloat(budget.limit).toFixed(2) }}</span><span class="text-xs"> {{ currency }}</span></span>
        </div>
      </div>
      <br>
    </div>
    <div v-else class="flex flex-col items-center justify-center mx-auto w-17/20 rounded-lunch bg-lunchPurple-500" style="height:calc(100% - 80px);">
      <svg width="70" height="46" viewBox="0 0 70 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M69.0202 21.5515L56.1762 2.56043C55.6435 1.77282 54.9217 1.12703 54.075 0.680376C53.2283 0.233721 52.2828 1.49722e-05 51.3225 0H18.6775C17.7172 3.03184e-06 16.7717 0.233705 15.925 0.680362C15.0783 1.12702 14.3566 1.77281 13.8239 2.56043L0.979757 21.5515C0.340895 22.496 -1.40647e-05 23.6058 4.35203e-10 24.7409L4.35204e-10 40.25C4.35204e-10 43.4257 2.61163 46 5.83333 46H64.1667C67.3884 46 70 43.4257 70 40.25V24.7409C70 23.6058 69.6591 22.496 69.0202 21.5515ZM19.7181 7.66667H50.282L60.6523 23H45.6944L41.8056 30.6667H28.1944L24.3056 23H9.34767L19.7181 7.66667Z" fill="#F71140" />
      </svg>
      <h3 class="mt-4 text-xs italic text-lunchPurple-100">NO OLDER BUDGETS</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noBudget: null,
      budgets: [
        {
          _id: '1',
          limit: '300',
          created_at: '2020-02-01T00:00:00.037Z',
          user: '5db28370b814585f196d4f08',
          expenses: [{ price: 300 }, { price: 2 }, { price: 30 }, { price: 30 }],
        },
        {
          _id: '1',
          limit: '400',
          created_at: '2020-01-01T00:00:00.037Z',
          user: '5db28370b814585f196d4f08',
          expenses: [{ price: 210 }, { price: 2 }, { price: 30 }, { price: 30 }],
        },
        {
          _id: '1',
          limit: '2000',
          created_at: '2019-12-01T00:00:00.037Z',
          user: '5db28370b814585f196d4f08',
          expenses: [{ price: 533 }, { price: 2 }, { price: 30 }, { price: 30 }],
        },
        {
          _id: '1',
          limit: '105',
          created_at: '2019-11-01T00:00:00.037Z',
          user: '5db28370b814585f196d4f08',
          expenses: [{ price: 100 }, { price: 2 }, { price: 2 }, { price: 1 }],
        },
      ],
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
    getCurrentBalance(expenses) {
      return expenses.reduce((currentTotal, expense) => {
        return parseFloat(expense.price) + currentTotal
      }, 0)
    },
    budgetDifference(currentBalance, limit) {
      return parseFloat(limit) - parseFloat(currentBalance) > 0 ? '+' + (parseFloat(limit) - parseFloat(currentBalance)).toFixed(2) : (parseFloat(limit) - parseFloat(currentBalance)).toFixed(2)
    },
    getAllBudget() {
      this.noBudget = false
      // this.$axios.get('/budget/all')
      //   .then(res => {
      //     console.log(res)
      //     if (res.data[0] !== undefined) {
      //       this.budgets = res.data
      //       this.noBudget = false
      //     } else {
      //       this.noBudget = true
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  },
}
</script>