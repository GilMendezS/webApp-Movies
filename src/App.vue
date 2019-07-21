<template>
  <v-app>
    <v-navbar></v-navbar>
    <v-content>
      <v-loader></v-loader>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import CircleLoader from '@/components/loaders/LoaderComponent.vue';
import Toolbar from '@/components/includes/Toolbar.vue';
export default {
  name: 'App',
  components: {
    'v-loader': CircleLoader,
    'v-navbar': Toolbar
  },
  created(){
    if(this.isAuthenticated){
      this.$store.dispatch('movies/getUserMovies');
    }
  },
  computed:{
    isAuthenticated(){
      return this.$store.getters['auth/isAuthenticated'];
    }
  }
}
</script>
