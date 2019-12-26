<template>
  <div class="mt-4 border expenseTab border-lunchPink-600 rounded-lunch" style="height:calc(100% - 194px);">
    <h2 class="mx-auto mt-5 text-base italic font-black w-17/20 text-lunchPink-600">STATISTICS</h2>
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