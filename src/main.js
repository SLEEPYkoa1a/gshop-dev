/*
* 入口JS
* */
/* eslint-disable no-new */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'

import './mock/mockServer'

Vue.component(Button.name, Button)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store  //使用vuex
})
