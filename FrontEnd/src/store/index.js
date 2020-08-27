import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    fileEndpoint: null
  },
  getters: {
    token: (state) => {
      return state.token
    },
    fileEndpoint:(state) => {
      return state.fileEndpoint
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    },
    setFileEndpoint(state, endpoint) {
      state.fileEndpoint = endpoint
    }
  },
  plugins: [
    createPersistedState({storage: window.sessionStorage})
  ]
})