import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Upload from './views/Upload.vue';
import fileDisplay from './views/fileDisplay.vue';
import loginPage from './views/loginPage.vue';
import User from './views/User.vue';
import store from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: loginPage,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user-account',
      name: 'User Account',
      component: User,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/user-files',
      name: 'File Display',
      component: fileDisplay,
      meta: {
        requiresAuth: true,
      },
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

// check to see if the route requires authentication before it loads
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
