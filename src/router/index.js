import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

Router.prototype.back = false;
Router.prototype.goBack = function () {
  this.back = true;
  this.go(-1)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('pages/home/home')
  }, {
    path: '/albumlist/:id',
    name: 'Albumlist',
    component: () => import('pages/list/albumList')
  }, {
    path: '/tracklist/:id',
    name: 'Tracklist',
    component: () => import('pages/list/trackList')
  }]
})