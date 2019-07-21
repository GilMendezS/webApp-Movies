<template>
  <v-layout row>
    <v-flex xs12 sm10>
      <v-card class="">
        <v-toolbar color="blue" dark>
          <v-toolbar-title class="mt-3">
              <v-text-field
                    @keyup="findMovies"
                    v-model="moviename"
                    prepend-icon="search"
                    label="Name of movie..."
                    required
                ></v-text-field>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item) in moviesOfQuery">
            <v-list-tile
              
              :key="item.id"
                @click="openMovie(item.id)"
              avatar
              
            >
              <v-list-tile-avatar>
                <img :src="item.poster_path">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.overview"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
    data: () => ({
        moviename: '',
        results:[],
        model: '',
        isEditing: '',
        
    }),
    methods: {
        findMovies(){
            if(this.moviename.length >= 3){
                this.$store.dispatch('movies/getMoviesWithQuery', this.moviename)
            }   
            else {
                this.$store.dispatch('movies/resetSearch')
            }
        },
        openMovie(movieId){
            this.$store.dispatch('movies/resetSearch')
            this.$router.push({name: 'show-movie', params: {id:movieId}})
        }
    },
    computed: {
        moviesOfQuery(){
            return this.$store.getters['movies/getMoviesQuery'];
        }
    }
}
</script>