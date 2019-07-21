<template>
    <div class="text-xs-center">
        <v-pagination
        v-model="paginator.page"
        :length="paginator.total"
        :total-visible="10"
        
        @input="onChangePage"
        
        ></v-pagination>
    </div>  
</template>
<script>
export default {
    data: () => ({
        
    }),
    methods: {
        onChangePage(page){
            this.$store.dispatch('movies/getAllMovies', page)
        },
        
    },
    computed: {
        paginator(){
            console.log(this.$store.getters['movies/getPaginator'])
            return this.$store.getters['movies/getPaginator'];
        }
    }
}
</script>