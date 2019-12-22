<template>
  <div class="w-full h-full main-budget">
    <div class="flex justify-end w-5/6 pt-4 mx-auto header">
      <div class="relative focus:outline-none">
        <router-link to="/dashboard"
                     :class="['cursor-pointer no-highlight-color bg-lunchPink-600 flex items-center block py-1 px-5 rounded-full text-lunchPurple-700 text-center font-black focus:outline-none']"
        >
          <svg class="mr-2" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.223448 4.91581L4.54156 0.242268C4.84002 -0.080756 5.32263 -0.080756 5.61791 0.242268L6.33548 1.0189C6.63394 1.34192 6.63394 1.86426 6.33548 2.18385L3.27788 5.5L6.33866 8.81271C6.63712 9.13574 6.63712 9.65807 6.33866 9.97766L5.62109 10.7577C5.32263 11.0808 4.84002 11.0808 4.54474 10.7577L0.226623 6.08419C-0.0750098 5.76117 -0.0750097 5.23883 0.223448 4.91581Z" fill="#12012F" />
          </svg>
          Dashboard
        </router-link>
      </div>
    </div>
    <div v-if="validParams" class="w-5/6 mx-auto mt-4 dashboard" style="height:88%;">
      <div class="' border border-lunchPink-600 bg-lunchPurple-800 rounded-lunch h-32 w-full'">
        <div class="flex items-center justify-between">
          <h2 class="mt-2 ml-4 text-xl italic font-black text-lunchPink-600">BUDGET</h2>
          <h2 class="mt-2 mr-4 text-lg italic font-bold text-white uppercase">{{ month }}</h2>
        </div>
        <div class="flex items-center justify-center mx-4 mt-2 text-xl italic font-bold text-white bg-lunchPurple-500 rounded-expenses h-13">
          <svg class="inline-block w-4 h-auto mr-2" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1146 0L12 3.4375H9.89375L8.45208 0H10.1146ZM7.44792 0L8.88958 3.4375H3.11042L4.55208 0H7.44792ZM1.88542 0H3.54792L2.10625 3.4375H0L1.88542 0ZM0 4.125H2.09792L4.66042 9.53262C4.69167 9.59922 4.60417 9.65938 4.55625 9.60352L0 4.125ZM3.0875 4.125H8.9125L6.05833 10.9613C6.0375 11.0129 5.96458 11.0129 5.94375 10.9613L3.0875 4.125ZM7.33958 9.53262L9.90208 4.125H12L7.44375 9.60137C7.39583 9.65938 7.30833 9.59922 7.33958 9.53262Z" fill="#E2E8F0" />
          </svg>
          <span>{{ parseFloat(currentBalance).toFixed(2) }}</span>
          <span class="text-2xl italic font-bold text-lunchPurple-100">/</span>
          <span class="text-lunchPink-600">{{ parseFloat(limit).toFixed(2) }}</span>
          <span class="mt-1 ml-1 text-base not-italic">{{ this.$store.state.currentCurrency }}</span>
        </div>
      </div>
      <div class="flex items-center justify-center mt-4 ">
        <div class="relative flex items-center w-1/3 mr-2">
          <div @click="editBudget = !editBudget"
               :class="['cursor-pointer no-highlight-color bg-lunchPink-600 w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']"
          >
            <i class="mr-1 text-xs fas fa-edit text-lunchPurple-700"></i>EDIT</div>
        </div>
        <div v-if="isCurrentBudget" class="relative flex items-center w-1/3 mr-2">
          <div @click="archiveBudget = !archiveBudget" 
               :class="['cursor-pointer no-highlight-color bg-lunchPink-600 w-full inline-block  py-2 rounded-full text-lunchPurple-700 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']"
          >
            <i class="mr-1 text-xs fas fa-archive text-lunchPurple-700"></i>ARCHIVE</div>
        </div>
        <div class="relative flex items-center w-1/3">
          <div @click="deleteBudget = !deleteBudget"  
               :class="['cursor-pointer no-highlight-color bg-lunchPurple-900 w-full inline-block  py-2 rounded-full text-lunchPink-600 text-center font-black uppercase text-xs focus:outline-none focus:bg-lunchPink-700']"
          >
            <i class="mr-1 text-xs fas fa-trash-alt text-lunchPink-600"></i>DELETE</div>
        </div>

      </div>
      <!-- EXPENSES SHOW -->
      <div class="mt-4 border expenseTab border-lunchPink-600 rounded-lunch" style="height:calc(100% - 194px);">
        <h2 class="mx-auto mt-5 mb-2 text-base italic font-black w-17/20 text-lunchPink-600">EXPENSES IN THIS BUDGET</h2>
        <div v-if="expenses.length > 0" class="overflow-y-scroll w-ful" style="height:calc(100% - 80px);">
          <div v-for="(expense, index) in expenses.slice().reverse()" :key="`expense-${index}`"
               v-touch:swipe.left="swipe(index)"
               v-touch:swipe.right="swipe(index)"
               :id="index"
               class="flex items-center mx-4 mb-2 bg-lunchPurple-500 rounded-expenses h-13"
          >
            <svg class="ml-4" width="18" height="18" viewBox="0 0 19 15" xmlns="http://www.w3.org/2000/svg">
              <path v-if="expense.type === 'Other'" d="M14.7826 6.61936L8.49238 0.411885C8.22514 0.148161 7.86269 1.95022e-06 7.48476 0H1.425C0.637985 0 0 0.62959 0 1.40625V7.38627C1.97623e-06 7.75923 0.150137 8.11691 0.417377 8.38063L6.70763 14.5881C7.26409 15.1373 8.16635 15.1373 8.72287 14.5881L14.7826 8.60809C15.3391 8.05892 15.3391 7.16853 14.7826 6.61936ZM3.325 4.6875C2.53799 4.6875 1.9 4.05791 1.9 3.28125C1.9 2.50459 2.53799 1.875 3.325 1.875C4.11202 1.875 4.75 2.50459 4.75 3.28125C4.75 4.05791 4.11202 4.6875 3.325 4.6875ZM18.5826 8.60809L12.5229 14.5881C11.9664 15.1373 11.0641 15.1373 10.5076 14.5881L10.4969 14.5776L15.6643 9.47818C16.169 8.98016 16.4469 8.31802 16.4469 7.61373C16.4469 6.90943 16.1689 6.24729 15.6643 5.74928L9.83835 0H11.2848C11.6627 1.95022e-06 12.0251 0.148161 12.2924 0.411885L18.5826 6.61936C19.1391 7.16853 19.1391 8.05892 18.5826 8.60809Z" fill="#F71140" />
              <path v-if="expense.type === 'Food'" d="M11.7475 4.2832C12.617 4.43826 13.3302 4.90311 13.8876 5.67773C14.3781 6.36404 14.7126 7.22732 14.8907 8.26758C15.0471 9.21951 15.0354 10.1711 14.8573 11.123C14.5897 12.6946 14.0547 14.0117 13.2521 15.0742C12.2932 16.3582 11.0896 17 9.64048 17C9.28357 17 8.89384 16.8894 8.46996 16.668C8.18001 16.491 7.85691 16.4023 7.5 16.4023C7.14309 16.4023 6.82032 16.491 6.53004 16.668C6.10616 16.8894 5.71643 17 5.35952 17C3.91043 17 2.70677 16.3582 1.74785 15.0742C0.945299 14.0117 0.410262 12.6946 0.142744 11.123C-0.0353783 10.1711 -0.0470969 9.21951 0.109262 8.26758C0.287385 7.22732 0.621866 6.36404 1.11237 5.67773C1.66984 4.90311 2.383 4.43826 3.25252 4.2832C3.78756 4.19455 4.52315 4.27225 5.45963 4.51562C6.26218 4.73709 6.9422 5.00271 7.49967 5.3125C8.05713 5.00271 8.73715 4.73709 9.5397 4.51562C10.4765 4.27225 11.2124 4.19455 11.7475 4.2832ZM9.908 2.92188C9.59595 3.20975 9.18312 3.41992 8.67052 3.55273C8.3136 3.6633 7.92388 3.71875 7.5 3.71875L6.99844 3.68555C6.95391 3.37576 6.95391 3.02148 6.99844 2.62305C7.08784 1.82617 7.34398 1.21756 7.76752 0.796875C8.07957 0.509004 8.4924 0.298828 9.005 0.166016C9.36191 0.0554492 9.75164 0 10.1755 0L10.6771 0.0332031L10.7106 0.53125C10.7106 0.951934 10.6546 1.33908 10.5435 1.69336C10.4099 2.20236 10.1983 2.61209 9.908 2.92188Z" fill="#F71140" />        
              <path v-if="expense.type === 'Fast Food'" d="M15.4062 8.5H1.59375C1.17106 8.5 0.765685 8.66791 0.466799 8.9668C0.167912 9.26568 0 9.67106 0 10.0938C0 10.5164 0.167912 10.9218 0.466799 11.2207C0.765685 11.5196 1.17106 11.6875 1.59375 11.6875H15.4062C15.8289 11.6875 16.2343 11.5196 16.5332 11.2207C16.8321 10.9218 17 10.5164 17 10.0938C17 9.67106 16.8321 9.26568 16.5332 8.9668C16.2343 8.66791 15.8289 8.5 15.4062 8.5V8.5ZM15.9375 12.75H1.0625C0.921604 12.75 0.786478 12.806 0.686849 12.9056C0.587221 13.0052 0.53125 13.1404 0.53125 13.2812V13.8125C0.53125 14.3761 0.755133 14.9166 1.15365 15.3151C1.55216 15.7136 2.09266 15.9375 2.65625 15.9375H14.3438C14.9073 15.9375 15.4478 15.7136 15.8464 15.3151C16.2449 14.9166 16.4688 14.3761 16.4688 13.8125V13.2812C16.4688 13.1404 16.4128 13.0052 16.3132 12.9056C16.2135 12.806 16.0784 12.75 15.9375 12.75ZM1.94703 7.4375H15.053C16.2008 7.4375 16.8665 5.97988 16.2091 4.91805C14.875 2.7625 11.9382 1.06582 8.5 1.0625C5.06215 1.06582 2.125 2.7625 0.790898 4.91771C0.132812 5.97955 0.799199 7.4375 1.94703 7.4375ZM12.75 3.71875C12.8551 3.71875 12.9578 3.74991 13.0451 3.80828C13.1325 3.86666 13.2006 3.94963 13.2408 4.0467C13.281 4.14377 13.2915 4.25059 13.271 4.35364C13.2505 4.45669 13.1999 4.55135 13.1257 4.62565C13.0514 4.69995 12.9567 4.75054 12.8536 4.77104C12.7506 4.79154 12.6438 4.78102 12.5467 4.74081C12.4496 4.7006 12.3667 4.63251 12.3083 4.54515C12.2499 4.45778 12.2188 4.35507 12.2188 4.25C12.2188 4.1091 12.2747 3.97398 12.3743 3.87435C12.474 3.77472 12.6091 3.71875 12.75 3.71875V3.71875ZM8.5 2.65625C8.60507 2.65625 8.70778 2.68741 8.79515 2.74578C8.88251 2.80416 8.9506 2.88713 8.99081 2.9842C9.03102 3.08127 9.04154 3.18809 9.02104 3.29114C9.00054 3.39419 8.94995 3.48885 8.87565 3.56315C8.80135 3.63745 8.70669 3.68804 8.60364 3.70854C8.50059 3.72904 8.39377 3.71852 8.2967 3.67831C8.19963 3.6381 8.11666 3.57001 8.05828 3.48265C7.99991 3.39528 7.96875 3.29257 7.96875 3.1875C7.96875 3.0466 8.02472 2.91148 8.12435 2.81185C8.22398 2.71222 8.3591 2.65625 8.5 2.65625V2.65625ZM4.25 3.71875C4.35507 3.71875 4.45778 3.74991 4.54515 3.80828C4.63251 3.86666 4.7006 3.94963 4.74081 4.0467C4.78102 4.14377 4.79154 4.25059 4.77104 4.35364C4.75054 4.45669 4.69995 4.55135 4.62565 4.62565C4.55135 4.69995 4.45669 4.75054 4.35364 4.77104C4.25059 4.79154 4.14377 4.78102 4.0467 4.74081C3.94963 4.7006 3.86666 4.63251 3.80828 4.54515C3.74991 4.45778 3.71875 4.35507 3.71875 4.25C3.71875 4.1091 3.77472 3.97398 3.87435 3.87435C3.97398 3.77472 4.1091 3.71875 4.25 3.71875V3.71875Z" fill="#F71140" />
              <path v-if="expense.type === 'Restaurant'" d="M6.99663 0.504734C7.02356 0.660788 7.53846 3.64242 7.53846 4.78128C7.53846 6.5178 6.60289 7.75628 5.21971 8.25432L5.65385 16.16C5.6774 16.6148 5.31058 17 4.84615 17H2.69231C2.23125 17 1.86106 16.6182 1.88462 16.16L2.31875 8.25432C0.932212 7.75628 0 6.51448 0 4.78128C0 3.6391 0.514904 0.660788 0.541827 0.504734C0.649519 -0.169288 2.06635 -0.179249 2.15385 0.541257V5.22953C2.1976 5.34242 2.66202 5.33578 2.69231 5.22953C2.73942 4.38949 2.95817 0.607663 2.96154 0.521335C3.0726 -0.169288 4.46587 -0.169288 4.57356 0.521335C4.58029 0.610983 4.79567 4.38949 4.84279 5.22953C4.87308 5.33578 5.34087 5.34242 5.38125 5.22953V0.541257C5.46875 -0.175929 6.88894 -0.169288 6.99663 0.504734V0.504734ZM11.0082 9.99084L10.5034 16.1367C10.463 16.6016 10.8365 17 11.3077 17H13.1923C13.6399 17 14 16.6447 14 16.2031V0.79692C14 0.35864 13.6399 4.74401e-05 13.1923 4.74401e-05C10.4159 4.74401e-05 5.74135 5.92679 11.0082 9.99084Z" fill="#F71140" />        
              <path v-if="expense.type === 'Soft Drink'" d="M5.69995 11.25H11.4C12.9734 11.25 14.25 9.99023 14.25 8.4375H15.2C17.2959 8.4375 19 6.75586 19 4.6875C19 2.61914 17.2959 0.9375 15.2 0.9375H3.56245C3.16761 0.9375 2.84995 1.25098 2.84995 1.64062V8.4375C2.84995 9.99023 4.12651 11.25 5.69995 11.25ZM15.2 2.8125C16.2479 2.8125 17.1 3.65332 17.1 4.6875C17.1 5.72168 16.2479 6.5625 15.2 6.5625H14.25V2.8125H15.2ZM16.616 14.0625H1.43386C0.0207323 14.0625 -0.37708 12.1875 0.365107 12.1875H17.6818C18.424 12.1875 18.0321 14.0625 16.616 14.0625Z" fill="#F71140" />        
              <path v-if="expense.type === 'Alcohol'" d="M13.1429 2.375H11.4286V0.96875C11.4286 0.502754 11.0448 0.125 10.5714 0.125H0.857143C0.38375 0.125 0 0.502754 0 0.96875V15.0312C0 15.4972 0.38375 15.875 0.857143 15.875H10.5714C11.0448 15.875 11.4286 15.4972 11.4286 15.0312V13.5508L14.3074 12.286C15.3356 11.8342 16 10.8261 16 9.71773V5.1875C16 3.63669 14.7183 2.375 13.1429 2.375ZM13.7143 9.71773C13.7142 9.82638 13.6822 9.93268 13.6221 10.0238C13.5621 10.115 13.4765 10.1871 13.3758 10.2314L11.4286 11.0869V4.625H13.1429C13.4579 4.625 13.7143 4.87735 13.7143 5.1875V9.71773ZM7.42857 12.5C7.113 12.5 6.85714 12.2481 6.85714 11.9375V4.0625C6.85714 3.75186 7.113 3.5 7.42857 3.5C7.74414 3.5 8 3.75186 8 4.0625V11.9375C8 12.2481 7.74414 12.5 7.42857 12.5ZM4 12.5C3.68443 12.5 3.42857 12.2481 3.42857 11.9375V4.0625C3.42857 3.75186 3.68443 3.5 4 3.5C4.31557 3.5 4.57143 3.75186 4.57143 4.0625V11.9375C4.57143 12.2481 4.31557 12.5 4 12.5Z" fill="#F71140" />        
              <path v-if="expense.type === 'Shopping'" d="M16.5037 9.34698L17.981 2.89478C18.0877 2.42891 17.731 1.98529 17.2497 1.98529H4.97525L4.68881 0.595278C4.61744 0.248813 4.31031 0 3.95403 0H0.75C0.335781 0 0 0.333312 0 0.744485V1.24081C0 1.65198 0.335781 1.98529 0.75 1.98529H2.93384L5.12909 12.6387C4.60391 12.9385 4.25 13.5007 4.25 14.1452C4.25 15.1046 5.0335 15.8824 6 15.8824C6.9665 15.8824 7.75 15.1046 7.75 14.1452C7.75 13.659 7.54853 13.2197 7.22425 12.9044H13.7757C13.4515 13.2197 13.25 13.659 13.25 14.1452C13.25 15.1046 14.0335 15.8824 15 15.8824C15.9665 15.8824 16.75 15.1046 16.75 14.1452C16.75 13.4574 16.3472 12.8631 15.7632 12.5816L15.9356 11.8286C16.0422 11.3627 15.6855 10.9191 15.2042 10.9191H6.81616L6.61163 9.92647H15.7724C16.1226 9.92647 16.4262 9.68594 16.5037 9.34698Z" fill="#F71140" />          
              <path v-if="expense.type === 'Travel'" d="M14 3V11C14 12.6192 12.0742 14 9.93681 14L11.9049 15.5538C12.0908 15.7005 11.9863 16 11.75 16H2.25C2.01319 16 1.90962 15.7002 2.09509 15.5538L4.06319 14C1.93187 14 0 12.6236 0 11V3C0 1.34316 2 0 4 0H10C12.0312 0 14 1.34316 14 3ZM6.25 7.25V3.75C6.25 3.33578 5.91422 3 5.5 3H2.25C1.83578 3 1.5 3.33578 1.5 3.75V7.25C1.5 7.66422 1.83578 8 2.25 8H5.5C5.91422 8 6.25 7.66422 6.25 7.25ZM12.5 7.25V3.75C12.5 3.33578 12.1642 3 11.75 3H8.5C8.08578 3 7.75 3.33578 7.75 3.75V7.25C7.75 7.66422 8.08578 8 8.5 8H11.75C12.1642 8 12.5 7.66422 12.5 7.25ZM11 9C10.1716 9 9.5 9.67156 9.5 10.5C9.5 11.3284 10.1716 12 11 12C11.8284 12 12.5 11.3284 12.5 10.5C12.5 9.67156 11.8284 9 11 9ZM3 9C2.17156 9 1.5 9.67156 1.5 10.5C1.5 11.3284 2.17156 12 3 12C3.82844 12 4.5 11.3284 4.5 10.5C4.5 9.67156 3.82844 9 3 9Z" fill="#F71140" />        
            </svg>
            <div class="w-3/4 ml-2">
              <div class="flex justify-between">
                <h4 class="text-sm font-bold text-white"><span class="overflow-x-hidden text-base font-bold text-lunchPink-600">-{{ parseFloat(expense.price).toFixed(2) }}</span> {{ $store.state.currentCurrency }}</h4>
                <span class="text-xs italic font-bold text-lunchPink-600">{{ formatDate(expense.created_at) }}</span>
              </div>
              <p v-if="expense.description === null" class="-mt-1 text-xs text-lunchPurple-100">No description</p>
              <p v-else class="-mt-1 text-xs text-lunchPurple-100">{{ truncateDesc(expense.description, 25) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center mx-auto w-17/20 rounded-lunch bg-lunchPurple-500" style="height:calc(100% - 80px);">
          <svg width="70" height="46" viewBox="0 0 70 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.0202 21.5515L56.1762 2.56043C55.6435 1.77282 54.9217 1.12703 54.075 0.680376C53.2283 0.233721 52.2828 1.49722e-05 51.3225 0H18.6775C17.7172 3.03184e-06 16.7717 0.233705 15.925 0.680362C15.0783 1.12702 14.3566 1.77281 13.8239 2.56043L0.979757 21.5515C0.340895 22.496 -1.40647e-05 23.6058 4.35203e-10 24.7409L4.35204e-10 40.25C4.35204e-10 43.4257 2.61163 46 5.83333 46H64.1667C67.3884 46 70 43.4257 70 40.25V24.7409C70 23.6058 69.6591 22.496 69.0202 21.5515ZM19.7181 7.66667H50.282L60.6523 23H45.6944L41.8056 30.6667H28.1944L24.3056 23H9.34767L19.7181 7.66667Z" fill="#F71140" />
          </svg>
          <h3 class="mt-4 text-xs italic text-lunchPurple-100">NO EXPENSES</h3>
        </div>
      </div>
      <modal-edit-budget v-if="editBudget" @closing-modal="editBudget = false" :limit="limit" :budget-id="budgetID"></modal-edit-budget>
      <modal-archive-budget v-if="archiveBudget" @closing-modal="archiveBudget = false" :budget-id="budgetID"></modal-archive-budget>
      <modal-delete-budget v-if="deleteBudget" @closing-modal="deleteBudget = false" :budget-id="budgetID"></modal-delete-budget>
      <modal-delete-expense v-if="deleteExpense" @closing-modal="deleteExpense = false" :expense-id="expenses.slice().reverse()[selectedExpense]._id"></modal-delete-expense>
      <modal-edit-expense v-if="editExpense" @closing-modal="editExpense = false" :expense="expenses.slice().reverse()[selectedExpense]"></modal-edit-expense>

    </div>
    <div v-else-if="validParams = false" class="w-full text-center">
      <h1 class="mt-10 text-xl font-black text-white">ACCES DENIED</h1>
    </div>
  </div></template>

<script>
import ModalEditBudget from '../components/ModalEditBudget.vue'
import ModalArchiveBudget from '../components/ModalArchiveBudget.vue'
import ModalDeleteBudget from '../components/ModalDeleteBudget.vue'
import ModalDeleteExpense from '../components/ModalDeleteExpense.vue'
import ModalEditExpense from '../components/ModalEditExpense.vue'

import { EventBus } from './../eventBus.js'

export default {
  components: {
    ModalEditBudget,
    ModalArchiveBudget,
    ModalDeleteBudget,
    ModalDeleteExpense,
    ModalEditExpense
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
      deleteExpense: false,
      editExpense: false
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
    EventBus.$on('expense-edited', () => {
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
            this.editExpense = true
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