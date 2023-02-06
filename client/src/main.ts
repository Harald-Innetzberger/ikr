import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import createVuetify from './plugins/vuetify';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
const toastifyOpts = {
  autoClose: 6000,
  position: 'bottom-right',
  theme: 'dark',
};

app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(createVuetify);
app.use(router);
app.use(Vue3Toastify, toastifyOpts);

app.mount('#app');
