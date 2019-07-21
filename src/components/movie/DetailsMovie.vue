<template>
    <v-card hover class="mr-1 mb-3" >
        <v-img
            :src="movie.poster_path"
            aspect-ratio="1"
            class="grey lighten-2"
            height='20%'
        ></v-img>

        <v-card-title primary-title>
            <div>
            <h2 class="title-movie">{{movie.title}}</h2>
            <div> {{movie.overview ?  movie.overview.substring(0,50) : ''}} ... </div>
            </div>
            <p v-if="favorites">
                Favorite since: {{movie.created_at}}
            </p>
        </v-card-title>
        <v-card-actions>
            <div v-if="favorites">
                <v-btn :disabled="!isAuthenticated" @click="removeFavorite(movie)" :title="showTitle" flat color="blue"><i class="fa fa-check"></i> Favorite </v-btn>
                <v-btn @click="onShowMovie(movie.movie_id)" flat color="orange"><i class="fa fa-eye"></i> See </v-btn>
            </div>
            <div v-else>
                <v-btn v-if="movie.is_favorite" @click="showMessage" :title="showTitle" flat color="blue"><i class="fa fa-check"></i> Favorite </v-btn>
                <v-btn v-else :title="showTitle" @click="markAsFavorite(movie)" flat color="red"><i class="fa fa-heart"></i> Favorite </v-btn>
                <v-btn @click="onShowMovie(movie.movie_id)" flat color="orange"><i class="fa fa-eye"></i> See </v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props: ['movie', 'favorites'],
    data: () => ({
        title: 'You are not authenticated'
    }),
    methods: {
        markAsFavorite(movie){
            if(this.isAuthenticated)
                this.$store.dispatch('movies/addFavorite', movie);
            else 
                this.$toasted.info('Please, create an account to save your favorite movies', {duration: 3000})
        },
        removeFavorite(movie){
            this.$store.dispatch('movies/removeFavorite', movie);
        },
        onShowMovie(movieId){
            this.$router.push({name:'show-movie', params: {id: movieId}})
        },
        showMessage(){
            this.$toasted.info('Movie already in favorites', {duration: 2000})
        }
    },
    computed: {
        isAuthenticated(){
            return this.$store.getters['auth/isAuthenticated'];
        },
        showTitle(){
            return !this.isAuthenticated ? this.title : ''
        }
    }
}
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    .title-movie {
        font-family: 'Montserrat';
    }
</style>
