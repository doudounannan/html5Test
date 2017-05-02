/**
 * test case
 * by zhengmeiyu@baidu.com
 */
var testObj = Object.create();
// test URL
testObj.url = 'https://m.baidu.com';

var page = require('webpage').create();

// first screen capture + load time
page.open(testObj.url, function(status) {
  console.log("first screen start");

  if(status === "success") {
    page.render('screenCapture/baidu-first_screen_capture.png');
  }

  console.log("first screen end");
  phantom.exit();
});