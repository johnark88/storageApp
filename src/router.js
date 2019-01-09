import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Upload from './views/Upload.vue';
import fileDisplay from './views/fileDisplay.vue';
import loginPage from './views/loginPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
    },
    {
      path: '/user-files',
      name: 'File Display',
      component: fileDisplay,
    },
    {
      path: '/login',
      name: 'Login',
      component: loginPage,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
