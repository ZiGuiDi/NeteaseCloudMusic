import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router"
import store from "@/store"
//统一引入api所有接口函数
import * as API from "@/api"
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$API = API
    Vue.prototype.$bus = this


  },
  router,
  store

}).$mount('#app')
