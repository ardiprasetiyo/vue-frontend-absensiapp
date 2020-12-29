import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vueCookies from 'vue-cookies'

Vue.use(vueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
