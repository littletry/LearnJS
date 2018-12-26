import './style.css';
//导入vue框架
import Vue from 'vue';
//导入app.vue组件
import App from './app.vue';

document.getElementById('app').innerHTML = 'Hello webpack';

//创建Vue根实例
new Vue({
    el: '#app',
    render: h => h(App)
});
