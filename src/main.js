import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import api from 'api/api'
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('common/images/default.jpg'),
  attempt: 1
})

Vue.prototype.$api = api;

new Vue({
  render: h => h(App),
}).$mount('#app')