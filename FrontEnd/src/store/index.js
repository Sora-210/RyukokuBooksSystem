import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    apiEndpoint: null,
    fileEndpoint: null
  },
  getters: {
    token: (state) => {
      return state.token
    },
    apiEndpoint:(state) => {
      return state.apiEndpoint
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
    setApiEndpoint(state, endpoint) {
      state.apiEndpoint = endpoint
    },
    setFileEndpoint(state, endpoint) {
      state.fileEndpoint = endpoint
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