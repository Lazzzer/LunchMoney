<template>
  <div :class="['mt-4 border border-lunchPink-600 rounded-lunch h-26 no-highlight-color cursor-pointer', noCurrentBudget ? 'bg-lunchPurple-900' : 'bg-lunchPurple-800' ]">
    <div v-if="!noCurrentBudget && noCurrentBudget !== null">
      <router-link :to="{name: 'budget', params: {id: id}}">
        <h2 class="mt-2 ml-4 text-xl italic font-black uppercase text-lunchPink-600">Current budget </h2>
        <h3 class="ml-4 -mt-1 text-xs italic font-bold text-white uppercase">{{ month }}</h3>
        <span v-if="$store.state.defaultBudget" class="block mr-4 -mb-2 text-xs italic text-right uppercase text-lunchPurple-100">{{ getRemainingTime() }} {{ getRemainingTime() > 1 ? 'DAYS' : 'DAY ' }} REMAINING</span>
        <span v-else class="block mt-2 mr-4 text-xs italic text-right uppercase text-lunchPurple-100"></span>
        <div class="mr-4 text-2xl italic font-bold text-right text-white">
          <svg class="inline-block mr-1 -mt-1" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1146 0L12 3.4375H9.89375L8.45208 0H10.1146ZM7.44792 0L8.88958 3.4375H3.11042L4.55208 0H7.44792ZM1.88542 0H3.54792L2.10625 3.4375H0L1.88542 0ZM0 4.125H2.09792L4.66042 9.53262C4.69167 9.59922 4.60417 9.65938 4.55625 9.60352L0 4.125ZM3.0875 4.125H8.9125L6.05833 10.9613C6.0375 11.0129 5.96458 11.0129 5.94375 10.9613L3.0875 4.125ZM7.33958 9.53262L9.90208 4.125H12L7.44375 9.60137C7.39583 9.65938 7.30833 9.59922 7.33958 9.53262Z" fill="#E2E8F0" />
          </svg>
          <span>{{ currentBalance.toFixed(2) }}</span>
          <span class="text-2xl italic font-bold text-lunchPurple-100">/</span>
          <span class="text-lunchPink-600">{{ parseFloat(limit).toFixed(2) }}</span>
          <span class="ml-1 text-lg not-italic">{{ currency }}</span>
        </div>
      </router-link>
    </div>
    <div v-else-if="noCurrentBudget" @click="openModal" class="flex flex-col items-center justify-center w-full h-full">
      <h2 class="text-xs italic font-black text-center text-white uppercase">No budget for the current month</h2>
      <div class="flex items-center mt-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.47581 0 0 4.47581 0 10C0 15.5242 4.47581 20 10 20C15.5242 20 20 15.5242 20 10C20 4.47581 15.5242 0 10 0ZM15.8065 11.129C15.8065 11.3952 15.5887 11.6129 15.3226 11.6129H11.6129V15.3226C11.6129 15.5887 11.3952 15.8065 11.129 15.8065H8.87097C8.60484 15.8065 8.3871 15.5887 8.3871 15.3226V11.6129H4.67742C4.41129 11.6129 4.19355 11.3952 4.19355 11.129V8.87097C4.19355 8.60484 4.41129 8.3871 4.67742 8.3871H8.3871V4.67742C8.3871 4.41129 8.60484 4.19355 8.87097 4.19355H11.129C11.3952 4.19355 11.6129 4.41129 11.6129 4.67742V8.3871H15.3226C15.5887 8.3871 15.8065 8.60484 15.8065 8.87097V11.129Z" fill="#F71140" />
        </svg>
        <h2 class="ml-2 text-base italic font-black uppercase text-lunchPink-600">CREATE NEW BUDGET</h2>
      </div>
    </div>
    <div v-if="newBudgetModal" class="absolute top-0 left-0 flex items-center justify-center w-screen h-screen modal-new-budget">    
      <div @click="openModal" class="absolute top-0 left-0 z-10 w-screen h-screen" style="background-color:rgba(0, 0, 0, 0.8);">
      </div>
      <div class="z-10 w-5/6 border h-66 bg-lunchPurple-800 rounded-lunch border-lunchPink-600" style="max-width:600px;">
        <div v-if="budgetCreated" class="w-full">
          <svg class="mx-auto mt-4" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M59.9216 103.763L32.4014 76.3057C30.748 74.6561 30.748 71.9815 32.4014 70.3318L38.3889 64.3579C40.0422 62.7082 42.7231 62.7082 44.3765 64.3579L62.9154 82.8541L102.624 43.2372C104.277 41.5876 106.958 41.5876 108.611 43.2372L114.599 49.2111C116.252 50.8606 116.252 53.5352 114.599 55.1849L65.9092 103.763C64.2557 105.412 61.5749 105.412 59.9216 103.763Z" fill="#68D391" />
            <circle cx="73.5" cy="73.5" r="70.5" stroke="#68D391" stroke-width="6" />
          </svg>
          <h1 class="mt-4 text-lg italic text-center text-green-500">Successfully created!</h1>
          <div @click="openModal" class="block w-3/5 px-3 py-3 mx-auto mt-4 text-lg font-black text-center uppercase rounded-full cursor-pointer no-highlight-color bg-lunchPink-600 text-lunchPurple-700 focus:outline-none ">EXIT</div>
        </div>
        <div v-else>
          <h2 class="mt-2 ml-4 text-2xl italic font-black uppercase text-lunchPink-600">NEW BUDGET</h2>
          <div class="relative w-3/5 mx-auto mt-10">
            <input v-model="newLimit" 
                   :class="[errorLimit ? 'border-red-400' : 'border-lunchPink-600','relative pl-12 pr-2 h-12 w-full block bg-transparent text-white placeholder-white font-bold text-2xl border-b-2 placeholder-gray-700 focus:outline-none focus:border-white']" 
                   type="number" name="number" placeholder="Limit" required
            >
            <span v-if="hasError && errorLimit" class="absolute left-0 mt-2 text-xs text-red-400 bottom-2">{{ errorLimit.message }}</span>
            <span class="absolute top-0 left-0 mt-3 mr-2 text-lg font-bold text-lunchPink-600">{{ currency }}</span>
            <div @click="createBudget" class="block w-full px-3 py-3 mt-16 text-lg font-black text-center uppercase rounded-full cursor-pointer no-highlight-color bg-lunchPink-600 text-lunchPurple-700 focus:outline-none">CREATE</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from './../eventBus.js'
