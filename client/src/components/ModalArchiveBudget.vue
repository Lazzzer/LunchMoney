<template>
  <div>
    <div class="modal-new-budget w-screen h-screen absolute top-0 left-0 flex items-center justify-center">    
      <div @click="$emit('closing-modal')" class="absolute w-screen h-screen top-0 left-0" style="background-color:rgba(0, 0, 0, 0.8);">
      </div>
      <div class="w-5/6 bg-lunchPurple-800 rounded-lunch border border-lunchPink-600 z-10 h-48" style="max-width:600px;">
        <div v-if="budgetArchived" class="flex items-center w-full h-full">
          <div class="w-full">
            <svg class="mx-auto h-10 w-auto" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M59.9216 103.763L32.4014 76.3057C30.748 74.6561 30.748 71.9815 32.4014 70.3318L38.3889 64.3579C40.0422 62.7082 42.7231 62.7082 44.3765 64.3579L62.9154 82.8541L102.624 43.2372C104.277 41.5876 106.958 41.5876 108.611 43.2372L114.599 49.2111C116.252 50.8606 116.252 53.5352 114.599 55.1849L65.9092 103.763C64.2557 105.412 61.5749 105.412 59.9216 103.763Z" fill="#68D391" />
              <circle cx="73.5" cy="73.5" r="70.5" stroke="#68D391" stroke-width="6" />
            </svg>
            <h1 class="mt-4 text-lg italic text-green-500  text-center">Successfully archived!</h1>
            <div @click="$emit('closing-modal')" class="no-highlight-color cursor-pointer w-3/5 mx-auto mt-4 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none">EXIT</div>
          </div>
        </div>
        <div v-else>
          <h2 class="mt-2 ml-4 text-lunchPink-600 text-2xl italic font-black uppercase">ARCHIVE BUDGET</h2>
          <h3 class="mt-4 text-base italic text-lunchPink-600  text-center">Are you sure ?</h3>
          <div class="flex">
            <div @click="archiveBudget" class="no-highlight-color cursor-pointer w-1/2 ml-4 mr-2  mt-4 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none">YES</div>
            <div @click="$emit('closing-modal')" class="no-highlight-color cursor-pointer w-1/2 mr-4 ml-2 mt-4 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none">NO</div>        

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from './../eventBus.js'
export default {
  props: {
    budgetId: String,
  },
  data() {
    return {
      budgetArchived: false
    }
  },
  methods: {
    archiveBudget() {
      this.$axios.put(`/budget/archive/${this.budgetId}`)
        .then(res => {
          if (res.status === 202) {
            this.emitGlobalCreationEvent()
            this.budgetArchived = true
          }
        })
        .catch(err => {
          console.log(err)
        })

    },
    emitGlobalCreationEvent() {
      EventBus.$emit('budget-archived')
    }
  },
}
</script>