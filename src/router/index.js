import Vue from "vue";
import VueRouter from "vue-router";

import Login from '../components/Login.vue';
import CreateMaterial from '../views/Material/CreateMaterial.vue'
import Dashboard from '../views/Dashboard.vue';
import LoanRequests from '../views/Request/LoanRequests.vue';
import MaterialCatalog from '../views/Material/MaterialCatalog.vue'
import UserDashboard from '../views/UserDashboard.vue'

Vue.use(VueRouter);

const getUserInformation = () => {
  return JSON.parse(window.localStorage.getItem('user'));
}

const adminRouteAuthentication = (to, from, next) => {
  const userInformation = getUserInformation();
  if (!userInformation?.authenticated || userInformation?.role !== process.env.VUE_APP_LIBRARIAN_ROLE) {
    next({ name: 'login' })
  } else {
    next();
  }
}

const userRouteAuthentication = (to, from, next) => {
  const userInformation = getUserInformation();
  if (!userInformation?.authenticated) {
    next({ name: 'login' })
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const userInformation = getUserInformation();
      if (userInformation?.authenticated && userInformation?.role === process.env.VUE_APP_LIBRARIAN_ROLE) {
        next({ name: 'admin-dashboard' })
      } else if (userInformation?.authenticated) {
        next({ name: 'user-dashboard' })
      }
      else {
        next();
      }

    }
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: Dashboard,
    beforeEnter: adminRouteAuthentication
  },
  {
    path: '/user/dashboard',
    name: 'user-dashboard',
    component: UserDashboard,
    beforeEnter: userRouteAuthentication
  },
  {
    path: '/logout',
    name: 'logout',
    component: Login
  },
  {
    path: '/materials',
    name: 'materials',
    component: MaterialCatalog,
    beforeEnter: userRouteAuthentication
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: MaterialCatalog,
    beforeEnter: userRouteAuthentication
  },
  {
    path: '/requests/loan',
    name: 'loan-requests',
    component: LoanRequests,
    beforeEnter: userRouteAuthentication
  },
  {
    path: '/material/add',
    name: 'add-material',
    component: CreateMaterial,
    beforeEnter: adminRouteAuthentication
  },
  {
    path: '/logout',
    name: 'logout',
    component: Login,
    beforeEnter: (to, from, next) => {
      window.localStorage.removeItem('user')
      next({ path: '/login' });
    }
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
