import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/home'
import Detail from '../views/detail'
Vue.use(Router)
// import category from './views/home/category'
const routes=[
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  }
]





const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
