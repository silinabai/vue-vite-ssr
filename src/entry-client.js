import { createSSRApp } from 'vue';
import App from './App.vue';
import createStore from './store';
import createRouter from './router';

const store = createStore();
const router = createRouter();

const app = createSSRApp(App);
app.use(router).use(store);

router.beforeResolve((to, from, next) => {
  next();
});

router.isReady().then(() => {
  app.mount('#app', true);
});

if (window.__INITIAL_STATE__) {   store.replaceState(window.__INITIAL_STATE__); }

