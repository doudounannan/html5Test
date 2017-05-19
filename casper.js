var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug'
});

var mouse = require("mouse").create(casper);

var opts = {
	// 截图目录
	screenCaptureDirectory: 'screenCapture/',
	// 反馈
	feedback: {
		success: '[success]',
		warning: '[warning]',
		error: '[error]'
	}
};

var testObj = Object.create(null);
// 测试url
testObj.url = 'https://m.baidu.com/';
// 测试种类
testObj.type = {
	// 截图
	screen: ' 截图 - '
};

casper.start(testObj.url, function() {
	this.emit('baidu.loaded');
});

casper.on('baidu.loaded', function() {
	casper.log('baidu loaded');
	casper.log(this.getTitle());
	this.capture(opts.screenCaptureDirectory + 'baidu-homepage.png');
	casper.log(opts.feedback.success + testObj.type.screen + '首页', 'info');
	this.waitForSelector('form[id="index-form"]');
});

// 天气展开和收起
casper.then(function() {
	// 天气展开
	this.mouse.click('.icon-down');
	this.wait(1000).then(function () {
		this.capture(opts.screenCaptureDirectory + 'baidu-weather-exand.png');
		casper.log(opts.feedback.success + testObj.type.screen + '首页-天气 -> 展开', 'info');

		// 天气收起
		this.mouse.click('.icon-weather-toggle');
		this.wait(1000).then(function () {
			this.capture(opts.screenCaptureDirectory + 'baidu-weather-collapse.png');
			casper.log(opts.feedback.success + testObj.type.screen + '首页-天气 -> 收起', 'info');
		});
	});

});

// 落地页-图文
casper.then(function() {
	this.mouse.click('.tpl-3');
	this.wait(1000).then(function () {
		this.capture(opts.screenCaptureDirectory + 'baidu-landing-text.png');
		casper.log(opts.feedback.success + testObj.type.screen + '首页-落地页 -> 图文', 'info');
		this.mouse.click('.sf-back');
		this.wait(1000).then(function () {
			this.capture(opts.screenCaptureDirectory + 'baidu-landing-text-back.png');
			casper.log(opts.feedback.success + testObj.type.screen + '首页-落地页 -> 图文-返回首页', 'info');
		});
	});
});

// 搜索
casper.then(function() {
   this.fill('form[id="index-form"]', { word: '百度' }, true);
   this.capture(opts.screenCaptureDirectory + 'baidu-search-input.png');
   casper.log(opts.feedback.success + testObj.type.screen + '首页-搜索 -> 输入', 'info');
});

casper.run();