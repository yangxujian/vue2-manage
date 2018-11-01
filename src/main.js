import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
//
// Vue.prototype.$FileSaver = FileSaver;
// Vue.prototype.$XLSX = XLSX;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    console.log('login')
  }
  let user = true;
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
