const Login = () =>
  import(/* webpackChunkName: "uCenter" */ "../view/uCenter/login.vue");
const Register = () =>
  import(/* webpackChunkName: "re" */ "../view/uCenter/register.vue");
export default [
  {
    path: "/login",
    name: "index",
    meta: {
      title: "登录"
    },
    component: Login
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "注册"
    },
    component: Register
  }
];
