<template>
    
    <v-card color="cyan darken-2" class="white--text">
        <v-layout>
        <v-flex xs5>
            <v-img
            :src="movie.poster_path"
            height="400px"
            contain
            ></v-img>
        </v-flex>
        <v-flex xs7>
            <v-card-title primary-title>
            <div>
                <div class="headline mb-1">Status</div>
                <div class="mb-2">{{movie.status}}</div>
                <div class="mb-4">{{movie.release_date}}</div>
                <div class="">
                    <h3 class="mb-2">Sipnosis</h3>
                    {{movie.overview}}
                </div>
            </div>
            </v-card-title>
        </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
        
            <v-icon>star_border</v-icon>
            <span>Vote average: {{movie.vote_average}}</span>
            <v-spacer></v-spacer>
            <v-btn @click="markAsFavorite(movie)" flat color="red"><i class="fa fa-heart"></i> Favorite </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props: ['movie'],
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
        
    },
    computed: {
        isAuthenticated(){
            return this.$store.getters['auth/isAuthenticated'];
        },
    }
}
</script>
