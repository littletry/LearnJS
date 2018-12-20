const app = new Vue({
    el: '#app',
    data: {
        timeNow: new Date().getTime(),
        // timeNow: 1544868334000,
        timeBefore: 1488930695721
    }
});
/*timeNow 是目前的时间， timeBefore 是一个写死的时间 : 2017-03-08。*/
