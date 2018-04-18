import Vue from "vue";
import Router from "vue-router";

import app from "./home";

import user from "./user";

Vue.use(Router);

const router = new Router({
  routes: [...app, ...user]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("v-token");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断登录状态
    if (token) {
      // 继续路由
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
export default router;
