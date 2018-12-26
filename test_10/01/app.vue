<template>
    <div>
        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
    </div>
</template>

<script>
    //导入组件
    import vTitle from './title.vue';
    import vButton from './button.vue';

    export default {
        //对象字面量缩写。当对象的key和value名称一致时，可以缩写成一个。
        components: {
            vTitle,
            vButton
        },
        methods: {
            handleClick(e) {
                console.log(e);
            }
        },
        data() {
            return {
                name: 'Vue.js'
            }
        }
    }
</script>

<style scoped>
    div{
        color: #f60;
        font-size: 24px;
    }
</style>
