import Vue from 'vue'
import 'lib-flexible' //导入移动端适配方案
import 'postcss-pxtorem'//导入rem
import FastClick from 'fastclick' //解决移动端三百毫米延迟
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css' //👈重置全局样式
import './assets/fonts/iconfont.css' //👈全局导入字体图标
FastClick.attach(document.body);    //👈解决移动端三百毫米延迟
import './assets/css/common.css'
//👇导入aixos
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000' //👈配置默认url
axios.defaults.withCredentials =true
axios.defaults.timeout = 5000   //👈设置超时
//👆导入axios
//👇导入swiper插件
import VueAwesomeSwiper from  'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
//👆导入swiper插件👈
//👇配置 VueLazyload
import VueLazyload from 'vue-lazyload' //👈导入懒加载插件
Vue.use(VueLazyload,{
  loading:  '/load.gif'//绝对路径下
  //vue编译时不会进入main.js，因而，需要使用绝对路径,将加载时的图片拷贝到public目录，然后使用public下的该文件
})
//👆VueLazyload
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
