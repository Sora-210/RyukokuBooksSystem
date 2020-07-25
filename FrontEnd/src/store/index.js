import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    apiEndpoint: "",
  },
  getters: {
    token: (state) => {
      return state.token
    },
    apiEndpoint:(state) => {
      return state.apiEndpoint
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = ""
    },
    setApiEndpoint(state, endpoint) {
      state.apiEndpoint = endpoint
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({storage: window.sessionStorage})
  ]
})
