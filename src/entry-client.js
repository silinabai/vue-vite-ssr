import { createSSRApp } from 'vue';
import App from './App.vue';
import createStore from './store';
import createRouter from './router';
import { sync } from 'vuex-router-sync';

const store = createStore();
const router = createRouter();
sync(store, router);

const app = createSSRApp(App);
app.use(router).use(store);

router.beforeResolve((to, from, next) => {
  next();
});

router.isReady().then(() => {
  app.mount('#app', true);
});
