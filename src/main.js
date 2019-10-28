import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { ClientTable } from 'vue-tables-2';
import VueFilterDateFormat from 'vue-filter-date-format';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueFilterDateFormat);
Vue.use(BootstrapVue);
Vue.use(ClientTable, { useVuex: true, theme: 'bootstrap4' });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
