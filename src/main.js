import '@babel/polyfill';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import './plugins/axios';
import './plugins/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import firebase from 'firebase/app';
import 'firebase/auth';
import { config } from '../firebase';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    firebase.initializeApp(config);
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // this.$router.push('/user-files');
    //   } else {
    //     // this.$router.push('/login');
    //   }
    // });
  },
  render: h => h(App),
}).$mount('#app');

// check to see if the route requires authentication before it loads
// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser; 
//   const requiresAuth = to.matched.some( record => record.meta.requiresAuth);
//   if (requiresAuth && !currentUser) {
//     next('/auth');
//   } else if (requiresAuth && currentUser) {
//     next();
//   } else {
//     next();
//   }
// });
