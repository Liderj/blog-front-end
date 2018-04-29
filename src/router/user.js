const Login = () =>
    import ( /* webpackChunkName: "uCenter" */ "../view/uCenter/login.vue");
const Register = () =>
    import ( /* webpackChunkName: "re" */ "../view/uCenter/register.vue");
const changePwd = () =>
    import ( /* webpackChunkName: "re" */ "../view/uCenter/changePwd.vue");
const changeInfo = () =>
    import ( /* webpackChunkName: "re" */ "../view/uCenter/changeInfo.vue");
export default [{
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
    },
    {
        path: "/changePwd",
        name: "changePwd",
        meta: {
            showTop: true,
            title: "修改密码",
            requiresAuth: true
        },
        component: changePwd
    },
    {
        path: "/changeInfo",
        name: "changeInfo",
        meta: {
            showTop: true,
            title: "修改资料",
            requiresAuth: true
        },
        component: changeInfo
    }
];