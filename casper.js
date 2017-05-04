/**
 *  [colorizer module]
    ERROR: white text on red background
	INFO: green text
	TRACE: green text
	PARAMETER: cyan text
	COMMENT: yellow text
	WARNING: red text
	GREEN_BAR: white text on green background
	RED_BAR: white text on red background
	INFO_BAR: cyan text
	WARN_BAR: white text on orange background
 */

var casper = require('casper').create();
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
}

casper.start(testObj.url, function() {
	this.echo(this.getTitle());
	this.capture(opts.screenCaptureDirectory + 'baidu-homepage.png');
	this.echo(opts.feedback.success + testObj.type.screen + '首页', 'INFO');
});

// 天气展开和收起
casper.then(function() {
	// 天气展开
	this.mouse.click('.icon-down');
	this.wait(1000).then(function () {
		this.capture(opts.screenCaptureDirectory + 'baidu-weather-exand.png');
		this.echo(opts.feedback.success + testObj.type.screen + '首页-天气 -> 展开', 'INFO');

		// 天气收起
		this.mouse.click('.icon-weather-toggle');
		this.wait(1000).then(function () {
			this.capture(opts.screenCaptureDirectory + 'baidu-weather-collapse.png');
			this.echo(opts.feedback.success + testObj.type.screen + '首页-天气 -> 收起', 'INFO');
		});
	});

});

// TODO: 回流条
// casper.then(function () {
// 	this.mouse.click('.bf-main-style .bf-open-btn');
// 	this.wait(1000).then(function () {
// 		this.capture(opts.screenCaptureDirectory + 'baidu-backflow.png');
// 		this.echo(opts.feedback.success + testObj.type.screen + '首页-底部浮层 -> 回流', 'INFO');
// 	});
// });

casper.run();