// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import * as utils from "./components/utils/utils"
import 'vue-datetime/dist/vue-datetime.css'
// require styles
//import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false
Vue.config.silent = true

// Vue.prototype.$http=axios.create({
//   baseURL:"http://13.209.21.165"
// })

Vue.prototype.$http=axios.create({
  baseURL:(process.env.NODE_ENV === "production") ? "http://13.209.21.165" : "http://13.209.21.165"
})


Vue.prototype.$http.defaults.xsrfCookieName = 'csrftoken';
Vue.prototype.$http.defaults.xsrfHeaderName = 'X-CSRFToken';
Vue.prototype.utils = utils


//Vue.prototype.baseURI = "http://127.0.0.1:890"
Vue.prototype.HOST = "http://gconnect.kr"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})


// day_list = [];
// temp_day = new Date(2018.1.1)
// temp_day.day(+1)
// for ( var i = 0 ,   <= nowday )
// {
//   hitcount = result[temp]
//   if(hitcout == null)
//     day_list.add() = {"date" : tempday,
//     "hitcout" : 0 }
//   else
//     day_list.add() = {"date" : tempday,
//                     "hitcout" : hit_cout }
// }
  
  
  