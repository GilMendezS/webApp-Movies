import axios from 'axios';
import Movie from '@/models/movie.js';
import Paginator from '@/models/paginator.js';
import Vue from 'vue';
export default {
    namespaced: true,
    state: {
        allMovies: [],
        userMovies: [],
        data: {},
        paginator: new Paginator(),
        isLoading: false,
        movie: new Movie(),
        moviesQuery: []
        
    },
    mutations: {
        setData: (state, payload) => {
            state.data = payload;
            state.allMovies = payload.results;
            state.paginator.page = payload.page;
            state.paginator.total = payload.total_pages;
        },  
        setAllMovies: (state, payload) => {
            state.allMovies = payload;
        },
        setMovie: (state, payload) => {
            state.movie = payload;
        },
        setMoviesQuery:(state, payload) => {
            state.moviesQuery = payload;
        },
        hideMovieFromList: (state, payload) => {
            state.allMovies = state.allMovies.filter( movie => movie.id != payload.id)
        },
        addMovieInList: (state, payload) => {
            state.allMovies = [...state.allMovies, payload];
        },
        setUserMovies: (state, payload) => {
            state.userMovies = payload;
        },
        addFavoriteMovie: (state, payload) => {
            state.userMovies.push(payload);
        },
        removeFavoriteMovie: (state, payload) => {
            state.userMovies = state.userMovies.filter(d => d.id != payload.id)
        },
        changeStateLoading: (state, payload) => {
            state.isLoading = payload;
        },
        setEmptySearch: state => {
            state.moviesQuery = []
        },
        clearFavoriteMovies: state => {
            state.userMovies = []
        }
    },
    actions: {
        getMoviesWithQuery: ({ commit }, query = '') => {
            axios.get(`http://localhost:8000/api/movies?name=${query}`)
                .then(response => {
                    commit('setMoviesQuery', response.data.results)
                })
        },
        getAllMovies: ({commit}, page =  1) => {
            commit('changeStateLoading', true)
            axios.get(`http://localhost:8000/api/movies?page=${page}`)
            .then(response => {
                
                commit('setData', response.data)
            })
            .finally(() => {
                commit('changeStateLoading', false)
            })
        },
        getMovie: ({commit}, payload) => {
            commit('changeStateLoading', true)
            axios.get(`http://localhost:8000/api/movies/${payload}`)
            .then(response => {
                if(response.data.success){
                    commit('setMovie', response.data.data);
                }
            })
            .finally(() => {
                commit('changeStateLoading', false)
            })
        },
        getUserMovies: ({commit}) => {
            commit('changeStateLoading', true)
            axios.get(`http://localhost:8000/api/mymovies`)
            .then(response => {
                
                commit('setUserMovies', response.data)
            })
            .finally(() => {
                commit('changeStateLoading', false)
            })
        },  
        clearFavorites: ({commit}) => {
            commit('clearFavoriteMovies');
        },
        addFavorite: ({ dispatch, commit }, payload) => {
            axios.post(`http://localhost:8000/api/movies`, payload)
            .then(response => {
                if(response.data.success){
                    dispatch('getUserMovies', payload);
                    Vue.toasted.show('Movie marked as favorite', { type: 'success', icon: 'favorite_border', duration:2000 });
                }
                else {
                    Vue.toasted.show(response.data.message, { type: 'success', icon: 'favorite_border', duration: 2000 });
                }
                
            })
        },
        removeFavorite: ({ dispatch, commit }, payload) => {
            axios.delete(`http://localhost:8000/api/movies/${payload.id}`)
            .then(response => {
                if(response.data.success){
                    commit('addMovieInList', payload)
                    commit('removeFavoriteMovie', payload);
                    Vue.toasted.show('Movie removed from favorites', { type: 'warning', icon: 'clear', duration: 2000 });
                }
            })
        },
        resetSearch: ({commit}) => {
            commit('setEmptySearch');
        }
    },
    getters: {
        getAllMovies: (state, getters) => {
            return state.allMovies
            .map(movie => ({
                ...movie,
                movie_id: movie.id,
                is_favorite: getters.getIdsFavoritesMovies.includes(movie.id)
            }))
        },
        getIdsFavoritesMovies: (state, getters) => {
            return getters.getFavoriteMovies.map( movie => {
                return movie.movie_id
            } );
        },
        getFavoriteMovies: state => {
            return state.userMovies.map(movie => ({
                ...movie.serialized_movie,
                id: movie.id,
                created_at: movie.created_at
            }));;
        },
        getPaginator: state => {
            return state.paginator;
        },
        isLoading: state => {
            return state.isLoading;
        },
        getMovie: state => {
            return state.movie;
        },
        getMoviesQuery: (state, getters) => {
            return state.moviesQuery
                .map(movie => ({
                    ...movie,
                    movie_id: movie.id
                })).slice(0,5)
        },
    }
}