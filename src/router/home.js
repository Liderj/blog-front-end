const Home = () =>
    import ( /* webpackChunkName: "Home" */ "../view/home");

export default [{
    path: "/",
    name: "index",
    meta: {
        showTop: true,
        title: "首页",
        requiresAuth: true
    },
    component: Home
}];