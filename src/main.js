// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/axios'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI) // Vue全局使用

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt')
  if (to.path.toLowerCase() === '/login') {
    if (token !== 'null' && token !== null) {
      next({
        path: '/TodoList'
      })
      return
    }
    next()
  } else {
    if (token !== 'null' && token !== null) {
      next()
    } else if (to.path.toLowerCase() === '/register') {
      next()
    } else {
      next({
        path: '/'
      })
    }
  }
})

Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
