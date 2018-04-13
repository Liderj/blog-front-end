import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify, {
  theme: {
    primary: "#2196F3",
    secondary: "#03A9F4",
    accent: "#00BCD4",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