export default {
  data() {
    return {
      newBudgetModal: false,
      budgetCreated: false,
      noCurrentBudget: null,
      id: null,
      limit: null,
      newLimit: null,
      currentBalance: null,
      expenses: null,
      month: '',
      currency: this.$store.state.currentCurrency,
      hasError: false,
      errorArray: [],
      errorLimit: null,
    }
  },
  created() {
    EventBus.$on('expense-added', () => {
      this.getCurrentBudget()
    })
    EventBus.$on('expense-edited', () => {
      this.getCurrentBudget()
    })
    EventBus.$on('expense-deleted', () => {
      this.getCurrentBudget()
    })
    this.getCurrentBudget()
  },
  methods: {
    openModal() {
      this.newLimit = null
      this.newBudgetModal = !this.newBudgetModal
      this.errorArray = []
      this.errorLimit = null
    },
    fullDate: (dateToParse) => {
      let date = new Date(dateToParse)
      console.log(date)
      return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) + ' ' + date.getFullYear()
    },
    getRemainingTime() {
      const currentTime = new Date(Date.now())
      const firstDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())
      const lastDay = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0)

      return lastDay.getDate() - firstDay.getDate() + 1
    },
    getCurrentBalance() {
      return this.expenses.reduce((currentTotal, expense) => {
        return parseFloat(expense.price) + currentTotal
      }, 0)
    },
    createBudget() {
      this.$axios.post('/budget/create', {
        limit: this.newLimit
      })
        .then((res) => {
          console.log(res)
          if (res.status === 201) {
            this.budgetCreated = true
            this.getCurrentBudget()
          }
        }).catch((err) => {
          console.log(err)
          this.hasError = true
          this.errorArray = err.response.data
          this.errorLimit = this.hadError('limit')
        })
    },
    getCurrentBudget() {
      this.$axios.get('/budget/current')
        .then(res => {
          console.log(res)
          if (res.data !== '') {
            this.id = res.data._id
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
    },
    hadError(field) {
      let value = this.errorArray.find(obj => {
        return obj.field === field
      })
      return value === undefined ? false : value
    }
  },
}
</script>