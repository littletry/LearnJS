import './style.css';
//导入vue框架
import Vue from 'vue';
//导入vue-router
import VueRouter from 'vue-router';
//导入vuex
import Vuex from 'vuex';
//导入app.vue组件
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

//路由配置
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
    ////next()的参数设置为 false时，可以取消导航，设置为具体的路径可以导航到指定的页面。
    next();
});
//一个页面较长，滚动到某个位置，再跳转到另一个页面，滚动条默认是在上一个页面停留的位置，而好的体验肯定是能返回顶端。
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

//vuex配置
const store = new Vuex.Store({
    state: {
        count: 0,
        list: [1, 5, 8, 10, 30, 50]
    },
    getters: {
        filteredList: state => {
            return state.list.filter(item => item < 10);
        },
        listCount: (state, getters) => {
            return getters.filteredList.length;
        }
    },
    //在组件内，来自 store 的数据只能读取，不能手动改变，改变 store 中数据的唯一途径就是显式 地提交 mutations。
    mutations: {
        increment(state, n = 1) {
            state.count += n;
        },
        decrease(state) {
            state.count--;
        },
        //当一个参数不够用时，可以传入一个对象，无限扩展 。
        //提交 mutation 的另一种方式是直接使用包含 type属性的对象,比如
        incrementObject(state, params) {
            state.count += params.count;
        }
    },
    //上一节提到， mutation里不应该异步操作数据，所以有了 actions选项。
    //action与 mutation很像， 不同的是 action 里面提交的是 mutation， 井且可 以异步操作业务逻辑 。
    actions: {
        increment(context) {
            context.commit('increment');
        },
        asyncIncrement(context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment');
                    resolve();
                }, 1000)
            });
        }
    }
});

document.getElementById('app').innerHTML = 'Hello webpack';

//创建Vue根实例
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
