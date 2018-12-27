import './style.css';
//导入vue框架
import Vue from 'vue';

import VueRouter from 'vue-router';
//导入app.vue组件
import App from './app.vue';

Vue.use(VueRouter);

const Routers = [
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./views/about.vue'], resolve)
    },
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./views/user.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
];

const RouterConfig = {
    // 使用HTML5的History路由模式
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);
//修改title，在页面发生路由改变时，统一设置。
// vue-router提供了导航钩子beforeEach和afterEach，它们会在路由即将改变前和改变后触发，
// 所以设置标题可以在beforeEach钩子完成。
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});
//一个页面较长，滚动到某个位置，再跳转到另一个页面，滚动条默认是在上一个页面停留的位置，而好的体验肯定是能返回顶端。
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

document.getElementById('app').innerHTML = 'Hello webpack';

//创建Vue根实例
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
