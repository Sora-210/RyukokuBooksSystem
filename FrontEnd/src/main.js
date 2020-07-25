import Vue from 'vue'
import App from './App.vue'

import router from './router/router'

import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'


Vue.config.productionTip = false

Vue.use(VueAxios, axios)

store.commit('setApiEndpoint', process.env.VUE_APP_API_ENDPOINT)
console.log(store.getters.apiEndpoint)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
