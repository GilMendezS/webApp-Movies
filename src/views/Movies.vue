<template>
  <v-container>
    <v-layout
      layout
      wrap
    >
      <v-flex xs21 offset-md3 md6>
        <v-search></v-search>
      </v-flex>
      <v-flex v-for="movie in movies" :key="movie.id" xs12 sm4 class="m-4 pt-1" >
                <v-details-movie :favorites="favorites" :movie="movie"></v-details-movie>
      </v-flex>
      <v-flex xs12>

      <v-paginator></v-paginator>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';
import DetailsMovie from '@/components/movie/DetailsMovie.vue';
import Paginator from '@/components/movie/Paginator.vue';
import Search from '@/components/movie/Search.vue';
export default {
    components: {
        'v-details-movie':DetailsMovie,
        'v-paginator': Paginator,
        'v-search': Search
    },
    data: () => ({
        data: [],
        favorites: false
    }),
    created(){
        this.$store.dispatch('movies/getAllMovies');
    },
    computed: {
      movies(){
        
        return this.$store.getters['movies/getAllMovies'];
      },
      
    }
}
</script>
