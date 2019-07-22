import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import FastClick from 'fastclick'
import api from 'api/api'
Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.prototype.$api = api;

new Vue({
  render: h => h(App),
}).$mount('#app')