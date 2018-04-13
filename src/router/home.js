const Home = () => import(/* webpackChunkName: "Home" */ "../view/home");

export default [
  {
    path: "/",
    name: "index",
    meta: {
      title: "首页"
    },
    component: Home
  }
];
