import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from './views/Dashboard.vue';
import Auth from './views/Auth.vue';


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
    path: '/logout',
    name: 'logout',
    component: Auth
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

export default router;
