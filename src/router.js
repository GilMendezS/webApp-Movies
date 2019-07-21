import Vue from 'vue'
import store from './store';
import Router from 'vue-router'
Vue.use(Router)


const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'signin',
      component: () => import('./components/auth/LoginComponent.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./components/auth/SignupComponent.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('./views/Movies.vue')
    },
    {
      path: '/movies/:id',
      name: 'show-movie',
      props: true,
      component: () => import('./views/ShowMovie.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('./views/Favorites.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isAuthenticated']) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})
export default router;
