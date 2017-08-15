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

casper.test.begin(testParamsObj.webPageName + ' 测试', 4, function suite(test) {
    casper.start(testParamsObj.url, function () {
        this.viewport(testParamsObj.deviceParams.width, testParamsObj.deviceParams.height);
        this.options.clientScripts = ['lib/jquery2.0.2.min.js'];

        // homepage capture
        this.echo('@截图 [首页]', 'PARAMETER');
        this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-homepage.png', captureObject);

        test.assertExists('.icon-down', '#可以# 打开天气');
    });

    // weather open & capture
    casper.then(function() {
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

    casper.then(function () {
        this.scrollToBottom();
            this.wait(1000);
    });

    casper.then(function () {
            this.echo('scroll');
            this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-scroll.png', captureObject);
    });

    casper.run(function() {
        this.capture(testParamsObj.captureDirectory + (testParamsObj.captureIndex++) + testParamsObj.webPageName + '-end.png', captureObject);

        test.done();
    });
});