<template>
  <div>
    <div class="modal-new-budget w-screen h-screen absolute top-0 left-0 flex items-center justify-center ">    
      <div @click="$emit('closing-modal')" class="absolute w-screen h-screen top-0 left-0q  " style="background-color:rgba(0, 0, 0, 0.8);">
      </div>
      <div class="w-5/6 h-5/6 bg-lunchPurple-800 rounded-lunch border border-lunchPink-600 z-10">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
  },
}
</script>