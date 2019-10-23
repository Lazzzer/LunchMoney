<template>
  <div class="main-register w-full h-full flex items-center justify-center relative">
    <router-link to="/" class="mx-auto absolute top-0 mt-8">
      <svg class="" width="104" height="41" viewBox="0 0 104 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.90405 23.6538H18.0608L19.4432 18.6077H11.2769L14.7073 5.99229H8.71685L3.90405 23.6538ZM29.2626 24.0071C32.1042 24.0071 34.6642 23.3511 36.3538 21.6858C37.6082 20.4495 38.5298 18.7338 39.1698 16.3874L42.0116 5.99229H35.9186L33.333 15.4791C32.949 16.8415 32.5906 17.5228 32.053 18.0526C31.5666 18.532 30.8754 18.7843 30.133 18.7843C28.5458 18.7843 27.6754 18.0274 27.6754 16.564C27.6754 16.1603 27.7522 15.6809 27.8802 15.1763L30.389 5.99229H24.2962L21.8898 14.7978C21.6339 15.7566 21.5058 16.7406 21.5058 17.6489C21.5058 21.6354 24.2194 24.0071 29.2626 24.0071ZM40.3952 23.6538H46.3344L48.7408 14.8735L52.9904 23.6538H58.3152L63.128 5.99229H57.1888L54.8848 14.4194L50.8144 5.99229H45.208L40.3952 23.6538ZM71.9692 24.0323C75.7836 24.0323 78.3948 22.4932 80.1868 20.172L76.0396 16.9424C75.0668 18.1283 73.9404 18.7843 72.558 18.7843C70.9708 18.7843 69.742 17.6994 69.742 15.7566C69.742 13.3344 71.4828 10.9123 74.1708 10.9123C75.5276 10.9123 76.5772 11.6188 76.9612 13.0569L82.3116 10.7609C81.5692 7.63229 78.83 5.61383 74.9644 5.61383C67.2332 5.61383 63.47 11.4674 63.47 16.2864C63.47 21.0298 66.9516 24.0323 71.9692 24.0323ZM81.686 23.6538H87.6764L89.3916 17.3209H94.87L93.1548 23.6538H99.1452L103.958 5.99229H97.9676L96.2524 12.2243H90.774L92.4892 5.99229H86.4988L81.686 23.6538Z" fill="#F71140" />
        <path d="M0.230469 39.0289H3.18727L5.52967 30.4378L7.68007 36.0391H7.75687L13.0177 30.3811L10.6753 39.0289H13.6705L17.2801 25.7827H13.8625L8.85127 31.384L6.91207 25.7827H3.84007L0.230469 39.0289ZM25.9232 39.256C27.1264 39.256 28.2208 39.0352 29.2064 38.5937C30.2048 38.1395 31.056 37.5466 31.76 36.8149C32.4768 36.0832 33.0272 35.2506 33.4112 34.317C33.808 33.3709 34.0064 32.4058 34.0064 31.4218C34.0064 30.5892 33.8592 29.8197 33.5648 29.1132C33.2704 28.3941 32.8544 27.7697 32.3168 27.2398C31.7792 26.71 31.1328 26.3 30.3776 26.0098C29.6224 25.707 28.784 25.5557 27.8624 25.5557C26.6592 25.5557 25.5584 25.7827 24.56 26.2369C23.5744 26.6784 22.7232 27.265 22.0064 27.9967C21.3024 28.7284 20.752 29.5674 20.3552 30.5135C19.9712 31.4471 19.7792 32.4058 19.7792 33.3898C19.7792 34.2224 19.9264 34.9983 20.2208 35.7174C20.5152 36.4238 20.9312 37.042 21.4688 37.5718C22.0064 38.1017 22.6528 38.518 23.408 38.8207C24.1632 39.1109 25.0016 39.256 25.9232 39.256ZM26.2688 36.5689C25.7184 36.5689 25.2256 36.4869 24.7904 36.3229C24.368 36.1589 24.0096 35.9255 23.7152 35.6227C23.4336 35.32 23.216 34.9667 23.0624 34.563C22.9216 34.1467 22.8512 33.6926 22.8512 33.2006C22.8512 32.6329 22.96 32.0526 23.1776 31.4597C23.408 30.8667 23.7216 30.3369 24.1184 29.8701C24.528 29.3907 25.0208 28.9997 25.5968 28.6969C26.1728 28.3941 26.8128 28.2427 27.5168 28.2427C28.0672 28.2427 28.5536 28.3247 28.976 28.4887C29.4112 28.6527 29.7696 28.8861 30.0512 29.1889C30.3456 29.4917 30.5632 29.8512 30.704 30.2675C30.8576 30.6712 30.9344 31.119 30.9344 31.611C30.9344 32.1787 30.8192 32.759 30.5888 33.352C30.3712 33.9449 30.0576 34.4811 29.648 34.9604C29.2512 35.4272 28.7648 35.812 28.1888 36.1147C27.6128 36.4175 26.9728 36.5689 26.2688 36.5689ZM36.5222 39.0289H39.4406L41.8021 30.3432L45.8725 39.0289H48.3877L51.9973 25.7827H49.0789L46.7749 34.2035L42.8581 25.7827H40.1317L36.5222 39.0289ZM53.4401 39.0289H63.5777L64.2881 36.4364H57.0689L57.8369 33.6358H64.0769L64.7873 31.0812H58.5473L59.2769 28.3752H66.3809L67.0913 25.7827H57.0497L53.4401 39.0289ZM71.0473 39.0289H74.0041L75.3673 34.0711L82.7209 25.7827H79.1497L74.5417 31.2704L72.9673 25.7827H69.6841L72.4681 33.8061L71.0473 39.0289Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M97.8832 34.1802C97.2816 37.3878 94.4288 39.8172 91 39.8172C87.134 39.8172 84 36.7284 84 32.9182C84 29.108 87.134 26.0192 91 26.0192C92.9324 26.0192 94.6816 26.7908 95.9484 28.0384C95.9484 28.0384 94.4572 30.0576 96.8904 31.1093C96.8904 31.1093 95.9484 33.0023 97.8832 34.1802Z" fill="#FFA800" />
        <path d="M90.4912 37.8686L91.7392 37.8679L91.7384 36.7088C93.4424 36.5541 94.57 35.6664 94.5692 34.2236V34.1999C94.568 32.7334 93.6076 32.0598 91.6996 31.6233L91.6988 30.2514C92.2388 30.3811 92.8148 30.6174 93.3072 30.9601L94.29 29.3747C93.57 28.8902 92.7416 28.5595 91.7576 28.4536L91.7572 27.744L90.5092 27.7447L90.5096 28.4189C88.6736 28.55 87.6424 29.5204 87.6432 30.916V30.9397C87.644 32.4062 88.6284 33.0561 90.5608 33.4926L90.5616 34.9118C89.8172 34.794 89.0972 34.4751 88.3288 33.9433L87.25 35.5169C88.15 36.155 89.3144 36.5683 90.4904 36.6859L90.4912 37.8686ZM90.5712 31.4229C89.9232 31.2459 89.7552 31.0685 89.7552 30.761L89.7548 30.7374C89.7548 30.4299 89.9828 30.1932 90.5708 30.1456L90.5712 31.4229ZM91.6896 34.9821L91.6888 33.6812C92.3128 33.8582 92.4928 34.0355 92.4932 34.3548V34.3785C92.4932 34.7215 92.2416 34.9227 91.6896 34.9821Z" fill="white" />
      </svg>
    </router-link>
    <div v-if="userCreated" class="w-2/3">
      <svg class="mx-auto" width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M59.9216 103.763L32.4014 76.3057C30.748 74.6561 30.748 71.9815 32.4014 70.3318L38.3889 64.3579C40.0422 62.7082 42.7231 62.7082 44.3765 64.3579L62.9154 82.8541L102.624 43.2372C104.277 41.5876 106.958 41.5876 108.611 43.2372L114.599 49.2111C116.252 50.8606 116.252 53.5352 114.599 55.1849L65.9092 103.763C64.2557 105.412 61.5749 105.412 59.9216 103.763Z" fill="#68D391" />
        <circle cx="73.5" cy="73.5" r="70.5" stroke="#68D391" stroke-width="6" />
      </svg>
      <h1 class="mt-4 text-lg italic text-green-500 mb-10 text-center">Successfully created!</h1>
      <router-link to="/login" class="mt-8 block py-3 px-2 rounded-full text-lunchPurple-700 bg-lunchPink-600 text-center font-black uppercase text-lg focus:outline-none focus:bg-lunchPink-700 hover:bg-lunchPink-700">LOG IN</router-link>
      <div class="w-full text-center">
        <router-link to="/" class="mt-4 text-white font-bold text-sm inline-block">Go Back</router-link>
      </div>
    </div>
    <div v-else class="w-full h-full flex items-center justify-center">
      <div class="mt-10 w-full">
        <h2 class="text-white font-bold text-xl text-center">SIGN UP</h2>
        <form @submit.prevent="onSubmit" class="mt-8 w-3/4 mx-auto">
          <input v-model="name" 
                 :class="[errorField === 'name' ? 'border-red-400' : 'border-lunchPink-600','relative px-8 h-10 w-full block bg-transparent text-white placeholder-white font-bold border-b-2  focus:outline-none focus:border-white']" 
                 type="name" name="name" placeholder="USERNAME" required
          >
          <i class="fas fa-user-alt text-xl text-lunchPink-600 absolute -mt-8"></i>
          <span v-if="hasError && errorField === 'name'" class="text-red-400 text-xs absolute">{{ errorMessage }}</span>
          <div class="relative">
            <input v-model="email" 
                   :class="[errorField === 'email' ? 'border-red-400' : 'border-lunchPink-600','mt-8 relative px-8 h-10 w-full block bg-transparent text-white placeholder-white font-bold border-b-2  focus:outline-none focus:border-white']" 
                   type="email" name="name" placeholder="EMAIL"
            >
            <i class="fas fa-at text-xl text-lunchPink-600 absolute -mt-8"></i>
            <span class="text-xs  text-lunchPink-600 absolute top-0 right-0 mt-3">Optional </span>
            <span v-if="hasError && errorField === 'email'" class="text-red-400 text-xs absolute">{{ errorMessage }}</span>
          </div>
          
          <input v-model="password" 
                 :class="[errorField === 'password' ? 'border-red-400' : 'border-lunchPink-600','mt-8 relative px-8 h-10 w-full block bg-transparent text-white placeholder-white font-bold border-b-2  focus:outline-none focus:border-white']" 
                 type="password" name="password" placeholder="PASSWORD" required
          >
          <i class="fas fa-lock text-xl text-lunchPink-600 absolute -mt-8"></i>
          <span v-if="hasError && errorField === 'password'" class="text-red-400 text-xs absolute">{{ errorMessage }}</span>
          <div class="relative w-2/3">
            <select v-model="currency" id="currency" 
                    :class="[errorField === 'currency' ? 'border-red-400' : ' border-lunchPink-600','mt-8 appearance-none relative px-8 h-10 w-full block bg-transparent text-white placeholder-white font-bold border-b-2  focus:outline-none focus:border-white']"
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
            <span v-if="hasError && errorField === 'currency'" class="text-red-400 text-xs absolute">Please pick a valid option.</span>
          </div>
          
          <input class="w-full mt-16 block py-3 px-3 rounded-full bg-lunchPink-600 text-lunchPurple-700 text-center font-black uppercase text-lg focus:outline-none focus:bg-lunchPink-700 hover:bg-lunchPink-700" type="submit" name="submit" value="JOIN">
        </form>
        <div class="w-full text-center">
          <router-link to="/login" class="mt-6 text-white font-bold text-sm inline-block">Or Log In</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      currency: 'CURRENCY',
      userCreated: null,
      hasError: false,
      errorMessage: null,
      errorField: null
    }
  },
  methods: {
    onSubmit() {
      this.$axios.post('/register', {
        name: this.name.toLowerCase(),
        email: this.email.toLowerCase(),
        password: this.password,
        currency: this.currency
      })
        .then(res => {
          console.log(res)
          res.status === 201 ? this.userCreated = true : this.hasError = true
        })
        .catch(err => {
          console.log(err.response)
          this.errorMessage = err.response.data[0].message
          this.errorField = err.response.data[0].field
          this.hasError = true
        })
    }
  },
}
</script>
