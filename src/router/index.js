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
export default router;
