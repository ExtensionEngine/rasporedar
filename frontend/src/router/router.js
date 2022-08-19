import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const routes = [
  {
    path: '/home2',
    name: 'home2',
    component: () => import('@/views/HomePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutPage.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthPage.vue'),
  },
  {
    path: '/timetables',
    name: 'timetables',
    component: () => import('@/views/TimetableView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    alias: ['/home', '/timetable-generator'],
    name: 'home',
    component: () => import('@/views/TimeTableGeneratorView.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(to => {
  const { isLoggedIn } = useUserStore();
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'auth' };
  }
  if (to.name === 'auth' && isLoggedIn) {
    return { name: 'home' };
  }
});

export default router;
