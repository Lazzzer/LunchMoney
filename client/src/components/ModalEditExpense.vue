<template>
  <div>
    <div class="modal-new-budget w-screen h-screen absolute top-0 left-0 flex items-center justify-center ">    
      <div @click="$emit('closing-modal')" class="absolute w-screen h-screen top-0 left-0q  " style="background-color:rgba(0, 0, 0, 0.8);">
      </div>
      <div class="w-5/6 bg-lunchPurple-800 rounded-lunch border border-lunchPink-600 z-10" style="height: 400px;max-width:600px;">
        <div v-if="expenseEdited" class="flex items-center w-full h-full">
          <div class="w-full">
            <svg class="mx-auto" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M59.9216 103.763L32.4014 76.3057C30.748 74.6561 30.748 71.9815 32.4014 70.3318L38.3889 64.3579C40.0422 62.7082 42.7231 62.7082 44.3765 64.3579L62.9154 82.8541L102.624 43.2372C104.277 41.5876 106.958 41.5876 108.611 43.2372L114.599 49.2111C116.252 50.8606 116.252 53.5352 114.599 55.1849L65.9092 103.763C64.2557 105.412 61.5749 105.412 59.9216 103.763Z" fill="#68D391" />
              <circle cx="73.5" cy="73.5" r="70.5" stroke="#68D391" stroke-width="6" />
            </svg>
            <h1 class="mt-4 text-lg italic text-green-500  text-center">Successfully edited!</h1>
            <div @click="$emit('closing-modal')" class="w-3/5 mx-auto mt-4 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none focus:bg-lunchPink-700 hover:bg-lunchPink-700">EXIT</div>
          </div>
        </div>
        <div v-if="!expenseEdited">
          <h2 class="mt-2 ml-4 text-lunchPink-600 text-2xl italic font-black uppercase">EDIT EXPENSE</h2>
          <div class="relative w-2/5 mx-auto mt-4">
            <input v-model="price" 
                   :class="['relative pl-12 pr-2 h-12 w-full block bg-transparent text-white placeholder-white font-bold text-2xl border-b-2 placeholder-gray-700 focus:outline-none focus:border-white']" 
                   type="number" name="number" placeholder="Price"
            >
            <span class="text-lg font-bold text-lunchPink-600 absolute top-0 left-0 mt-3 mr-2">{{ this.$store.state.currentCurrency }}</span>
          </div>
          <div class="relative w-2/5 mx-auto mt-2">
            <select v-model="type" id="type"
                    :class="['mt-4 appearance-none relative px-8 h-10 w-full block bg-transparent text-xl text-white placeholder-white font-bold border-b-2  focus:outline-none focus:border-white']"
            >
              <option hidden disabled>TYPE</option>
              <option class="text-gray-700">Food</option>
              <option class="text-gray-700">Other</option>
            </select>
            <i class="fas fa-tags text-lg text-lunchPink-600 absolute -mt-8 ml-1"></i>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-lunchPink-600">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
          <textarea v-model="description" class="form-textarea mt-6 mt-1 block w-3/4 mx-auto bg-transparent border border-lunchPink-600 placeholder-lunchPurple-200 text-white focus:outline-none focus:border-white focus:shadow-none" rows="3" placeholder="Description of the expense"></textarea>
          <div @click="editExpense" class="w-3/5 mx-auto mt-8 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none focus:bg-lunchPink-700 hover:bg-lunchPink-700">SAVE CHANGE</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from './../eventBus.js'
export default {
  props: {
    expense: Object,
  },
  data() {
    return {
      noBudget: false,
      expenseEdited: false,
      price: this.expense.price,
      type: this.expense.type,
      description: this.expense.description
    }
  },
  methods: {
    editExpense() {
      this.$axios.put(`/expense/edit/${this.expense._id}`, {
        price: this.price,
        type: this.type,
        description: this.description
      })
        .then(res => {
          if (res.status === 202) {
            this.emitGlobalCreationEvent()
            this.expenseEdited = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    emitGlobalCreationEvent() {
      EventBus.$emit('expense-edited')
    }
  },
}
</script>