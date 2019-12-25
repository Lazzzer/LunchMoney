<template>
  <div v-if="!noStatistics" class="w-full h-full mt-4 overflow-y-scroll text-white" style="height:calc(100% - 80px);">
    <div class="flex justify-center w-full">
      <div class="mr-4 BudgetSpent">
        <p :class="['text-4xl italic font-bold leading-none', percentBudgetSpent > 75 ? 'text-red-400' : 'text-green-400']">{{ percentBudgetSpent }}<span class="font-semibold text-white">%</span></p>
        <p class="text-xs italic font-bold leading-none text-lunchPurple-200">OF BUDGET SPENT</p>
      </div>
      <div class="AvgSpendingWeek">
        <p class="text-2xl italic font-bold leading-none text-lunchPink-600">58.20<span class="text-xl not-italic font-bold text-white"> {{ currency }}</span></p>
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
      <spending-progression :width="240" :height="130" :spending-progression="spendingProgressData" :expenses-total="expensesTotal" :budget-limit="budgetLimit"></spending-progression>
    </div>
    <p class="mt-4 mr-6 text-xs italic font-bold leading-none text-right text-lunchPurple-200">TOTAL SPENDING FOR EACH DAY</p>
    <div class="flex items-center justify-center h-40 mx-4 mt-2 SpendingProgress bg-lunchPurple-500 rounded-lunch">
      <expenses-by-days :width="240" :height="130" :data="totalSpendingDayData" :budget-limit="budgetLimit" :currency="currency"></expenses-by-days>
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
          console.log(err)
        })
    }
  },
}
</script>