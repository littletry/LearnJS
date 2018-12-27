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
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/about',
        component: (resolve) => require(['./views/about.vue'], resolve)
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

document.getElementById('app').innerHTML = 'Hello webpack';

//创建Vue根实例
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
