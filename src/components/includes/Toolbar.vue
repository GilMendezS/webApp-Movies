<template>
    <v-toolbar class="primary" dark>
        <v-toolbar-title>
          <router-link to="/movies" tag="span">
            MoviesApp
          </router-link>
        
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat
          v-for="item in menuItems" :key="item.title"
          :to="item.link">
            <v-icon left>
              {{item.icons}}
            </v-icon>
            {{item.title}}
            </v-btn>
            <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
              <v-icon>
                exit_to_app
              </v-icon>
              Logout
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
        
    
</template>
<script>
export default {
    computed: {
      menuItems () {
        let menuItems = [
          {icons: 'face', title: 'Sign up', link: '/signup'},
          {icons: 'lock_open', title: 'sign in', link: '/'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icons: 'favorite', title: 'Favorites', link: '/favorites'},
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters['auth/isAuthenticated'];
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('auth/logoutUser');
      }
    }
}
</script>
