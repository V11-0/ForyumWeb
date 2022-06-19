import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

import router from './router/Router';

const pinia = createPinia();

loadFonts();

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .mount('#app');
