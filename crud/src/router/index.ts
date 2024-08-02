import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserLogin from '../views/Auth/UserLogin.vue';
import UserRegister from '../views/Auth/UserRegister.vue';
import UserDashboard from '../views/UserDashboard.vue';
import UserOrders from '../views/UserOrders.vue';
import UserFormulario from '../views/UserFormulario.vue';
import UserTareas from '../views/UserTareas.vue';
import { getAuth } from 'firebase/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegister
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: UserDashboard,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/products',
    name: 'products',
    component: UserTareas,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: UserOrders,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/tarea-formulario',
    name: 'formulario',
    component: UserFormulario,
    meta: {
      requireAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requireAuth)) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      next();
    } else {
      next({
        name: 'login'
      });
    }
  } else {
    next();
  }
});

export default router;
