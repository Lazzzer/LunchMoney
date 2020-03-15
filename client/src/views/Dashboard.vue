<template>
  <div v-if="authorized" class="w-full h-full main-dashboard">
    <div class="flex justify-end w-5/6 pt-4 mx-auto header no-highlight-color">
      <div class="relative cursor-pointer focus:outline-none no-highlight-color">
        <span @click="optionToggled = !optionToggled"
              :class="[optionToggled ? 'bg-white' : 'bg-lunchPink-600',' flex items-center block py-1 px-5 rounded-full text-lunchPurple-700 text-center font-black focus:bg-lunchPink-700 focus:outline-none']"
        >
          <svg class="mr-2" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.223448 4.91581L4.54156 0.242268C4.84002 -0.080756 5.32263 -0.080756 5.61791 0.242268L6.33548 1.0189C6.63394 1.34192 6.63394 1.86426 6.33548 2.18385L3.27788 5.5L6.33866 8.81271C6.63712 9.13574 6.63712 9.65807 6.33866 9.97766L5.62109 10.7577C5.32263 11.0808 4.84002 11.0808 4.54474 10.7577L0.226623 6.08419C-0.0750098 5.76117 -0.0750097 5.23883 0.223448 4.91581Z" fill="#12012F" />
          </svg>
          <span class="text-sm uppercase">{{ this.$store.state.currentUserName }}</span>
        </span>
        <div v-if="optionToggled" class="absolute top-0 flex items-center mt-1 -ml-24">
          <svg @click="logout" class="mr-4" width="28" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.6125 11.429L18.2787 20.6149C17.4453 21.4351 16.0008 20.861 16.0008 19.6854V14.4363H8.44486C7.70594 14.4363 7.11146 13.8512 7.11146 13.124V7.87486C7.11146 7.14763 7.70594 6.56257 8.44486 6.56257H16.0008V1.31344C16.0008 0.143327 17.4398 -0.436264 18.2787 0.383912L27.6125 9.56989C28.1292 10.0839 28.1292 10.915 27.6125 11.429ZM10.6672 20.3415V18.1544C10.6672 17.7935 10.3672 17.4983 10.0005 17.4983H5.3336C4.35022 17.4983 3.55573 16.7164 3.55573 15.7485V5.25029C3.55573 4.28248 4.35022 3.50058 5.3336 3.50058H10.0005C10.3672 3.50058 10.6672 3.20532 10.6672 2.84444V0.657304C10.6672 0.296426 10.3672 0.00116294 10.0005 0.00116294H5.3336C2.38901 0.00116294 0 2.35233 0 5.25029V15.7485C0 18.6465 2.38901 20.9977 5.3336 20.9977H10.0005C10.3672 20.9977 10.6672 20.7024 10.6672 20.3415Z" fill="#F71140" />
          </svg>
          <router-link to="/settings">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5424 14.2691L23.6965 15.509C23.9425 15.6506 24.0567 15.9434 23.9724 16.2139C23.4129 18.0104 22.4576 19.6334 21.2081 20.9813C21.1146 21.0823 20.9895 21.1485 20.8533 21.1691C20.717 21.1898 20.5778 21.1636 20.4584 21.0949L18.306 19.8553C17.4004 20.629 16.3592 21.2293 15.2349 21.6259V24.1049C15.2349 24.2423 15.188 24.3757 15.1018 24.4831C15.0157 24.5904 14.8954 24.6653 14.7609 24.6955C12.994 25.0912 11.0964 25.1116 9.24035 24.6958C8.96285 24.6337 8.76507 24.3886 8.76507 24.105V21.6259C7.64074 21.2294 6.59956 20.6291 5.69395 19.8553L3.54151 21.0949C3.42215 21.1636 3.28293 21.1898 3.14669 21.1691C3.01046 21.1485 2.88531 21.0823 2.79181 20.9813C1.54242 19.6334 0.58705 18.0104 0.0275071 16.2139C-0.0567528 15.9434 0.0574302 15.6506 0.303437 15.509L2.45755 14.2691C2.24119 13.0996 2.24119 11.9005 2.45755 10.7309L0.303488 9.49104C0.0574808 9.34945 -0.0567023 9.05666 0.0275576 8.78615C0.5871 6.98968 1.54242 5.3667 2.79186 4.01872C2.88536 3.91779 3.01051 3.85156 3.14674 3.83091C3.28298 3.81027 3.4222 3.83643 3.54156 3.90511L5.694 5.14478C6.59963 4.37101 7.6408 3.77072 8.76512 3.37412V0.89514C8.76511 0.757653 8.81205 0.624261 8.89819 0.516913C8.98434 0.409566 9.10456 0.334658 9.23909 0.304516C11.006 -0.091148 12.9036 -0.111612 14.7597 0.304163C15.0371 0.366311 15.2349 0.611421 15.2349 0.895039V3.37407C16.3593 3.77064 17.4004 4.37094 18.306 5.14473L20.4585 3.90506C20.5778 3.83638 20.7171 3.81022 20.8533 3.83086C20.9895 3.85151 21.1147 3.91774 21.2082 4.01867C22.4576 5.36665 23.413 6.98963 23.9725 8.7861C24.0568 9.05656 23.9426 9.34935 23.6966 9.49098L21.5424 10.7309C21.7588 11.9004 21.7588 13.0996 21.5424 14.2691ZM16.0437 12.5C16.0437 10.2766 14.2297 8.46775 12 8.46775C9.77032 8.46775 7.95633 10.2766 7.95633 12.5C7.95633 14.7234 9.77032 16.5322 12 16.5322C14.2297 16.5322 16.0437 14.7234 16.0437 12.5Z" fill="#F71140" />
            </svg>
          </router-link>
          
        </div>
      </div>
    </div>
    <div class="w-5/6 mx-auto dashboard" style="height:89%;">
      <current-budget></current-budget>
      <div class="flex items-center justify-center mt-4 ">
        <div class="relative flex items-center w-1/3 mr-2">
          <div @click="currentTab = 1" :class="[currentTab === 1 ? 'bg-lunchPink-600 ': 'bg-lunchPurple-200', 'no-highlight-color cursor-pointer w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']">
            <i class="mr-1 text-xs fas fa-tags text-lunchPurple-700"></i>EXPENSES</div>
        </div>

        <div class="relative flex items-center w-1/3 mr-2">
          <div @click="currentTab = 2" :class="[currentTab === 2 ? 'bg-lunchPink-600 ': 'bg-lunchPurple-200', 'no-highlight-color cursor-pointer w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']">
            <i class="mr-1 text-xs fas fa-list text-lunchPurple-700"></i>BUDGETS</div>
        </div>
        <div class="relative flex items-center w-1/3">
          <div @click="currentTab = 3" :class="[currentTab === 3 ? 'bg-lunchPink-600 ': 'bg-lunchPurple-200', 'no-highlight-color cursor-pointer w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']">
            <i class="mr-1 text-xs fas fa-chart-pie text-lunchPurple-700"></i>STATISTICS</div>
        </div>
      </div>
      <expenses-tab v-if="currentTab === 1"></expenses-tab>
      <budget-tab v-if="currentTab === 2"></budget-tab>
      <stat-tab v-if="currentTab === 3"></stat-tab>
    </div>
    
    
  </div>
