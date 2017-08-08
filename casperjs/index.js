var casper = require('casper').create({
    // set iphone 5s device size
    viewportSize: {
        width: 320,
        height: 480
    },
    verbose: true,
    pageSettings: {

    },
    clientScripts: [],
    remoteScripts: [],
    // TODO: why? initailize 3 times
    onPageInitialized: function (page) {
        this.echo('page initialize', 'INFO');
    },
    onResourceRequested: function (casper, resource) {
        this.echo('Resource request: [' + resource.method + '] ' + resource.url, 'PARAMETER');
    },
    // TODO: why? receive 2 times
    onResourceReceived: function (casper, resource) {
        this.echo('Resource response: [' + resource.status + '] ' + resource.url, 'PARAMETER');
    },
    httpStatusHandlers: {
        200: function (casper, res) {
            // this.echo(Object.keys(res));
        }
    },
    onAlert: function (casper, message) {
        this.echo('has alert', 'ERROR');
        this.echo(message, 'WARNING');
    },
    onError: function (casper, message, backtrace) {
        this.echo('has error', 'ERROR');
        this.echo(message, 'WARNING');
        this.echo(backtrace, 'WARNING');
    },
    onLoadError: function (casper, url, status) {
        this.echo('has load error', 'ERROR');
        this.echo(url, 'WARNING');
        this.echo(status, 'WARNING');
    }
});

var url = 'http://192.168.199.244:8080';
// var url = 'https://m.baidu.com';

casper.start(url);

casper.then(function () {
    // this.echo('request', 'INFO');
    // this.capture('./then.png');
});

casper.run(function () {
    // this.capture('./test.png');
    this.echo('run', 'COMMENT').exit(1);
});