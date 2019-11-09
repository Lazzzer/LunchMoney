<template>
  <div>
    <div class="modal-new-budget w-screen h-screen absolute top-0 left-0 flex items-center justify-center">    
      <div @click="$emit('closing-modal')" class="absolute w-screen h-screen top-0 left-0q  " style="background-color:rgba(0, 0, 0, 0.8);">
      </div>
      <div class="w-5/6 bg-lunchPurple-800 rounded-lunch border border-lunchPink-600 z-10 h-48" style="max-width:600px;">
        <h2 class="mt-2 ml-4 text-lunchPink-600 text-2xl italic font-black uppercase">DELETE USER</h2>
        <h3 class="mt-2 text-sm italic text-lunchPink-600  text-center">Are you sure ? <br> Everything will be deleted.</h3>
        <div class="flex">
          <div @click="deleteUser" class="no-highlight-color cursor-pointer w-1/2 ml-4 mr-2  mt-4 block py-3 px-3 rounded-full bg-lunchPurple-900 text-lunchPink-600 text-center font-black uppercase text-lg focus:outline-none">YES</div>
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
  methods: {
    deleteUser() {
      this.$axios.delete('/user')
        .then(res => {
          if (res.status === 202) {
            this.emitGlobalCreationEvent()
            this.$emit('closing-modal')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    emitGlobalCreationEvent() {
      EventBus.$emit('user-deleted')
    }
  },
}
</script>