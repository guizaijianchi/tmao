import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' 
import 'lib-flexible'
// es5 -> e6垫片
import 'babel-polyfill';
// 支持 scss sass
import  './assets/css/index.css'
// swiper 引入样式
import 'swiper/dist/css/swiper.css'
//导入 vue 懒加载
import VueLazyload from 'vue-lazyload';
//使用并且配置
Vue.use(VueLazyload,{
  loading:require("./assets/images/loading.gif")
})
global.storage = window.localStorage
//导入 Mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'
//loading 提示框
// Mint.Indicator.open('加载...');
// http 拦截器
import Axios from 'axios';
Vue.prototype.$axios = Axios;
//request 请求
Axios.interceptors.request.use(function(req){
  //显示loading
  Mint.Indicator.open('加载...');
  return req;
})
// response响应拦截
Axios.interceptors.response.use(function(res){
  //隐藏loading
  Mint.Indicator.close();
  return res;
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
