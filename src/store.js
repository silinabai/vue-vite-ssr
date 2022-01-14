import { createStore as _createStore } from 'vuex';

export default function createStore() {
  return _createStore({
    state: {
      message: 'Hello vite2 vue3 ssr',
      age: 18
    },
    mutations: {},
    actions: {
      fetchMessage: ({ state }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            state.message = 'Hello vite2 vue3 ssr typescript scss vuex vue-router';
            resolve(state.message);
          }, 200);
        });
      },
    },
    modules: {},
  });
}