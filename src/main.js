import '@babel/polyfill';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import './plugins/vee-validate';
import './plugins/axios';
import './plugins/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import FirebasePlugin from '../firebasePlugin';

Vue.use(FirebasePlugin);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
