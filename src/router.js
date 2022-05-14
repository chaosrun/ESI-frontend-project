import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from './views/Dashboard.vue'
import Auth from './views/Auth.vue'


Vue.use(VueRouter);



const routes = [

  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    // beforeResolve: (to, from, next) => {
    //     if (!auth.authenticated()) {
    //         next('/login', () => {})
    //     } else {
    //         next();
    //     }

    // }
  },
  { path: '/login', name: 'login', component: Auth },
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
  base: process.env.BASE_URL,
  routes,
});

export default router;
