import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from './views/Dashboard.vue';
import UserDashboard from './views/UserDashboard.vue'
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
    component: {
      render: (h) => {
        switch (localStorage.userRole) {
          case "BORROWER":
            return h(UserDashboard);
          default:
            return h(Dashboard);
        }
      }
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Auth
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
