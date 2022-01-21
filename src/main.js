import Vue from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


Vue.prototype.handleErrors = function(err){
  if(err.response) {
    console.log("Problem with response ", err.response.status);
    alert("Problem with response ", err.response.status);
  } else if(err.request){
    console.log("Problem with request!");
    alert("Problem with request!");
  } else {
    console.log("Error", err.message);
    alert("Error", err.message);
  }
}