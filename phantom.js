/**
 * test case
 * by zhengmeiyu@baidu.com
 */
var testObj = Object.create(null);
// test URL
testObj.url = 'https://m.baidu.com';

var page = require('webpage').create();

// third party library: console colors
var colors = require('colors');

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

// 开始时间
var startTime = Date.now();

// first screen capture + load time start
page.onResourceRequested = function(request) {
	console.log('Request ' + JSON.stringify(request, undefined, 4));
};

page.onResourceReceived = function(response) {
	console.log('Receive ' + JSON.stringify(response, undefined, 4));
};

page.open(testObj.url, function(status) {
	console.log('\nFirst screen start:'.debug);

	if(status === 'success') {
		console.log('Loading time ' + (Date.now() - startTime) + ' msec');
		page.render('screenCapture/baidu-homepage.png');
		console.log('[Success] '.info + ' to generate first screen capture.');
	} else {
	  	console.log('[FAIL]'.error + ' to load the address!');
	}

	console.log('First screen end!\n'.debug);

	phantom.exit();
});
// first screen capture + load time start