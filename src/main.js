import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/'
import axios from 'axios'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter)
Vue.use(ElementUI);

const router = new VueRouter({
    mode: 'hash',
    base:__dirname,
    routes,
})

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
