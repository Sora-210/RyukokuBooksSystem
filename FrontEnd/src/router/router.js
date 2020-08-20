import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
// view import
import Collection from '../view/Collection.vue'
import Home from '../view/Home.vue'
import Search from '../view/Search.vue'
import Request from '../view/Request.vue'
import CodeReader from '../view/CodeReader.vue'
import Login from '../view/admin/Login.vue'

//Admin View Components
import AdminRental from '../view/admin/Rental.vue'
import AdminCollection from '../view/admin/Collection.vue'
import AdminRequest from '../view/admin/Request.vue'

//Admin Statistics View Components
import Statistics from '../view/admin/Statistics.vue'

//Error View Components
import Error404 from '../view/error/404.vue'
import Error500 from '../view/error/500.vue'

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
        path: '/login',
        component: Login
    },
    //Admin Routing
    {
        path: '/admin/rentals',
        component: AdminRental,
        meta: {requiresAuth:true}
    },
    {
        path: '/admin/collections',
        component: AdminCollection,
        meta: {requiresAuth:true}
    },
    {
        path: '/admin/requests',
        component: AdminRequest,
        meta: {requiresAuth:true}
    },
    {
        path: '/admin/statistics',
        component: Statistics,
        meta: {requiresAuth:true}
    },
    // {
    //     path: '/admin/setting',
    //     component: AdminRequest
    // },
    //Error Routing
    {
        path: '/404',
        component: Error404
    },
    {
        path: '/500',
        component: Error500
    },
    {
        path: '*',
        component: Error404
    }
]



const router = new Router({
    mode: 'history',
    routes
})

// ログインチェック
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.token === "") {
            next({
                path: '/login'
            })
        } else {
            next()
        }
        next()
    } else {
        next()
    }
})

export default router