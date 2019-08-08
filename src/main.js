import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './stores/store'

import axios from 'axios';

Vue.prototype.axios = axios;

//过滤器，去除img中的w.h,给.转义，所以加\
Vue.filter('setWH',(url, arg)=>{
  //查看javascript的replace方法api
  return url.replace(/w\.h/, arg);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
