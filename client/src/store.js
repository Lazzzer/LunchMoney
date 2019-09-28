import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUserName: null,
    currentUserEmail: null,
    currentCurrency: null
  },
  mutations: {
    setName(state, name) {
      state.currentUserName = name
    },
    setEmail(state, email) {
      state.currentUserEmail = email
    },
    setCurrency(state, currency) {
      state.currentCurrency = currency
    }
  },
  actions: {}
})
