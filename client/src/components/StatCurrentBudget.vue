<template>
  <div class="w-full mt-4 overflow-y-scroll text-white">
    <div class="flex justify-center w-full">
      <div class="mr-4 BudgetSpent">
        <p class="text-4xl italic font-bold leading-none text-green-400">25<span class="font-semibold text-white">%</span></p>
        <p class="text-xs italic font-bold leading-none text-lunchPurple-200">OF BUDGET SPENT</p>
      </div>
      <div class="AvgSpendingWeek">
        <p class="text-2xl italic font-bold leading-none text-lunchPink-600">58.20<span class="text-xl not-italic font-bold text-white"> CHF</span></p>
        <p class="text-xs italic font-bold leading-none text-lunchPurple-200">AVERAGE SPENDING</p>
        <p class="text-xs italic font-bold leading-none text-lunchPurple-200">PER WEEK</p>
      </div>
    </div>
    <div class="flex items-center w-full mt-3">
      <div class="w-1/2 categoryChart">
        <categories-graph :width="125" :height="125" :data="categoriesGraphChartData"></categories-graph>
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
  </div>
</template>
<script>
import CategoriesGraph from '.././components/graphs/CategoriesGraph'
export default {
  components: {
    CategoriesGraph
  },
  data() {
    return {
      categoriesGraphChartData: {},
    }
  },
}
</script>