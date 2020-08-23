import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import vuetify from './plugins/vuetify'
import baseAxios from 'axios'
import store from './store'

const managerApi = baseAxios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT
})

Vue.config.productionTip = false

console.log("DEBUG INFO","aaa")
console.log(`FILE_ENDPOINT:${process.env.VUE_APP_FILE_ENDPOINT}`)
console.log(`API_ENDPOINT:${process.env.VUE_APP_API_ENDPOINT}`)

store.commit('setFileEndpoint', process.env.VUE_APP_FILE_ENDPOINT)
Vue.prototype.axios = managerApi
Vue.prototype.managerApi = managerApi

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')