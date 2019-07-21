<template>
  <v-container>
    <v-layout
      layout
      wrap
    >
      <v-flex v-show="favoriteMovies" v-for="movie in favoriteMovies" :key="movie.id" xs12 sm4 class="m-4 pt-1" >
                <v-details-movie :movie="movie" :favorites="favorites"></v-details-movie>
      </v-flex>
      <v-flex v-show="!favoriteMovies" justify-center>
        <p class="display-1 text-center font-weight-bold mb-3">
          <i class="fa fa-list-alt"></i>
          You dont have favorite movies yet...
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';
import DetailsMovie from '@/components/movie/DetailsMovie.vue';
export default {
    components: {
        'v-details-movie':DetailsMovie
    },
    data: () => ({
        data: [],
        favorites: true
    }),
    created(){
        this.$store.dispatch('movies/getUserMovies');
    },
    computed: {
      favoriteMovies(){
        return this.$store.getters['movies/getFavoriteMovies']
      },

    }
}
</script>
