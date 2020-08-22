import Vue from 'vue'
import App from './App.vue'

import router from './router/router'

import vuetify from './plugins/vuetify'

import baseAxios from 'axios'
// import VueAxios from 'vue-axios'
import store from './store'

const managerApi = baseAxios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT
})


Vue.config.productionTip = false

// Vue.use(VueAxios, axios)

store.commit('setFileEndpoint', process.env.VUE_APP_FILE_ENDPOINT)
console.log(store.getters.apiEndpoint)
console.log(store.getters.fileEndpoint)

Vue.prototype.axios = managerApi
Vue.prototype.managerApi = managerApi

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
