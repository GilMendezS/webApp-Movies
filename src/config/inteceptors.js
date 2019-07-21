import Vue from 'vue';
import axios from 'axios';
import router from '@/router'
export default class Interceptor {
  constructor(){
    this.init();
  }
  init(){
    axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
      
      return config;
    }, error => Promise.reject(error))

    axios.interceptors.response.use(response => {
      return response
    }, error => {
      if (error.response) {
        if (error.response.status === 401) {          
          if (error.response.data.message) {
            Vue.toasted.error(error.response.data.message)
          }
          else {
            Vue.toasted.info('Your session has expired, login again :)', { duration: 3000 })
          }
          router.push('/login');
        }
        else if (error.response.status == 403) {
          if (error.response.data.message) {
            Vue.toasted.error(error.response.data.message, { duration: 3000 })
          }
          else {
            Vue.toasted.error('Something went wrong. Please try again.', { duration: 3000 })
          }
        }
        else if (error.response.status == 404) {
          if (error.response.data.message) {
            Vue.toasted.error(error.response.data.message, {duration: 3000})
          }
          else {
            Vue.toasted.error('Something went wrong, try it later', { duration: 3000 })
          }
        }
        else if (error.response.status == 422) {
          if(error.response.data.errors){
            const allErrors = error.response.data.errors;
            let messages = '';
            for (let key in allErrors ){
              messages += allErrors[key][0];
            }
            Vue.toasted.error(messages, {duration: 2000})
          }
          else if (error.response.data.message) {
            Vue.toasted.error(error.response.data.message,  { duration: 3000 })
          }
          else {
            Vue.toasted.error('Something went wrong, try it later.', {duration: 3000})
          }
          
        }
        else if (error.response.status === 500) {
          if (error.response.data.message) {
            Vue.toasted.error(error.response.data.message,  { duration: 3000 })
          }
          else {
            Vue.toasted.error('Something went wrong. Please try again.', { duration: 3000 })
          }

        }
      }
      return Promise.reject(error);
    })
  }
}

