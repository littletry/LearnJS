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
    </div>
</template>

<script>
    export default {
        name: "index",
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
            }
        }
    }
</script>

<style scoped>

</style>
