// router.js
import { createRouter, createWebHistory } from 'vue-router';
import DashBoard from './views/DashBoard.vue';
import LoginForm from './components/LoginForm';
import ListBike from './components/ListBike';
// import BikeUsers from './components/BikeUsers';
import SearchTable from './components/SearchTable'
// import BikeToor from './components/BikeToor'
// import Dashboard from './views/Dashboard.vue';
import BazaBike from './components/BazaBike'
import store from './store'; // импорт хранилища


const routes = [
  // { path: '/', component: Home },
  { path: '/', component: LoginForm },
  { path: '/login', component: LoginForm}, 
  { path: '/dashboard', component: DashBoard, meta: { requiresAuth: true } },
  { path: '/participants', component: SearchTable, meta: { requiresAuth: true } },
  { path: '/equipment', component: ListBike, meta: { requiresAuth: true } },
  { path: '/baza', component: BazaBike, meta: { requiresAuth: true } },
  
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;