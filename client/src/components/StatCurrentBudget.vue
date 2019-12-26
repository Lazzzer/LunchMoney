<template>
  <div class="w-full" style="height:calc(100% - 60px);">
    <div v-if="!noStatistics" class="w-full h-full overflow-y-scroll text-white" style="height:calc(100% - 0px);">
      <div class="flex justify-center w-full">
        <div class="mr-4 BudgetSpent">
          <p :class="['text-4xl italic font-bold leading-none', percentBudgetSpent > 75 ? 'text-red-400' : 'text-green-400']">{{ percentBudgetSpent }}<span class="font-semibold text-white">%</span></p>
          <p class="text-xs italic font-bold leading-none text-lunchPurple-200">OF BUDGET SPENT</p>
        </div>
        <div class="AvgSpendingWeek">
          <p class="text-2xl italic font-bold leading-none text-lunchPink-600">{{ getSpendingAverage() }}<span class="text-xl not-italic font-bold text-white"> {{ currency }}</span></p>
          <p class="text-xs italic font-bold leading-none text-lunchPurple-200">AVERAGE SPENDING</p>
          <p class="text-xs italic font-bold leading-none text-lunchPurple-200">PER 10 DAYS</p>
        </div>
      </div>
      <div class="flex items-center w-full mt-3">
        <div class="w-1/2 categoryChart">
          <categories-graph :width="125" :height="125" :number-category="numberCategoryData" :percent-cost-category="percentCostCategoryData"></categories-graph>
        </div>
        <div class="w-1/2 categoryChartDesc">
          <div>
            <p class="text-sm italic font-bold leading-none text-lunchPink-600">OUTER CIRCLE</p>
            <p class="text-xs italic font-bold leading-none text-lunchPurple-200">PERCENTAGE OF COST</p>
            <p class="text-xs italic font-bold leading-none text-lunchPurple-200">BY CATEGORIES</p>
          </div>
          <div class="mt-4">
            <p class="text-sm italic font-bold leading-none text-lunchPink-600">INNER CIRCLE</p>
            <p class="text-xs italic font-bold leading-none text-lunchPurple-200">NUMBER OF EXPENSES</p>
            <p class="text-xs italic font-bold leading-none text-lunchPurple-200">BY CATEGORIES</p>
          </div>
        </div>
      </div>
      <p class="mt-4 ml-6 text-xs italic font-bold leading-none text-lunchPurple-200">SPENDING PROGRESSION EACH 10 DAYS</p>
      <div class="flex items-center justify-center h-40 mx-4 mt-2 SpendingProgress bg-lunchPurple-500 rounded-lunch">
        <spending-progression :width="240" :height="130" :spending-progression="spendingProgressData" :expenses-total="expensesTotal" :budget-limit="budgetLimit" :currency="currency"></spending-progression>
      </div>
      <p class="mt-4 mr-6 text-xs italic font-bold leading-none text-right text-lunchPurple-200">TOTAL SPENDING FOR EACH DAY</p>
      <div class="flex items-center justify-center h-40 mx-4 mt-2 SpendingProgress bg-lunchPurple-500 rounded-lunch">
        <expenses-by-days :width="240" :height="130" :data="totalSpendingDayData" :budget-limit="budgetLimit" :currency="currency"></expenses-by-days>
      </div>
    </div>
    <div v-if="badBudget" class="h-full pt-2">
      <div class="flex flex-col items-center justify-center mx-auto text-center w-17/20 rounded-lunch bg-lunchPurple-500" style="height:calc(100% - 10px);">
        <svg class="mx-auto" width="50" height="50" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M88 105.469C88 113.481 81.4953 120 73.5 120C65.5047 120 59 113.481 59 105.469C59 97.4562 65.5047 90.9375 73.5 90.9375C81.4953 90.9375 88 97.4562 88 105.469ZM60.6784 31.5772L63.1434 80.9834C63.2592 83.3035 65.1699 85.125 67.4879 85.125H79.5121C81.8301 85.125 83.7408 83.3035 83.8566 80.9834L86.3216 31.5772C86.4458 29.0871 84.4649 27 81.9771 27H65.0229C62.5351 27 60.5542 29.0871 60.6784 31.5772Z" fill="#F56565" />
          <circle cx="73.5" cy="73.5" r="70.5" stroke="#F56565" stroke-width="6" />
        </svg>
        <h3 class="mx-10 mt-4 text-xs italic text-lunchPurple-100">The statistics work only for current budgets created automatically with at least one expense.</h3>
        <h3 class="mx-10 mt-4 text-xs italic text-lunchPurple-100">You can enable default budgets in the settings.</h3>

      </div>
    </div>
  </div>
  
</template>
<script>
import CategoriesGraph from '.././components/graphs/CategoriesGraph'
import SpendingProgression from '.././components/graphs/SpendingProgression'
import ExpensesByDays from '.././components/graphs/ExpensesByDays'

export default {
  components: {
    CategoriesGraph,
    SpendingProgression,
    ExpensesByDays
  },
  data() {
    return {
      percentBudgetSpent: null,
      noStatistics: true,
      badBudget: false,
      currency: '',
      expensesTotal: 0,
      budgetLimit: 0,
      numberCategoryData: [],
      percentCostCategoryData: [],
      spendingProgressData: {},
      totalSpendingDayData: {}
    }
  },
  created() {
    this.getStatistics()
  },
  methods: {
    getStatistics() {
      this.$axios.get('/stats/current')
        .then(res => {
          console.log(res)
          if (res.status === 204) {
            this.noStatistics = true
          } else {
            this.currency = res.data.currency
            this.expensesTotal = res.data.expensesTotal
            this.budgetLimit = res.data.budgetLimit
            this.percentBudgetSpent = res.data.budgetSpentPercentage
            this.numberCategoryData = res.data.arrayNumberOfExpensesByCategories
            this.percentCostCategoryData = res.data.arrayPercentageCostByCategories
            this.spendingProgressData = res.data.arrayExpensesBy10Days
            this.totalSpendingDayData = res.data.arrayTotalSpendingPerDay
            this.noStatistics = false
          }
        })
        .catch(err => {
          if (err.response.status === 403) {
            this.noStatistics = true
            this.badBudget = true
          }
        })
    },
    getSpendingAverage() {
      const today = new Date(Date.now())
      const lastDay = new Date(new Date(today.getFullYear(), today.getMonth() + 1, 0)).getDate()
      if (today.getDate() === lastDay) {
        return (this.expensesTotal / 4).toFixed(1)
      } else if (today.getDate() > 21 && today.getDate() < lastDay) {
        return (this.expensesTotal / 3).toFixed(1)
      } else if (today.getDate() <= 21 && today.getDate() > 11) {
        return (this.expensesTotal / 2).toFixed(1)
      } else {
        return (this.expensesTotal).toFixed(1)
      }
    }
  },
}
</script>