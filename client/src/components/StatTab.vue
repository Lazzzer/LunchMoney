<template>
  <div class="mt-4 border expenseTab border-lunchPink-600 rounded-lunch" style="height:calc(100% - 194px);">
    <div class="flex justify-center w-full mt-4 buttons">
      <div class="flex items-center w-32 mr-2 ">
        <div @click="currentTab = 1" :class="[currentTab === 1 ? 'bg-lunchPink-600 ': 'bg-lunchPurple-200', 'no-highlight-color cursor-pointer w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']">
          CURRENT BUDGET
        </div>
      </div>
      <div class="flex items-center w-32 ">
        <div @click="currentTab = 2" :class="[currentTab === 2 ? 'bg-lunchPink-600 ': 'bg-lunchPurple-200', 'no-highlight-color cursor-pointer w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']">
          ALL BUDGETS
        </div>
      </div>
    </div>
    <stat-current-budget v-if="currentTab === 1"></stat-current-budget>
    <stat-all-budgets v-if="currentTab === 2"></stat-all-budgets>

  </div>
</template>

<script>
import StatCurrentBudget from '.././components/StatCurrentBudget'
import StatAllBudgets from '.././components/StatAllBudgets'

export default {
  components: {
    StatCurrentBudget,
    StatAllBudgets
  },
  data() {
    return {
      currentTab: 1
    }
  },
}
</script>