import Vue from 'vue'
import Vuex from 'vuex'
import auth from './stores/auth';
import movies from './stores/movie';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    movies
  }
})
