import Vue from 'vue'
import Router from 'vue-router'
// view import
import BookPage from '../view/BookPage.vue'



Vue.use(Router)

const routes = [
    {
        path: '/book/:isbn',
        component: BookPage
    },
]


export default new Router({
    mode: 'history',
    routes
})