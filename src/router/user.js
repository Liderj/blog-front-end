const Login = () =>
  import(/* webpackChunkName: "uCenter" */ "../view/uCenter/login.vue");

export default [
  {
    path: "/login",
    name: "index",
    meta: {
      title: "登录"
    },
    component: Login
  }
];
