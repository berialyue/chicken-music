// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'common/stylus/index.styl'
import axios from 'axios'
import VueAxios from 'vue-axios'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

fastclick.attach(document.body)
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  loading: require('./common/images/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
