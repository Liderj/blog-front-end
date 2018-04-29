const Home = () =>
    import ( /* webpackChunkName: "Home" */ "../view/home/index.vue");
const Post = () =>
    import ( /* webpackChunkName: "Home" */ "../view/home/post.vue")

export default [{
        path: "/",
        name: "index",
        meta: {
            showTop: true,
            title: "首页",
            requiresAuth: true
        },
        component: Home
    },
    {
        path: "/post/:id",
        name: "post",
        meta: {
            showTop: true,
            title: "文章详情",
            requiresAuth: true
        },
        component: Post
    }
];