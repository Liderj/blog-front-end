import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import store from "./store";

// import "vue2-toast/lib/toast.css";

// import Toast from "vue2-toast";
// Vue.use(Toast);

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

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview, {
    fullscreenEl: false //关闭全屏按钮
})

import axios from "./http";
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    to.meta.showTop ?
        (store.commit('SHOW_TOP', to.meta.showTop)) :
        store.commit('SHOW_TOP', false);
    // this.$store.commit("SHOW_TOP", false);
    window.document.title = to.meta.title;
    const token = localStorage.getItem("v-token");
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 判断登录状态
        if (token) {
            // 继续路由
            if (!store.state.user) {
                store.dispatch('GETUSER').then().catch(e => {
                    next({ path: "/login", query: { redirect: to.fullPath } });
                })
            }
            next();
        } else {
            // 重定向到登录界面
            next({ path: "/login", query: { redirect: to.fullPath } });
        }
    } else {
        // 继续路由
        next();
    }
});
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});