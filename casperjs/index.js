var dump = require('utils').dump;

var testParamsObj = {
    url: casper.cli.options.url || 'https://m.baidu.com',
    webPageName: casper.cli.options.name || '百度首页',
    captureDirectory: 'captureRepo/',
    captureIndex: 1,
    waitMSecond: 1500,
    deviceParams: {
        width: 320,
        height: 480
    },
    nsPositionTop: 0,
    feedPositionTop: 0
};

casper.test.begin(testParamsObj.webPageName + ' 测试', 4, function suite(test) {
    casper.start(testParamsObj.url, function () {
        this.viewport(testParamsObj.deviceParams.width, testParamsObj.deviceParams.height);
        this.options.clientScripts = ['lib/jquery2.0.2.min.js'];

        // homepage capture
        this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-homepage.png');

        test.assertExists('.icon-down', '#可以# 打开天气');
    });

    // weather open & capture
    casper.thenClick('.icon-down', function() {
        this.wait(testParamsObj.waitMSecond, function() {
            this.echo('@截图 [天气]-打开', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-weather-open.png');
        });
    });

    // weather close & capture
    casper.waitForSelector('.icon-weather-toggle', function() {
        test.assertExists('.icon-weather-toggle', '#可以# 关闭天气');
        casper.thenClick('.icon-weather-toggle', function () {

            this.wait(testParamsObj.waitMSecond, function() {
                this.echo('@截图 [天气]-关闭', 'PARAMETER');
                this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-weather-close.png');

                test.assertExists('#index-kw', '#可以# 输入搜索关键字');
            });
        });
    });

    // jump search page & capture & back
    casper.thenEvaluate(function(kw) {
        document.querySelector('input[name="word"]').setAttribute('value', kw);
        document.querySelector('form').submit();
    }, 'Jeniffer Aniston');

    casper.then(function () {
        this.echo('@截图 [搜索]-输入搜索关键字', 'PARAMETER');
        this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-search-jump.png');

        this.back();

        this.wait(testParamsObj.waitMSecond, function() {
            this.echo('@截图 [搜索]-返回首页', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-search-back.png');
        });
    });

    // ns navigator
    casper.then(function() {
        test.assertExists('.ns-swipe-wrap', '#可以# 滑动ns导航');

        this.mouse.down('.ns-swipe-wrap');

        testParamsObj.nsPositionTop = this.evaluate(function() {
            return $('.ns-swipe-wrap').offset().top;
        });

        casper.test.assertNotEquals(testParamsObj.nsPositionTop, 0, '%位置正确% ns导航');

        this.mouse.move(testParamsObj.deviceParams.width / 2, testParamsObj.nsPositionTop);
    });

    casper.then(function() {
        this.mouse.up(testParamsObj.deviceParams.width / 2, testParamsObj.nsPositionTop);

        this.wait(testParamsObj.waitMSecond, function() {
            this.echo('@截图 [ns导航]-滑动', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-ns-swipe.png');
        });
    });

    // show multi-tab
    casper.then(function () {
        test.assertExists('.menu-container', '#可以# 展现多tab');
        testParamsObj.feedPositionTop = this.evaluate(function() {
            return $('.blank-frame').offset().top;
        });
        casper.test.assertNotEquals(testParamsObj.feedPositionTop, 0, '%位置正确% 多tab');
        this.scrollTo(0, testParamsObj.feedPositionTop);
        this.wait(testParamsObj.waitMSecond, function() {
            this.echo('@截图 [多tab] 展现', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-show-multi-tab.png');

            test.assertExists('#menu-item-3', '#可以# 切换到 *娱乐* tab');
        });
    });

    // multi-tab switch
    casper.thenClick('#menu-item-3', function() {
        this.wait(testParamsObj.waitMSecond * 3, function() {
            this.echo('@截图 [多tab]-切换到娱乐', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-tab-switch.png');
        });
    });

    // TODO: top & bottom loading
    // TODO bottom loading
    casper.then(function() {
        this.scrollToBottom();
        this.wait(testParamsObj.waitMSecond, function() {
            this.echo('@截图 [底部] 刷新', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-waterfall.png');
        });
    });
    // TODO: 测试接口

    // TODO: landingpage click
    // TODO: interface test

    casper.run(function() {
        this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-end.png');

        test.done();
    });
});