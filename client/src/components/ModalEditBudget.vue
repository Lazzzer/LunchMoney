<template>
  <div>
    <div class="modal-new-budget w-screen h-screen absolute top-0 left-0 flex items-center justify-center">    
      <div @click="$emit('closing-modal')" class="absolute w-screen h-screen top-0 left-0q  " style="background-color:rgba(0, 0, 0, 0.8);">
      </div>
      <div class="w-5/6 bg-lunchPurple-800 rounded-lunch border border-lunchPink-600 z-10 h-66" style="max-width:600px;">
        <div v-if="sameBudget" class="flex items-center w-full h-full">
          <div class="w-full">
            <svg class="mx-auto" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M88 105.469C88 113.481 81.4953 120 73.5 120C65.5047 120 59 113.481 59 105.469C59 97.4562 65.5047 90.9375 73.5 90.9375C81.4953 90.9375 88 97.4562 88 105.469ZM60.6784 31.5772L63.1434 80.9834C63.2592 83.3035 65.1699 85.125 67.4879 85.125H79.5121C81.8301 85.125 83.7408 83.3035 83.8566 80.9834L86.3216 31.5772C86.4458 29.0871 84.4649 27 81.9771 27H65.0229C62.5351 27 60.5542 29.0871 60.6784 31.5772Z" fill="#F56565" />
              <circle cx="73.5" cy="73.5" r="70.5" stroke="#F56565" stroke-width="6" />
            </svg>
            <h1 class="mt-4 text-lg italic text-red-500  text-center">The values are the same!</h1>
            <div @click="$emit('closing-modal')" class="w-3/5 mx-auto mt-4 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none focus:bg-lunchPink-700 hover:bg-lunchPink-700">EXIT</div>
          </div>
        </div>
        <div v-else-if="budgetEdited" class="flex items-center w-full h-full">
          <div class="w-full">
            <svg class="mx-auto" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M59.9216 103.763L32.4014 76.3057C30.748 74.6561 30.748 71.9815 32.4014 70.3318L38.3889 64.3579C40.0422 62.7082 42.7231 62.7082 44.3765 64.3579L62.9154 82.8541L102.624 43.2372C104.277 41.5876 106.958 41.5876 108.611 43.2372L114.599 49.2111C116.252 50.8606 116.252 53.5352 114.599 55.1849L65.9092 103.763C64.2557 105.412 61.5749 105.412 59.9216 103.763Z" fill="#68D391" />
              <circle cx="73.5" cy="73.5" r="70.5" stroke="#68D391" stroke-width="6" />
            </svg>
            <h1 class="mt-4 text-lg italic text-green-500  text-center">Successfully edited!</h1>
            <div @click="$emit('closing-modal')" class="no-highlight-color cursor-pointer w-3/5 mx-auto mt-4 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none">EXIT</div>
          </div>
        </div>
        <div v-else>
          <h2 class="mt-2 ml-4 text-lunchPink-600 text-2xl italic font-black uppercase">EDIT BUDGET</h2>
          <div class="relative w-3/5 mx-auto mt-10 h-full ">
            <input v-model="newLimit"
                   :class="[errorLimit ? 'border-red-400' : 'border-lunchPink-600','relative pl-12 pr-2 h-12 w-full block bg-transparent text-white placeholder-white font-bold text-2xl border-b-2 placeholder-gray-700 focus:outline-none focus:border-white']" 
                   type="number" name="number" placeholder="Limit" required
            >
            <span v-if="hasError && errorLimit" class="text-red-400 text-xs bottom-2 left-0 absolute mt-2">{{ errorLimit.message }}</span>            
            <span class="text-lg font-bold text-lunchPink-600 absolute top-0 left-0 mt-3 mr-2">{{ this.$store.state.currentCurrency }}</span>
          </div>
          <div @click="editBudget" class="no-highlight-color cursor-pointer w-5/6 mx-auto mt-16 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none">SAVE CHANGE</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from './../eventBus.js'
export default {
  props: {
    limit: String,
    budgetId: String,
  },
  data() {
    return {
      newLimit: this.limit,
      oldLimit: this.limit,
      budgetEdited: false,
      sameBudget: false,
      hasError: false,
      errorArray: [],
      errorLimit: null
    }
  },
  methods: {
    editBudget() {
      if (this.newLimit !== this.oldLimit) {
        this.$axios.put(`/budget/edit/${this.budgetId}`, {
          limit: this.newLimit
        })
          .then(res => {
            if (res.status === 202) {
              this.emitGlobalCreationEvent()
              this.budgetEdited = true
            }
          })
          .catch(err => {
            console.log(err)
            this.errorArray = err.response.data
            this.errorLimit = this.hadError('limit')
            this.hasError = true
          })
      } else {
        this.sameBudget = true
      }

    },
    emitGlobalCreationEvent() {
      EventBus.$emit('budget-edited')
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