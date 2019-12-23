<template>
  <div class="w-full h-full mt-4 overflow-y-scroll text-white" style="height:calc(100% - 80px);">
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
        <categories-graph :width="125" :height="125" :data="categoriesGraphData"></categories-graph>
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
      <spending-progression :width="240" :height="130" :data="spendingProgressionGraphData"></spending-progression>
    </div>
  </div>
</template>
<script>
import CategoriesGraph from '.././components/graphs/CategoriesGraph'
import SpendingProgression from '.././components/graphs/SpendingProgression'

export default {
  components: {
    CategoriesGraph,
    SpendingProgression
  },
  data() {
    return {
      categoriesGraphData: {},
      spendingProgressionGraphData: {}
    }
  },
}
</script>