import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/lobby/',
    component: () => import('pages/Index.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/room/:id',
    name: 'room',
    component: () => import('pages/room.vue'),
    children: [{ path: '', component: () => import('pages/room.vue') }],
  },
  {
    path: '/',
    component: () => import('pages/landingPage.vue'),
    children: [{ path: '', component: () => import('pages/landingPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
