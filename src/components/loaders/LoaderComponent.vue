<template>
    <div class="vld-parent">
        <loading 
            :active.sync="isLoading" 
            :is-full-page="fullPage"
            :color='color'
            :loader='loader'
            >
        </loading>
    </div>
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    
    export default {
        data() {
            return {
                fullPage: true,
                loader:'spinner',
                color: '#2196f3'
            }
        },
        components: {
            Loading
        },
        computed: {
            isLoading(){
                return this.$store.getters['movies/isLoading'];
            }
        }
    }
</script>