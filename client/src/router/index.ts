import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { requiresAuth: true, isAdmin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, isAdmin: false },
    },
    {
      path: '/create-ikr',
      name: 'createIkr',
      component: () => import('@/views/CreateView.vue'),
      meta: { requiresAuth: true, isAdmin: true },
    },
  ],
});

// Router auth middleware // protect special administrative routes via roles
router.beforeEach(async (to, from, next) => {
  const res = await fetch('/api/user/isAuth');
  const currentUser = await res.json();
  // save user in store
  if (currentUser) {
    const userStore = useUserStore();
    userStore.setUser(currentUser);
  }
  // user authenticated ?
  if (to.name !== 'login' && to.meta.requiresAuth && !currentUser) {
    next({ name: 'login' });
    return;
  }
  // protect admin pages ...
  if (to.meta.isAdmin && currentUser.role !== 'admin') {
    next(false);
    return;
  } else {
    next();
    return;
  }
});

export default router;
