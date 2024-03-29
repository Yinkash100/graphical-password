import axios from 'axios'
window.axios = axios
axios.defaults.baseURL = 'https://graphical-password-be.herokuapp.com/'
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'

createApp(App).use(VueCookies).use(router).use(router).mount('#app')
