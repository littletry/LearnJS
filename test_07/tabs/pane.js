Vue.component('pane', {
    name: 'pane',
    template: '\
        <div class="pane" v-show="show">\
            <slot></slot>\
        </div>',
    data: function () {
        /*pane需要控制标签页内容的显示与隐藏，设置一个data: show，井且用v-show指令来控制元素*/
        return {
            show: true
        }
    }
});
