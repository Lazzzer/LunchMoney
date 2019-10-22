<template>
  <div class="main-budget w-full h-full">
    <div>
      <div class="header flex justify-end pt-4 w-5/6 mx-auto">
        <div class="relative focus:outline-none">
          <router-link to="/dashboard"
                       :class="['bg-lunchPink-600 flex items-center block py-1 px-5 rounded-full text-lunchPurple-700 text-center font-black focus:bg-lunchPink-700 focus:outline-none']"
          >
            <svg class="mr-2" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.223448 4.91581L4.54156 0.242268C4.84002 -0.080756 5.32263 -0.080756 5.61791 0.242268L6.33548 1.0189C6.63394 1.34192 6.63394 1.86426 6.33548 2.18385L3.27788 5.5L6.33866 8.81271C6.63712 9.13574 6.63712 9.65807 6.33866 9.97766L5.62109 10.7577C5.32263 11.0808 4.84002 11.0808 4.54474 10.7577L0.226623 6.08419C-0.0750098 5.76117 -0.0750097 5.23883 0.223448 4.91581Z" fill="#12012F" />
            </svg>
            Dashboard
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="validParams" class="dashboard w-5/6 mx-auto mt-4" style="height:88%;">
      <div class="' border border-lunchPink-600 bg-lunchPurple-800 rounded-lunch h-32 w-full'">
        <div class="flex justify-between items-center">
          <h2 class="mt-2 ml-4 text-lunchPink-600 text-xl italic font-black">BUDGET</h2>
          <h2 class="mt-2 mr-4 text-white text-lg italic font-bold uppercase">{{ month }}</h2>
        </div>
        <div class="mx-4 bg-lunchPurple-500 mt-2 rounded-expenses h-13 flex items-center justify-center text-white italic font-bold text-xl">
          <svg class="inline-block mr-2 w-4 h-auto" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1146 0L12 3.4375H9.89375L8.45208 0H10.1146ZM7.44792 0L8.88958 3.4375H3.11042L4.55208 0H7.44792ZM1.88542 0H3.54792L2.10625 3.4375H0L1.88542 0ZM0 4.125H2.09792L4.66042 9.53262C4.69167 9.59922 4.60417 9.65938 4.55625 9.60352L0 4.125ZM3.0875 4.125H8.9125L6.05833 10.9613C6.0375 11.0129 5.96458 11.0129 5.94375 10.9613L3.0875 4.125ZM7.33958 9.53262L9.90208 4.125H12L7.44375 9.60137C7.39583 9.65938 7.30833 9.59922 7.33958 9.53262Z" fill="#E2E8F0" />
          </svg>
          <span>{{ parseFloat(currentBalance).toFixed(2) }}</span>
          <span class="text-lunchPurple-100 italic font-bold text-2xl">/</span>
          <span class="text-lunchPink-600">{{ parseFloat(limit).toFixed(2) }}</span>
          <span class="ml-1 text-base not-italic mt-1">{{ this.$store.state.currentCurrency }}</span>
        </div>
      </div>
      <div class="flex items-center justify-center mt-4 ">
        <div class="relative w-1/3 flex items-center mr-2">
          <div @click="editBudget = !editBudget"
               :class="['bg-lunchPink-600 w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']"
          >
            <i class="fas fa-edit text-xs text-lunchPurple-700 mr-1"></i>EDIT</div>
        </div>
        <div v-if="isCurrentBudget" class="relative w-1/3 flex items-center mr-2">
          <div @click="archiveBudget = !archiveBudget" 
               :class="['bg-lunchPink-600 w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']"
          >
            <i class="fas fa-archive text-xs text-lunchPurple-700 mr-1"></i>ARCHIVE</div>
        </div>
        <div class="relative w-1/3 flex items-center">
          <div @click="deleteBudget = !deleteBudget"  
               :class="['bg-lunchPurple-900 w-full inline-block  py-2 rounded-full text-lunchPink-600 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']"
          >
            <i class="fas fa-trash-alt text-xs text-lunchPink-600 mr-1"></i>DELETE</div>
        </div>

      </div>
      <!-- EXPENSES SHOW -->
      <div class="mt-4 expenseTab border border-lunchPink-600 rounded-lunch" style="height:calc(100% - 194px);">
        <h2 class=" w-17/20 mt-5 mb-2 mx-auto text-lunchPink-600 text-base italic font-black">EXPENSES IN THIS BUDGET</h2>
        <div v-if="expenses.length > 0" class="overflow-y-scroll w-ful" style="height:calc(100% - 80px);">
          <div v-for="(expense, index) in expenses.slice().reverse()" :key="`expense-${index}`"
               v-touch:swipe.left="swipe(index)"
               v-touch:swipe.right="swipe(index)"
               :id="index"
               class=" mx-4 bg-lunchPurple-500 mb-2 rounded-expenses h-13 flex items-center"
          >
            <svg class="ml-4" width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path v-if="expense.type === 'Other'" d="M14.7826 6.61936L8.49238 0.411885C8.22514 0.148161 7.86269 1.95022e-06 7.48476 0H1.425C0.637985 0 0 0.62959 0 1.40625V7.38627C1.97623e-06 7.75923 0.150137 8.11691 0.417377 8.38063L6.70763 14.5881C7.26409 15.1373 8.16635 15.1373 8.72287 14.5881L14.7826 8.60809C15.3391 8.05892 15.3391 7.16853 14.7826 6.61936ZM3.325 4.6875C2.53799 4.6875 1.9 4.05791 1.9 3.28125C1.9 2.50459 2.53799 1.875 3.325 1.875C4.11202 1.875 4.75 2.50459 4.75 3.28125C4.75 4.05791 4.11202 4.6875 3.325 4.6875ZM18.5826 8.60809L12.5229 14.5881C11.9664 15.1373 11.0641 15.1373 10.5076 14.5881L10.4969 14.5776L15.6643 9.47818C16.169 8.98016 16.4469 8.31802 16.4469 7.61373C16.4469 6.90943 16.1689 6.24729 15.6643 5.74928L9.83835 0H11.2848C11.6627 1.95022e-06 12.0251 0.148161 12.2924 0.411885L18.5826 6.61936C19.1391 7.16853 19.1391 8.05892 18.5826 8.60809Z" fill="#F71140" />
              <path v-if="expense.type === 'Food'" d="M5.99712 0.445353C6.02019 0.583048 6.46154 3.2139 6.46154 4.21878C6.46154 5.751 5.65962 6.84377 4.47404 7.28323L4.84615 14.2588C4.86635 14.6602 4.55192 15 4.15385 15H2.30769C1.9125 15 1.59519 14.6631 1.61538 14.2588L1.9875 7.28323C0.799038 6.84377 0 5.74807 0 4.21878C0 3.21097 0.441346 0.583048 0.464423 0.445353C0.556731 -0.149372 1.77115 -0.158161 1.84615 0.47758V4.61429C1.88365 4.7139 2.28173 4.70804 2.30769 4.61429C2.34808 3.87308 2.53558 0.536173 2.53846 0.460002C2.63365 -0.149372 3.82788 -0.149372 3.92019 0.460002C3.92596 0.539103 4.11058 3.87308 4.15096 4.61429C4.17692 4.70804 4.57788 4.7139 4.6125 4.61429V0.47758C4.6875 -0.155231 5.90481 -0.149372 5.99712 0.445353ZM9.43558 8.81545L9.00288 14.2383C8.96827 14.6484 9.28846 15 9.69231 15H11.3077C11.6913 15 12 14.6865 12 14.2969V0.703165C12 0.316447 11.6913 4.18589e-05 11.3077 4.18589e-05C8.92789 4.18589e-05 4.92115 5.22952 9.43558 8.81545Z" fill="#F71140" />        
            </svg>
            <div class="ml-2 w-3/4">
              <div class="flex justify-between">
                <h4 class="text-white text-sm font-bold"><span class="text-lunchPink-600 text-base font-bold overflow-x-hidden">-{{ parseFloat(expense.price).toFixed(2) }}</span> {{ $store.state.currentCurrency }}</h4>
                <span class="text-lunchPink-600 text-xs font-bold italic">{{ formatDate(expense.created_at) }}</span>
              </div>
              <p class="text-lunchPurple-100 text-xs -mt-1 ">{{ truncateDesc(expense.description, 25) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="w-17/20 mx-auto rounded-lunch bg-lunchPurple-500 flex flex-col items-center justify-center" style="height:calc(100% - 80px);">
          <svg width="70" height="46" viewBox="0 0 70 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.0202 21.5515L56.1762 2.56043C55.6435 1.77282 54.9217 1.12703 54.075 0.680376C53.2283 0.233721 52.2828 1.49722e-05 51.3225 0H18.6775C17.7172 3.03184e-06 16.7717 0.233705 15.925 0.680362C15.0783 1.12702 14.3566 1.77281 13.8239 2.56043L0.979757 21.5515C0.340895 22.496 -1.40647e-05 23.6058 4.35203e-10 24.7409L4.35204e-10 40.25C4.35204e-10 43.4257 2.61163 46 5.83333 46H64.1667C67.3884 46 70 43.4257 70 40.25V24.7409C70 23.6058 69.6591 22.496 69.0202 21.5515ZM19.7181 7.66667H50.282L60.6523 23H45.6944L41.8056 30.6667H28.1944L24.3056 23H9.34767L19.7181 7.66667Z" fill="#F71140" />
          </svg>
          <h3 class="text-lunchPurple-100 mt-4 italic text-xs">NO EXPENSES</h3>
        </div>
      </div>
      <modal-edit-budget v-if="editBudget" @closing-modal="editBudget = false" :limit="limit" :budget-id="budgetID"></modal-edit-budget>
      <modal-archive-budget v-if="archiveBudget" @closing-modal="archiveBudget = false" :budget-id="budgetID"></modal-archive-budget>
      <modal-delete-budget v-if="deleteBudget" @closing-modal="deleteBudget = false" :budget-id="budgetID"></modal-delete-budget>
      <modal-delete-expense v-if="deleteExpense" @closing-modal="deleteExpense = false" :expense-id="expenses.slice().reverse()[selectedExpense]._id"></modal-delete-expense>
    </div>
    <div v-else-if="validParams = false" class="w-full text-center">
      <h1 class="text-xl text-white font-black mt-10">ACCES DENIED</h1>
    </div>
  </div></template>

<script>
import ModalEditBudget from '../components/ModalEditBudget.vue'
import ModalArchiveBudget from '../components/ModalArchiveBudget.vue'
import ModalDeleteBudget from '../components/ModalDeleteBudget.vue'
import ModalDeleteExpense from '../components/ModalDeleteExpense.vue'


import { EventBus } from './../eventBus.js'

export default {
  components: {
    ModalEditBudget,
    ModalArchiveBudget,
    ModalDeleteBudget,
    ModalDeleteExpense
  },
  data() {
    return {
      validParams: null,
      budgetID: this.$route.params.id,
      limit: null,
      month: '',
      expenses: [],
      isCurrentBudget: null,
      editBudget: false,
      archiveBudget: false,
      deleteBudget: false,
      currentBalance: null,
      selectedExpense: null,
      deleteExpense: false
    }
  },
  created() {
    this.getBudget()
    EventBus.$on('budget-edited', () => {
      this.getBudget()
    })
    EventBus.$on('expense-deleted', () => {
      this.getBudget()
    })
    EventBus.$on('budget-archived', () => {
      this.isCurrentBudget = false
    })
    EventBus.$on('budget-deleted', () => {
      this.$router.push('/dashboard')
    })
  },
  methods: {
    swipe(param) {
      return (direction, event) => {
        console.log(direction, param)
        if (direction === 'right') {
          let expenseDiv = document.getElementById(param)
          expenseDiv.className += ' swipe-right-delete'
          setTimeout(() => {
            this.selectedExpense = param
            this.deleteExpense = true
            expenseDiv.classList.remove('swipe-right-delete')
          }, 400)
        }
        if (direction === 'left') {
          let expenseDiv = document.getElementById(param)
          expenseDiv.className += ' swipe-left-edit'
          setTimeout(() => {
            this.selectedExpense = param
            this.deleteExpense = true
            expenseDiv.classList.remove('swipe-left-edit')
          }, 400)
        }
      }
    },
    getBudget() {
      this.$axios.get(`/budget/expenses/${this.budgetID}`)
        .then(res => {
          console.log(res)
          if (res.status === 202) {
            this.isCurrentBudget = res.data.current
            this.limit = res.data.limit
            this.month = this.fullDate(res.data.created_at)
            this.expenses = res.data.expenses
            this.currentBalance = this.getCurrentBalance()
            this.validParams = true
          }
          else {
            this.validParams = false
          }
        })
        .catch()
    },
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
    truncateDesc(str, num) {
      return str.length <= num ? str : str.slice(0, num) + '...'
    },
    formatDate(dateToParse) {
      let date = new Date(dateToParse)
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: '2-digit' })
    },
  },
}
</script>