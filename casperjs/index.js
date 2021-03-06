var dump = require('utils').dump;

var testParamsObj = {
    url: casper.cli.options.url || 'https://m.baidu.com',
    webPageName: casper.cli.options.name || '百度首页',
    captureDirectory: 'captureRepo/',
    captureIndex: 1,
    waitMSecond: 1500,
    // iphone 5s
    deviceParams: {
        width: 320,
        height: 568
    },
    nsPositionTop: 0,
    feedPositionTop: 0
};

var captureObject = {
    top: 0,
    left: 0,
    width: testParamsObj.deviceParams.width,
    height: testParamsObj.deviceParams.height
};

casper.test.begin(testParamsObj.webPageName + ' 测试', 13, function suite(test) {
    casper.start(testParamsObj.url, function () {
        this.viewport(testParamsObj.deviceParams.width, testParamsObj.deviceParams.height);
        this.options.clientScripts = ['lib/jquery2.0.2.min.js'];

        // homepage capture
        this.echo('@截图 [首页]', 'PARAMETER');
        this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-homepage.png', captureObject);
    });

    // weather open & capture
    casper.then(function() {
        test.assertExists('.icon-down', '#可以# 打开天气');
        this.mouse.click('.icon-down');

        this.wait(testParamsObj.waitMSecond, function() {
            this.echo('@截图 [天气]-打开', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-weather-open.png', captureObject);
        });
    });

    // weather close & capture
    casper.waitForSelector('.icon-weather-toggle', function() {
        test.assertExists('.icon-weather-toggle', '#可以# 关闭天气');
        casper.then(function() {
            this.mouse.click('.icon-weather-toggle');
            this.wait(testParamsObj.waitMSecond, function() {
                this.echo('@截图 [天气]-关闭', 'PARAMETER');
                this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-weather-close.png', captureObject);
                // test.assertExists('#index-kw', '#可以# 输入搜索关键字');
            });
        });
    });

    // jump search page & capture & back
    // casper.thenEvaluate(function(kw) {
    //     document.querySelector('input[name="word"]').setAttribute('value', kw);
    //     document.querySelector('form').submit();
    // }, 'Jeniffer Aniston');

    // casper.then(function () {
    //     this.echo('@截图 [搜索]-输入搜索关键字', 'PARAMETER');
    //     this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-search-jump.png', captureObject);

    //     this.back();

    //     this.wait(testParamsObj.waitMSecond, function() {
    //         this.echo('@截图 [搜索]-返回首页', 'PARAMETER');
    //         this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-search-back.png', captureObject);
    //     });
    // });

    // ns navigator
    casper.then(function() {
        test.assertExists('.ns-swipe-wrap', '#可以# 滑动ns导航');

        testParamsObj.nsPositionTop = this.evaluate(function() {
            return $('.ns-swipe-wrap').offset().top;
        });

        casper.test.assertNotEquals(testParamsObj.nsPositionTop, 0, '%位置正确% ns导航');

        this.mouse.down('.ns-swipe-wrap');
        this.mouse.move(testParamsObj.deviceParams.width / 2, testParamsObj.nsPositionTop);
    });

    casper.then(function() {
        this.mouse.up(testParamsObj.deviceParams.width / 2, testParamsObj.nsPositionTop);

        this.wait(testParamsObj.waitMSecond, function() {
            this.echo('@截图 [ns导航]-滑动', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-ns-swipe.png', captureObject);
        });
    });

    // TODO: scroll 页面没有跟随向上
    // 多tab 展现 && 底部 刷新 && 切换到 *娱乐* tab
    casper.then(function () {
        test.assertExists('.menu-container', '#可以# 展现多tab');
        testParamsObj.feedPositionTop = this.evaluate(function() {
            return $('.blank-frame').offset().top;
        });
        casper.test.assertNotEquals(testParamsObj.feedPositionTop, 0, '%位置正确% 多tab');
        this.scrollToBottom();
        this.wait(testParamsObj.waitMSecond);
    });

    casper.then(function () {
        this.echo('@截图 [多tab] 展现 && [底部] 刷新', 'PARAMETER');
        this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-show-multi-tab&bottom-load.png', captureObject);
    });

    casper.then(function() {
        test.assertExists('#menu-item-3', '#可以# 切换到 *娱乐* tab');
        this.mouse.click('#menu-item-3');

        this.wait(testParamsObj.waitMSecond, function () {
            this.echo('@截图 [多tab]-切换到娱乐', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-tab-switch.png', captureObject);
        })
    });

    // landingpage click
    // 图集落地页
    casper.then(function() {
        test.assertExists('.rn-typeLargePics', '#可以# 点击图集落地页');
        this.mouse.click('.rn-typeLargePics');

        this.wait(testParamsObj.waitMSecond, function () {
            this.echo('@截图 [落地页]-图集-打开', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-image-landing-open.png', captureObject);
        });
    });

    // 回到首页
    casper.then(function() {
        test.assertExists('.sf-back', '#可以# 返回首页');
        this.mouse.click('.sf-back');
        this.wait(testParamsObj.waitMSecond, function () {
            this.echo('@截图 [落地页]-图集-回到首页', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-image-landing-back.png', captureObject);
        });
    });

    // 图文落地页
    casper.then(function() {
        test.assertExists('.rn-typeNewsOne', '#可以# 点击图文落地页');
        this.mouse.click('.rn-typeNewsOne');

        this.wait(testParamsObj.waitMSecond, function () {
            this.echo('@截图 [落地页]-图文-打开', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-text-landing-open.png', captureObject);
        });
    });

    // 回到首页
    casper.then(function() {
        test.assertExists('.sf-back', '#可以# 返回首页');
        this.mouse.click('.sf-back');
        this.wait(testParamsObj.waitMSecond, function () {
            this.echo('@截图 [落地页]-图文-回到首页', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-text-landing-back.png', captureObject);
        });
    });

    // 视频落地页
    casper.then(function() {
        test.assertExists('.rn-typeLargeVideo', '#可以# 点击视频落地页');
        this.mouse.click('.rn-typeLargeVideo');

        this.wait(testParamsObj.waitMSecond, function () {
            this.echo('@截图 [落地页]-视频-打开', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-video-landing-open.png', captureObject);
        });
    });

    // 回到首页
    casper.then(function() {
        test.assertExists('.sf-back', '#可以# 返回首页');
        this.mouse.click('.sf-back');
        this.wait(testParamsObj.waitMSecond, function () {
            this.echo('@截图 [落地页]-视频-回到首页', 'PARAMETER');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-video-landing-back.png', captureObject);
        });
    });

    // TODO: top loading

    casper.run(function() {
        this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-end.png', captureObject);

        test.done();
    });
});