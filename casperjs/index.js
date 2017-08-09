var requestResourceNum = 0;
var receiveResourceNum = 0;
var receiveResourceSuccessNum = 0;
var captureIndex = 1;

var dump = require('utils').dump;

var casper = require('casper').create({
    // set iphone 5s device size
    // TODO: height dont work
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
        // this.echo('Page initialize', 'INFO');
    },
    onResourceRequested: function (casper, resource) {
        requestResourceNum++;
        // this.echo('Resource request: [' + resource.method + '] ' + resource.url, 'PARAMETER');
        // this.echo('---------- REQUEST ----------', 'COMMENT');
    },
    // TODO: why? receive 2 times
    onResourceReceived: function (casper, resource) {
        receiveResourceNum++;
        if (resource.status === 200) {
            receiveResourceSuccessNum++;
        }
        // this.echo('Resource response: [' + resource.status + '] ' + resource.url, 'PARAMETER');
        // this.echo('========== RECEIVE ==========', 'COMMENT');
    },
    httpStatusHandlers: {
        200: function (casper, res) {
            // this.echo(Object.keys(res));
        }
    },
    onStepComplete: function (casper, stepResult) {
        if (stepResult) {
            this.echo('[done] ' + (stepResult || 'none-operation') + '', 'PARAMETER');
        }
    },
    onAlert: function (casper, message) {
        this.echo('Has alert', 'ERROR');
        this.echo(message, 'WARNING');
    },
    onError: function (casper, message, backtrace) {
        this.echo('Has error', 'ERROR');
        this.echo(message, 'WARNING');
        this.echo(backtrace, 'WARNING');
    },
    onLoadError: function (casper, url, status) {
        this.echo('Has load error', 'ERROR');
        this.echo(url, 'WARNING');
        this.echo(status, 'WARNING');
    }
});

// dump(casper.cli.options);

var url = casper.cli.options.url || 'https://m.baidu.com';
var webpageName = casper.cli.options.name || 'baidu';
var captureDirectory = 'captureRepo/';

// event listen start
casper.on('loaded', function(title) {
    this.echo(webpageName + ' page title: ' + title, 'WARN_BAR');
});

casper.on('http.status.200', function(resource) {
    this.echo('[OK] ' + resource.url, 'INFO');
});

casper.on('http.status.301', function(resource) {
    this.echo('[Permanently redirected] ' + resource.url, 'PARAMETER');
});

casper.on('http.status.302', function(resource) {
    this.echo('[Temporarily redirected] ' + resource.url, 'PARAMETER');
});

casper.on('http.status.404', function(resource) {
    this.echo('[Not found] ' + resource.url, 'COMMENT');
});

casper.on('http.status.500', function(resource) {
    this.echo('[Server error] ' + resource.url, 'ERROR');
});
// event listen end

casper.start(url, function () {
    this.emit('loaded', this.getTitle());

    return 'start: ' + url;
});

// homepage capture
casper.then(function () {
    this.capture(captureDirectory + (captureIndex++) + webpageName + '-homepage.png');

    return '『homepage』capture';
});

// weather open & capture
casper.then(function () {
    this.click('.icon-down');

    this.wait(500, function() {
        this.capture(captureDirectory + (captureIndex++) + webpageName + '-weather-open.png');
    });

    return '『weather』open & capture';
});

// weather close & capture
casper.then(function () {
    this.click('.icon-weather-toggle');

    this.wait(500, function() {
        this.capture(captureDirectory + (captureIndex++) + webpageName + '-weather-close.png');
    });

    return '『weather』close & capture';
});

// jump search page & capture & back
casper.thenEvaluate(function(kw) {
    document.querySelector('input[name="word"]').setAttribute('value', kw);
    document.querySelector('form').submit();
}, 'Jeniffer Aniston');

casper.then(function () {
    this.capture(captureDirectory + (captureIndex++) + webpageName + '-search-jump.png');
    this.back();
    this.wait(500, function() {
        this.capture(captureDirectory + (captureIndex++) + webpageName + '-search-back.png');
    });

    return '『search』jump -> capture & back -> capture';
});

// TODO: ns navigator
// TODO: multi-tab switch
// TODO: top & bottom loading
// TODO: landingpage click
// TODO: interface test

casper.run(function () {
    this.capture(captureDirectory + (captureIndex++) + webpageName + '-end.png');
    this.echo('********** Result **********', 'WARN_BAR');

    // resource request status start
    this.echo('Resource request & receive status:', 'INFO');

    if (requestResourceNum === receiveResourceSuccessNum) {
        this.echo('Receive resource amount/Request resource amount: ' + receiveResourceSuccessNum + '/' + requestResourceNum, 'PARAMETER');
    } else {
        this.echo('Receive resource amount/Request resource amount: ' + receiveResourceSuccessNum + '/' + requestResourceNum, 'WARNING');
    }

    this.echo('Resource receive & success receive status:', 'INFO');

    if (receiveResourceNum === receiveResourceSuccessNum) {
        this.echo('Receive success resource amount/Receive resource amount: ' + receiveResourceSuccessNum + '/' + receiveResourceNum, 'PARAMETER');
    } else {
        this.echo('Receive success resource amount/Receive resource amount: ' + receiveResourceSuccessNum + '/' + receiveResourceNum, 'WARNING');
    }
    // resource request status end

    this.echo('########## End ##########', 'GREEN_BAR').exit(1);
});