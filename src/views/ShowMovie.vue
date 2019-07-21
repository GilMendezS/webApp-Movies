<template>
    <v-container>
        <v-layout row v-if="curentMovie.id">
            <v-flex xs12 md8 offset-md2>
                <v-extra-information :movie="curentMovie"></v-extra-information>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>
<script>
import DetailsMovie from '@/components/movie/DetailsMovie.vue';
import ExtraInformationMovie from '@/components/movie/ExtraInformationMovie.vue';
export default {
    props: ['id'],
    
    data: () => ({
        favorites: false
    }),
    created(){
        this.$store.dispatch('movies/getMovie', this.id)
    },
    components: {
        'v-details-movie': DetailsMovie,
        'v-extra-information': ExtraInformationMovie
    },
    computed:{
        curentMovie(){
            
            return this.$store.getters['movies/getMovie'];
        }
    }
}
</script>