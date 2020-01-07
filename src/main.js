// =========================================================
// * Vuetify Material Dashboard PRO - v1.0.3
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import './plugins/axios'
import './plugins/global-functions'
import './plugins/toasted'
import './plugins/vue-lodash'
import './plugins/vue-country-flag'
import './plugins/google-maps'
import './plugins/vue-progressbar'

import './filters/time'
import './filters/money'

import vuetify from './plugins/vuetify'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
