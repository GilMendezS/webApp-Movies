import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted';


import Interceptor from './config/interceptors';

const interceptor = new Interceptor();

interceptor.init();
Vue.use(Toasted)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
