let Time = {
    //获取当前时间戳
    getUnix: function () {
        let date = new Date();
        return date.getTime();
    },
    //获取今天0点0分0秒的时间戳
    getTodayUnix: function () {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获取今年1月1日0点0时0分0秒的时间戳
    getYearUnix: function () {
        let date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获取标准年月日
    getLastDate: function (time) {
        let date= new Date(time);
        let month= date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let day= date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },
    //转换时间
    getFormatTime: function (timestamp) {
        //当前时间戳
        let now = this.getUnix();
        //今天0点时间戳
        let today = this.getTodayUnix();
        //今年0点时间戳
        let year = this.getYearUnix();
        //转换为秒级时间戳
        let timer = (now - timestamp) / 1000;
        let tip = '';
    /* 1分钟以前，显示“刚刚”。
     * 1分钟~1小时之间，显示“xx分钟前”。
     * 1小时~1天之间，显示“xx小时前”。
     * 1天~1个月(31天)之间，显示“xx天前”。
     * 大于1个月，显示"xx年xx月xx曰"。*/
        if (timer <= 0) {
            tip = '刚刚';
        } else if (Math.floor(timer/60) <= 0) {
            tip = '刚刚';
        } else if (timer < 3600){
            tip = Math.floor(timer/60) + '分钟前';
        } else if (timer >= 3600 && (timestamp - today >= 0)) {
            tip = Math.floor(timer/3600) + '小时前';
        } else if (timer / 86400 <= 31) {
            tip = Math.ceil(timer/86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
};
/*  在bind钩子里，将指令v-time表达式的值binding.value作为参数传入Time.getFormatTime()方法得到格式化时间，
    再通过el.innerHTML写入指令所在元素。定时器el.__timeout__每分钟触发一次，更新时间，并且在unbind钩子里清除掉。*/
Vue.directive('time', {
   bind: function (el, binding) {
       el.innerHTML = Time.getFormatTime(binding.value);
       el.__timeout__ = setInterval(function () {
           el.innerHTML = Time.getFormatTime(binding.value);
       }, 6000);
   },
    unbind: function (el) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
});
/*  总结:在编写自定义指令时，给DOM绑定一次性事件等初始动作，建议在bind钩子内完成，同时要在 unbind 内解除相关绑定。
    在自定义指令里，理论上可以任意操作DOM，但这又违背Vue.js的初衷，所以对于大幅度的DOM变动，应该使用组件。*/
