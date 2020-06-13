import Vue from 'vue'
import Router from 'vue-router'
// view import
import HelloWorld from '../view/HelloWorld.vue'



Vue.use(Router)

const routes = [
    {
        path: '/',
        component: HelloWorld
    }
]


export default new Router({
    mode: 'history',
    routes
})