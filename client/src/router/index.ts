import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CreateView from '@/views/CreateView.vue';
import LoginView from '@/views/LoginView.vue';
import { Role } from '@/models/role';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { authorize: [] },
    },
    {
      path: '/create-ikr',
      name: 'createIkr',
      component: CreateView,
      meta: { authorize: [Role.Admin] },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    // fallback path otherwise (Home)
    // { path: '*', redirect: '/' },
  ],
});

/*
// Router auth middleware
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in ...
  const { authorize } = to.meta;
  const currentUser = // service user auth....

  // user is authorized ...
  if (authorize) {
    if (!currentUser) {
      // not logged in .. redirect to login page ..
      return next({ path: '/login', query: { returnUrl: to.path } });
    }
    // check if route is restricted by role ...
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorized redirect to home
      return next({ path: '/' });
    }
  }

  // all ok .. go on
  next();
})
*/

export default router;
