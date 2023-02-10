import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import createVuetify from './plugins/vuetify';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);

const pinia = createPinia();
const toastifyOpts = {
  autoClose: 3000,
  position: 'bottom-right',
  theme: 'dark',
};

app.use(VueAxios, { $myHttp: axios });
app.provide('$myHttp', app.config.globalProperties.$myHttp); // provide 'axios'
app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(createVuetify);
app.use(router);
app.use(Vue3Toastify, toastifyOpts);

app.mount('#app');
