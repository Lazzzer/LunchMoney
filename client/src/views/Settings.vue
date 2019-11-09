<template>
  <div class="android main-settings w-full h-full">
    <div v-if="deletedPage === false" class="header flex justify-end pt-4 w-5/6 mx-auto">
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
    <div v-if="validParams && deletedPage === false" class="android dashboard w-5/6 mx-auto mt-6" style="height:85%;">
      <div class="' border border-lunchPink-600 bg-lunchPurple-800 rounded-lunch h-full w-full'">
        <h2 class="mt-4 ml-4 text-lunchPink-600 text-xl italic font-black">USER SETTINGS</h2>

        <div class="wrapper flex flex-col justify-between w-full" style="height:88%;">

          <div class="infos-section mx-4 mt-3 bg-lunchPurple-500  rounded-expenses h-32 justify-center flex flex-col">
            <h3 class="text-lunchPink-600 font-black italic text-base ml-4">USERNAME</h3>
            <p class="ml-4 text-lunchPurple-200 -mt-1">{{ name }}</p>
            <h3 class="text-lunchPink-600 font-black italic text-base ml-4 mt-1">EMAIL</h3>
            <p class="ml-4 text-lunchPurple-200 -mt-1">{{ email === null ? 'Email not provided' : email }}</p>
          </div>

          <div class="inputs-section" style="height:170px;">
            <h3 class="ml-4 text-lunchPink-600 text-base italic font-black">CURRENT CURRENCY</h3>
            <div class="relative w-1/3 ml-4">
              <select v-model="newCurrency" id="currency" 
                      :class="[ errorCurrency ? 'border-red-400' : 'border-lunchPink-600' , 'mt-2 appearance-none relative px-8 h-10 w-full block bg-transparent text-white placeholder-white font-bold border-b-2  focus:outline-none focus:border-white']"
              >
                <option hidden disabled>CURRENCY</option>
                <option class="text-gray-700">CHF</option>
                <option class="text-gray-700">EUR</option>
                <option class="text-gray-700">USD</option>
              </select>
              <i class="fas fa-dollar-sign text-xl text-lunchPink-600 absolute -mt-8 ml-1"></i>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-lunchPink-600">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
              <span v-if="hasError && errorCurrency" style="width:250px;" class="text-red-400 text-xs absolute">Please pick a valid option.</span>
            </div>
            <div class="flex mt-4 mx-4 items-center justify-between">
              <h3 class=" text-lunchPink-600 text-base italic font-black">DEFAULT BUDGET</h3>
              <label for="toogleOn" class="flex items-center cursor-pointer inline no-highlight-color">
                <div class="relative">
                  <input v-model="computedDefaultBudget" id="toogleOn" type="checkbox" class="hidden" />
                  <div class="w-16 h-8 bg-lunchPurple-900 rounded-full shadow-inner flex items-center">
                    <span class="text-xs text-green-400 font-bold ml-2">ON<span class="text-red-400 ml-2">OFF</span></span>
                  </div>
                  <div class="toggleDot absolute w-8 h-8 bg-red-400 rounded-full shadow inset-y-0 left-0"></div>
                </div>
              </label>
            </div>
            <div v-if="newDefaultBudget">
              <div class="relative w-2/5 ml-4">
                <input v-model="newDefaultValue"
                       :class="[errorDefaultValue ? 'border-red-400' : 'border-lunchPink-600', 'relative pl-12 pr-2 h-12 w-full block bg-transparent text-white placeholder-white font-bold text-lg border-b-2 placeholder-gray-700 focus:outline-none focus:border-white']" 
                       type="number" name="number" placeholder="Limit"
                >
                <span v-if="hasError && errorDefaultValue" style="width:250px;" class="text-red-400 text-xs bottom-2 left-0 absolute mt-1">{{ errorDefaultValue.message }}</span>
                <span class="text-lg font-bold text-lunchPink-600 absolute top-0 left-0 mt-3 mr-2">{{ newCurrency }}</span>
              </div>
            </div>
          </div>
          <div class="buttons-section mt-6">
            <div v-if="userEdited === false" @click="userEdited === false ? editUser() : null" :class="[newCurrency !== currency || newDefaultBudget !== defaultBudget || newDefaultValue !== defaultValue ? 'bg-lunchPink-600' : 'bg-gray-500', 'cursor-pointer no-highlight-color flex justify-center w-17/20 mx-auto block py-3 px-3 rounded-full bg-lunchPink-600  text-center font-black uppercase text-lg focus:outline-none']">
              <svg class="w-5 h-auto fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58171 16 0 12.4183 0 8C0 3.58171 3.58171 0 8 0C12.4183 0 16 3.58171 16 8ZM7.07464 12.2359L13.0101 6.30045C13.2117 6.0989 13.2117 5.7721 13.0101 5.57055L12.2802 4.84064C12.0787 4.63906 11.7519 4.63906 11.5503 4.84064L6.70968 9.68123L4.44971 7.42126C4.24816 7.21971 3.92135 7.21971 3.71977 7.42126L2.98987 8.15116C2.78832 8.35271 2.78832 8.67952 2.98987 8.88106L6.34471 12.2359C6.54629 12.4375 6.87306 12.4375 7.07464 12.2359Z" fill="#0E0125" />
              </svg>
              <h2 class="ml-3 text-lunchPurple-700 text-base italic font-black uppercase">SAVE CHANGES</h2>
            </div>
            <div v-else :class="['bg-green-500 cursor-pointer no-highlight-color flex justify-center w-17/20 mx-auto block py-3 px-3 rounded-full bg-lunchPink-600  text-center font-black uppercase text-lg focus:outline-none']">
              <svg class="w-5 h-auto fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58171 16 0 12.4183 0 8C0 3.58171 3.58171 0 8 0C12.4183 0 16 3.58171 16 8ZM7.07464 12.2359L13.0101 6.30045C13.2117 6.0989 13.2117 5.7721 13.0101 5.57055L12.2802 4.84064C12.0787 4.63906 11.7519 4.63906 11.5503 4.84064L6.70968 9.68123L4.44971 7.42126C4.24816 7.21971 3.92135 7.21971 3.71977 7.42126L2.98987 8.15116C2.78832 8.35271 2.78832 8.67952 2.98987 8.88106L6.34471 12.2359C6.54629 12.4375 6.87306 12.4375 7.07464 12.2359Z" fill="#0E0125" />
              </svg>
              <h2 class="ml-3 text-lunchPurple-700 text-base italic font-black uppercase">USER EDITED</h2>
            </div>
            <div @click="deleteUser = !deleteUser" class="cursor-pointer no-highlight-color flex justify-center w-17/20 mx-auto mt-4 block py-3 px-3 rounded-full bg-lunchPurple-900 text-center font-black uppercase text-lg focus:outline-none">
              <svg class="w-4 h-auto" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3.17824V2.12273C0 1.62137 0.382143 1.21801 0.857143 1.21801H4.85714L5.19286 0.513085C5.33571 0.203972 5.63214 0.0117188 5.95714 0.0117188H10.0393C10.3643 0.0117188 10.6607 0.203972 10.8071 0.513085L11.1429 1.21801H15.1429C15.6179 1.21801 16 1.62137 16 2.12273V3.17824C16 3.42704 15.8071 3.6306 15.5714 3.6306H0.428571C0.192857 3.6306 0 3.42704 0 3.17824ZM14.8571 5.28925V17.503C14.8571 18.5019 14.0893 19.3124 13.1429 19.3124H2.85714C1.91071 19.3124 1.14286 18.5019 1.14286 17.503V5.28925C1.14286 5.04046 1.33571 4.83689 1.57143 4.83689H14.4286C14.6643 4.83689 14.8571 5.04046 14.8571 5.28925ZM5.14286 7.85263C5.14286 7.5209 4.88571 7.24948 4.57143 7.24948C4.25714 7.24948 4 7.5209 4 7.85263V16.2967C4 16.6284 4.25714 16.8998 4.57143 16.8998C4.88571 16.8998 5.14286 16.6284 5.14286 16.2967V7.85263ZM8.57143 7.85263C8.57143 7.5209 8.31429 7.24948 8 7.24948C7.68571 7.24948 7.42857 7.5209 7.42857 7.85263V16.2967C7.42857 16.6284 7.68571 16.8998 8 16.8998C8.31429 16.8998 8.57143 16.6284 8.57143 16.2967V7.85263ZM12 7.85263C12 7.5209 11.7429 7.24948 11.4286 7.24948C11.1143 7.24948 10.8571 7.5209 10.8571 7.85263V16.2967C10.8571 16.6284 11.1143 16.8998 11.4286 16.8998C11.7429 16.8998 12 16.6284 12 16.2967V7.85263Z" fill="#F71140" />
              </svg>
              <h2 class="ml-3 text-lunchPink-600 text-base italic font-black uppercase">DELETE ACCOUNT</h2>
            </div>
          </div>  
        </div>
      </div>
    </div>
    <div v-else-if="deletedPage" class="w-2/3 mx-auto h-full flex items-center">
      <div class="w-full">
        <svg class="mx-auto" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M59.9216 103.763L32.4014 76.3057C30.748 74.6561 30.748 71.9815 32.4014 70.3318L38.3889 64.3579C40.0422 62.7082 42.7231 62.7082 44.3765 64.3579L62.9154 82.8541L102.624 43.2372C104.277 41.5876 106.958 41.5876 108.611 43.2372L114.599 49.2111C116.252 50.8606 116.252 53.5352 114.599 55.1849L65.9092 103.763C64.2557 105.412 61.5749 105.412 59.9216 103.763Z" fill="#68D391" />
          <circle cx="73.5" cy="73.5" r="70.5" stroke="#68D391" stroke-width="6" />
        </svg>
        <h1 class="mt-4 text-lg italic text-green-500 mb-10 text-center">Successfully deleted!</h1>
        <router-link to="/" class="cursor-pointer no-highlight-color mt-8 block py-3 px-2 rounded-full text-lunchPurple-700 bg-lunchPink-600 text-center font-black uppercase text-lg focus:outline-none">HOMEPAGE</router-link>
      </div>
    </div>
    <modal-delete-user v-if="deleteUser" @closing-modal="deleteUser = false"></modal-delete-user>
  </div>
