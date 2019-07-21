<template>
    <v-container>
        
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title>
                        <h3>Sign up</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignUp">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field 
                                        name="email" 
                                        label="Name"
                                        id="name"
                                        v-model="user.name"
                                        type="text"
                                        required></v-text-field>
                                    </v-flex>
                                </v-layout>
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
                                        <v-text-field 
                                        name="confirmPassword" 
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        v-model="user.password_confirmation"
                                        type="password"
                                        required
                                        :rules="[comparePasswords]"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit" class="primary" :disabled="invalidForm" :loading="loading">
                                            Sign up
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
    
    data: () => ({
        user : new User(),
        loading: false
    }),
    computed: {
        comparePasswords () {
            return this.user.password !== this.user.password_confirmation ? 'Passwords do not match' : true
        },
        invalidForm(){
            return this.user.name == '' && this.user.email == '' &&
            this.user.password == '' && this.user.confirmPassword == ''
        }
        
    },
    methods: {
        onSignUp () {
            this.$store.dispatch('auth/signUp', this.user);
        },
    },
    
}
</script>