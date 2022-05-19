import Vue from "vue";
import VueRouter from "vue-router";
import AdminDashboard from './views/AdminDashboard.vue';
import UserDashboard from './views/UserDashboard.vue'
import Auth from './views/Auth.vue';
import CreateMaterial from './views/Material/CreateMaterial.vue'
import MaterialCatalog from './views/Material/MaterialCatalog.vue'
import Borrowers from './views/Borrowers.vue'
import User from './views/User.vue'

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
    component: Auth,
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
    component: AdminDashboard,
    beforeEnter: adminRouteAuthentication
  },
  {
    path: '/user/dashboard',
    name: 'user-dashboard',
    component: UserDashboard,
    beforeEnter: userRouteAuthentication
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
    path: '/material/add',
    name: 'add-material',
    component: CreateMaterial,
    beforeEnter: adminRouteAuthentication
  },
  {
    path: '/borrowers',
    name: 'borrowers',
    component: Borrowers,
    beforeEnter: adminRouteAuthentication
  },
  {
    path: '/user/:action/:user_id',
    name: 'user',
    component: User
  },
  {
    path: '/logout',
    name: 'logout',
    component: Auth,
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