</template>



<script>
import ModalDeleteUser from '../components/ModalDeleteUser.vue'
import { EventBus } from './../eventBus.js'

export default {
  components: {
    ModalDeleteUser
  },
  data() {
    return {
      validParams: true,
      name: null,
      email: null,
      currency: null,
      newCurrency: null,
      defaultBudget: null,
      newDefaultBudget: null,
      defaultValue: null,
      newDefaultValue: null,
      deleteUser: false,
      deletedPage: false,
      userEdited: false,
      hasError: false,
      errorArray: [],
      errorDefaultValue: null,
      errorCurrency: null
    }
  },
  computed: {
    computedDefaultBudget: {
      get() {
        return this.newDefaultBudget
      },
      set(newValue) {
        !this.newDefaultBudget ? this.newDefaultValue = this.defaultValue : this.newDefaultValue = 1
        this.newDefaultBudget = newValue
      }
    }
  },
  beforeCreate() {
    this.$axios.get('/user')
      .then(res => {
        console.log(res)
        this.name = res.data[0]
        this.email = res.data[1]
        this.currency = res.data[2]
        this.newCurrency = this.currency
        this.defaultBudget = res.data[3]
        this.newDefaultBudget = this.defaultBudget
        this.defaultValue = res.data[4]
        this.newDefaultValue = this.defaultValue
      })
      .catch()
  },
  created() {
    EventBus.$on('user-deleted', () => {
      this.deletedPage = true
      console.log('erasing cookies...')
      this.$cookies.isKey('refresh-token') ? this.$cookies.remove('refresh-token') : null
      this.$cookies.isKey('token') ? this.$cookies.remove('token') : null
    })
  },
  methods: {
    editUser() {
      if (this.newCurrency !== this.currency || this.newDefaultBudget !== this.defaultBudget || this.newDefaultValue !== this.defaultValue) {
        this.newDefaultBudget === false ? this.newDefaultValue = 1 : null
        this.$axios.put('/user', {
          currency: this.newCurrency,
          defaultBudget: this.newDefaultBudget,
          defaultValue: this.newDefaultValue
        })
          .then(res => {
            if (res.status === 202) {
              console.log(res)
              this.hasError = false
              this.errorDefaultValue = false
              this.errorCurrency = false
              this.userEdited = true
              this.currency = this.newCurrency
              this.defaultBudget = this.newDefaultBudget
              this.defaultValue = this.newDefaultValue
              setTimeout(() => {
                this.userEdited = false
              }, 2000)
            }
          })
          .catch(err => {
            console.log(err)
            this.errorArray = err.response.data
            this.errorDefaultValue = this.hadError('defaultValue')
            this.errorCurrency = this.hadError('currency')
            this.hasError = true
          })
      }
    },
    hadError(field) {
      let value = this.errorArray.find(obj => {
        return obj.field === field
      })
      return value === undefined ? false : value
    }
  }
}
</script>