// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/styles/index.less'
import '@/icons' // icon
import '@/utils/filters' // 自定义过滤器

import Echarts from 'echarts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//table
import ElSearchTablePagination from 'el-table-pagination'

// mount with global
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(Echarts)
Vue.use(ElSearchTablePagination)

// import '@/permission' // permission control
import tool from '@/utils/tool'
Vue.prototype.$tool = tool

import uploadUrl from '@/utils/uploadUrl'
Vue.prototype.$uploadPath = uploadUrl


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
