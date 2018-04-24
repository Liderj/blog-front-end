import axios from "axios";
import router from "../router";
import vuetifyToast from "vuetify-toast";
import store from '../store'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `bearer ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        const data = response.data;
        if (data.code != 200) {
            switch (data.code) {
                case 405:
                    // 401 清除token信息并跳转到登录页面
                    router.replace({
                        path: "/login",
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
            }
            vuetifyToast.error(data.message);
            // return Promise.reject(data.message);
        }
        return data;
    },
    error => {
        return Promise.reject(error);
    }
);
export default axios;