import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
  path: '/',
  name: 'main',
  component: () => import('./view/home.vue'),
},
{
  path: '/test',
  name: 'test',
  component: () => import('./view/about.vue'),
}
]

export default function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
