import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('pages/home/home')
  },{
    path: '/albumlist/:id',
    name: 'Albumlist',
    component: () => import('pages/albumList/albumList')
  }]
})
