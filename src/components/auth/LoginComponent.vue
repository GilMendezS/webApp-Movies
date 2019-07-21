<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card hover="">
                    <v-card-title>
                        <h3>Sign in</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignin">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field 
                                        name="email" 
                                        label="E-mail"
                                        id="email"
                                        v-model="user.email"
                                        type="email"
                                        required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field 
                                        name="password" 
                                        label="Password"
                                        id="password"
                                        v-model="user.password"
                                        type="password"
                                        required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit" class="primary" :disabled="loading" :loading="loading">
                                            Sign in
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>
                                                    cached
                                                </v-icon>
                                            </span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import User from '@/models/user.js';
export default {
   
    data () {
        return {
            user: new User(),
            error: true,
            loading: false
        }
    },
    computed: {
        
    },
    watch: {
        
    },  
    methods: {
        onSignin () {
            this.$store.dispatch('auth/loginUser', this.user);
        },
       
    }
}
</script>
