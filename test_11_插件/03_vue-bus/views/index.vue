<template>
    <div>
        <h1>首页</h1>
        <router-link to="/about">跳转到 about</router-link>
        <br>
        {{ count }}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <button @click="handleIncrementMore">+5</button>
        <button @click="incrementObject">+10</button>
        <div>{{ list }}</div>
        <div>{{ listCount }}</div>
        <button @click="handleActionIncrement">action +1</button>
        <button @click="handleAsyncIncrement">async +1</button>
        <br>
        随机增加：
        <Counter :number="number"></Counter>
    </div>
</template>

<script>
    import Counter from "./counter.vue";
    export default {
        name: "index",
        components: {
            Counter
        },
        computed: {
            count() {
                return this.$store.state.count;
            },
            list() {
                return this.$store.getters.filteredList;
            },
            listCount() {
                return this.$store.getters.listCount;
            }
        },
        methods: {
            handleDecrease() {
                this.$store.commit('decrease');
            },
            handleIncrement() {
                this.$store.commit('increment');
            },
            handleIncrementMore() {
                this.$store.commit('increment', 5);
            },
            incrementObject() {
                this.$store.commit({
                    type: 'incrementObject',
                    count: 10
                });
            },
            handleActionIncrement() {
                this.$store.dispatch('increment');
            },
            handleAsyncIncrement() {
                this.$store.dispatch('asyncIncrement').then(() => {
                    console.log(this.$store.state.count);
                });
            },
            handleAddRandom (num) {
                this.number += num;
            }
        },
        data() {
            return {
                number: 0
            }
        },
        // vue-bus 的代码比较简单，只有不到 20 行 ， 但它却解决了跨组件通信附问题，
        // 而且通过插件的形式使用后 ， 所有组件都可以直接使用 $bus，而无须每个组件都导入 bus 组件。
        created() {
            this.$bus.on('add', this.handleAddRandom);
        },
        beforeDestroy() {
            this.$bus.off('add', this.handleAddRandom);
        }
        //使用 vue-bus有两点需要注意:
        // 第一是$bus.on应该在created钩子内使用，如果在mounted使用，它可能接收不到其他组件来自created 钩子内发出的事件;
        // 第二点是使用了$bus.on，在beforeDestroy钩子里应该再使用$bus.off解除，因为组件销毁后，就没必要把监听的句柄储存在vue-bus 里了
    }
</script>

<style scoped>

</style>
