import Vue from 'vue'
import Router from 'vue-router'
// view import
import BookPage from '../view/BookPage.vue'
import Collection from '../view/Collection.vue'
import Home from '../view/Home.vue'
import ErrorNotFound from '../view/ErrorNotFound.vue'
import Search from '../view/Search.vue'
import Request from '../view/Request.vue'
import CodeReader from '../view/CodeReader.vue'


Vue.use(Router)

const routes = [
    {
        path:"/",
        component: Home
    },
    {
        path:'/search',
        component: Search
    },
    {
        path: '/book/:isbn',
        component: BookPage
    },
    {
        path: '/collection/:uuid',
        component: Collection
    },
    {
        path: '/qrcodereader',
        component: CodeReader
    },
    {
        path: '/request',
        component: Request
    },
    {
        path: '*',
        component: ErrorNotFound
    }
]


export default new Router({
    mode: 'history',
    routes
})