</template>
<script>
import CurrentBudget from '../components/CurrentBudget.vue'
import ExpensesTab from '../components/ExpensesTab.vue'
import BudgetTab from '../components/BudgetTab.vue'
import StatTab from '../components/StatTab.vue'


export default {
  components: {
    CurrentBudget,
    ExpensesTab,
    BudgetTab,
    StatTab
  },
  data() {
    return {
      authorized: true,
      optionToggled: false,
      currentTab: 1
    }
  },
  beforeCreate() {
    this.$store.commit('setName', 'JohnDoe')
    this.$store.commit('setEmail', 'johndoe@demo.com')
    this.$store.commit('setCurrency', 'USD')
    this.$store.commit('setDefaultBudget', true)
    this.$store.commit('setDefaultValue', '300')
    // this.$axios.get('/user')
    //   .then(res => {
    //     console.log(res)
    //     this.$store.commit('setName', res.data[0])
    //     this.$store.commit('setEmail', res.data[1])
    //     this.$store.commit('setCurrency', res.data[2])
    //     this.$store.commit('setDefaultBudget', res.data[3])
    //     this.$store.commit('setDefaultValue', res.data[4])
    //     this.authorized = true
    //   })
    //   .catch()
  },
  methods: {
    logout() {
      this.$router.push('login')
      // this.$axios.post('/logout')
      //   .then(res => {
      //     console.log(res)
      //     res.status === 202 ? this.authorized = false : ''
      //     this.$cookies.isKey('refresh-token') ? this.$cookies.remove('refresh-token') : null
      //     this.$cookies.isKey('token') ? this.$cookies.remove('token') : null
      //     this.$router.push('/login')
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }
}
</script>