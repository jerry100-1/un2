import Vue from 'vue'
import App from './App'

import store from './store'
import ajax from "./unit/request.js"
import ajax2 from "./unit/request2.js"

import "./common/iconfont.css"

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.$ajax = ajax
// Vue.prototype.$baseUrl2="http://192.168.1.166:9996/"
Vue.prototype.$baseUrl2="http://192.168.1.166:9996"
// 测试环境 http://192.168.1.166:9996 正式环境 http://120.79.26.124:9995
Vue.prototype.$ybtUrl="http://192.168.1.166:9996/lyx_business"

Vue.prototype.$ajax2 = ajax2

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
