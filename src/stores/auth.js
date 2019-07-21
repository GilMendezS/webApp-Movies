import Vue from 'vue';
import axios from 'axios';
import router from '../router';

export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
    },
    mutations: {
        setToken: (state, payload) => {
            state.token = payload;
            localStorage.setItem('token', payload)
        },
        setUser: (state, payload) => {
            state.user = payload;
            localStorage.setItem('user', JSON.stringify(payload))
        },
        logout: state => {
            state.user = null;
            state.token = null;
            localStorage.clear();
            
        }
    },
    actions: {
        loginUser: ({ dispatch, commit }, payload) => {
            axios.post(`http://localhost:8000/api/auth/login`, payload)
                .then(response => {
                    if (response.data.success) {
                        commit('setToken', response.data.access_token);
                        commit('setUser', response.data.user);
                        dispatch('movies/getUserMovies', {}, {root: true})
                        router.push('/movies')
                        Vue.toasted.success(`Welcome ${response.data.user.name}`, {duration: 3000})
                    }  
                })
        },
        signUp: ({ dispatch, commit }, payload) => {
            axios.post('http://localhost:8000/api/auth/signup', payload)
                .then(response => {
                    router.push('/')
                    Vue.toasted.show(response.data.message, { type: 'success', icon: 'check', duration: 2000 });
                })
        },
        logoutUser: ({ dispatch, commit }) => {
            axios.post('http://localhost:8000/api/auth/logout')
            .then(response => {
                if(response.data.success){
                    dispatch('movies/clearFavorites',{}, {root: true})
                    commit('logout');
                    Vue.toasted.info(response.data.message, {duration: 3000, icon:'check'})
                    router.push('/movies')
                }
            })
        }
    },
    getters: {
        getUser: state => {
            return state.user;
        },
        getToken: state => {
            return state.token;
        },
        isAuthenticated: state => {
            return state.token && state.user;
        },
    }
}