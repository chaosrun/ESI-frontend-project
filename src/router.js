import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from './views/Dashboard.vue';
import UserDashboard from './views/UserDashboard.vue'
import Auth from './views/Auth.vue';
import AdminMaterial from './views/Material/AdminMaterial.vue'

Vue.use(VueRouter);



const routes = [
  {
    path: '/',
    name: 'login',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/user/dashboard',
    name: 'userDashboard',
    component: UserDashboard
  },
  {
    path: '/logout',
    name: 'logout',
    component: Auth
  },

  {
    path: '/admin/material/add',
    name: 'material',
    component: AdminMaterial,
    // beforeResolve: (to, from, next) => {
    //     if (!auth.authenticated()) {
    //         next('/login', () => {})
    //     } else {
    //         next();
    //     }

    // }
  },
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   component: Auth,
  //   // beforeEnter: (to, from, next) => {
  //   //     auth.logout();
  //   //     next({ path: '/login' });
  //   // }
  // },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
