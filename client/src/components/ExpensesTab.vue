<template>
  <div class="mt-4 expenseTab border border-lunchPink-600 rounded-lunch" style="height:calc(100% - 194px);">
    <div class="flex justify-center w-17/20 mx-auto mt-5 block py-3 px-3 rounded-full bg-lunchPurple-900 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none focus:bg-lunchPink-700">
      <svg class="w-5 h-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.47581 0 0 4.47581 0 10C0 15.5242 4.47581 20 10 20C15.5242 20 20 15.5242 20 10C20 4.47581 15.5242 0 10 0ZM15.8065 11.129C15.8065 11.3952 15.5887 11.6129 15.3226 11.6129H11.6129V15.3226C11.6129 15.5887 11.3952 15.8065 11.129 15.8065H8.87097C8.60484 15.8065 8.3871 15.5887 8.3871 15.3226V11.6129H4.67742C4.41129 11.6129 4.19355 11.3952 4.19355 11.129V8.87097C4.19355 8.60484 4.41129 8.3871 4.67742 8.3871H8.3871V4.67742C8.3871 4.41129 8.60484 4.19355 8.87097 4.19355H11.129C11.3952 4.19355 11.6129 4.41129 11.6129 4.67742V8.3871H15.3226C15.5887 8.3871 15.8065 8.60484 15.8065 8.87097V11.129Z" fill="#F71140" />
      </svg>
      <h2 class="ml-5 text-lunchPink-600 text-base italic font-black uppercase">CREATE NEW EXPENSE</h2>
    </div>
    <h2 class=" w-17/20 my-2 mx-auto text-lunchPink-600 text-base italic font-black uppercase">LATEST EXPENSES</h2>
    <div v-if="noExpenses" class="w-17/20 mx-auto rounded-lunch bg-lunchPurple-500 flex flex-col items-center justify-center" style="height:calc(100% - 130px);">
      <svg width="70" height="46" viewBox="0 0 70 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M69.0202 21.5515L56.1762 2.56043C55.6435 1.77282 54.9217 1.12703 54.075 0.680376C53.2283 0.233721 52.2828 1.49722e-05 51.3225 0H18.6775C17.7172 3.03184e-06 16.7717 0.233705 15.925 0.680362C15.0783 1.12702 14.3566 1.77281 13.8239 2.56043L0.979757 21.5515C0.340895 22.496 -1.40647e-05 23.6058 4.35203e-10 24.7409L4.35204e-10 40.25C4.35204e-10 43.4257 2.61163 46 5.83333 46H64.1667C67.3884 46 70 43.4257 70 40.25V24.7409C70 23.6058 69.6591 22.496 69.0202 21.5515ZM19.7181 7.66667H50.282L60.6523 23H45.6944L41.8056 30.6667H28.1944L24.3056 23H9.34767L19.7181 7.66667Z" fill="#F71140" />
      </svg>
      <h3 class="text-lunchPurple-100 mt-4 italic text-xs">EXPENSES NOT FOUND</h3>
    </div>
    <div v-else class="w-17/20 mx-auto overflow-y-scroll" style="height:calc(100% - 130px);">
      <div v-for="(expense, index) in expenses" :key="`expense-${index}`"
           class="w-full bg-lunchPurple-500 mb-2 rounded-expenses h-13 flex items-center"
      >
        <svg class="ml-4" width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path v-if="expense.type === 'Other'" d="M14.7826 6.61936L8.49238 0.411885C8.22514 0.148161 7.86269 1.95022e-06 7.48476 0H1.425C0.637985 0 0 0.62959 0 1.40625V7.38627C1.97623e-06 7.75923 0.150137 8.11691 0.417377 8.38063L6.70763 14.5881C7.26409 15.1373 8.16635 15.1373 8.72287 14.5881L14.7826 8.60809C15.3391 8.05892 15.3391 7.16853 14.7826 6.61936ZM3.325 4.6875C2.53799 4.6875 1.9 4.05791 1.9 3.28125C1.9 2.50459 2.53799 1.875 3.325 1.875C4.11202 1.875 4.75 2.50459 4.75 3.28125C4.75 4.05791 4.11202 4.6875 3.325 4.6875ZM18.5826 8.60809L12.5229 14.5881C11.9664 15.1373 11.0641 15.1373 10.5076 14.5881L10.4969 14.5776L15.6643 9.47818C16.169 8.98016 16.4469 8.31802 16.4469 7.61373C16.4469 6.90943 16.1689 6.24729 15.6643 5.74928L9.83835 0H11.2848C11.6627 1.95022e-06 12.0251 0.148161 12.2924 0.411885L18.5826 6.61936C19.1391 7.16853 19.1391 8.05892 18.5826 8.60809Z" fill="#F71140" />
          <path v-if="expense.type === 'Food'" d="M5.99712 0.445353C6.02019 0.583048 6.46154 3.2139 6.46154 4.21878C6.46154 5.751 5.65962 6.84377 4.47404 7.28323L4.84615 14.2588C4.86635 14.6602 4.55192 15 4.15385 15H2.30769C1.9125 15 1.59519 14.6631 1.61538 14.2588L1.9875 7.28323C0.799038 6.84377 0 5.74807 0 4.21878C0 3.21097 0.441346 0.583048 0.464423 0.445353C0.556731 -0.149372 1.77115 -0.158161 1.84615 0.47758V4.61429C1.88365 4.7139 2.28173 4.70804 2.30769 4.61429C2.34808 3.87308 2.53558 0.536173 2.53846 0.460002C2.63365 -0.149372 3.82788 -0.149372 3.92019 0.460002C3.92596 0.539103 4.11058 3.87308 4.15096 4.61429C4.17692 4.70804 4.57788 4.7139 4.6125 4.61429V0.47758C4.6875 -0.155231 5.90481 -0.149372 5.99712 0.445353ZM9.43558 8.81545L9.00288 14.2383C8.96827 14.6484 9.28846 15 9.69231 15H11.3077C11.6913 15 12 14.6865 12 14.2969V0.703165C12 0.316447 11.6913 4.18589e-05 11.3077 4.18589e-05C8.92789 4.18589e-05 4.92115 5.22952 9.43558 8.81545Z" fill="#F71140" />        
        </svg>

        <div class="ml-2 w-3/4">
          <div class="flex justify-between">
            <h4 class="text-white text-sm font-bold"><span class="text-lunchPink-600 text-base font-bold overflow-x-hidden">-{{ parseFloat(expense.price).toFixed(2) }}</span> {{ $store.state.currentCurrency }}</h4>
            <span class="text-lunchPink-600 text-xs font-bold italic">03/10/19</span>
          </div>
          <p class="text-lunchPurple-100 text-xs -mt-1 ">{{ truncateDesc(expense.description, 25) }}</p>
        </div>
      </div>
      <svg class="mx-auto" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 11.5C23 17.8528 17.8528 23 11.5 23C5.14718 23 0 17.8528 0 11.5C0 5.14718 5.14718 0 11.5 0C17.8528 0 23 5.14718 23 11.5ZM12.2883 16.7817L18.5716 10.4984C19.0075 10.0625 19.0075 9.35766 18.5716 8.92641L17.7833 8.13811C17.3474 7.70222 16.6425 7.70222 16.2113 8.13811L11.5 12.8494L6.78871 8.13811C6.35282 7.70222 5.64798 7.70222 5.21673 8.13811L4.42843 8.92641C3.99254 9.3623 3.99254 10.0671 4.42843 10.4984L10.7117 16.7817C11.1476 17.2175 11.8524 17.2175 12.2883 16.7817Z" fill="#F71140" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expenses: [],
      noExpenses: null
    }
  },
  beforeCreate() {
    this.$axios.get('/expense/all')
      .then(res => {
        console.log(res)
        this.expenses = res.data
        res.status === 204 ? this.noExpenses = true : this.noExpenses = false
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    truncateDesc(str, num) {
      return str.length <= num ? str : str.slice(0, num) + '...'
    }
  },
}
</script>