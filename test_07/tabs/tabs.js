Vue.component('tabs', {
    template: '\
        <div class="tabs">\
            <div class="tabs-bar">\
                <!--标签页标题，这里要用v-for -->\
            </div>\
            <div class="tabs-content">\
                <!--这里的slot就是嵌套的pane-->\
                <slot></slot>\
            </div>\
        </div>'
});
