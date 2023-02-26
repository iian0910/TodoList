import Vue from 'vue'
import App from './App.vue'
import './assets/js/firebase.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style/main.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
