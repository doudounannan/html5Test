var requestResourceNum = 0;
var receiveResourceNum = 0;
var receiveResourceSuccessNum = 0;
var captureIndex = 1;

var dump = require('utils').dump;

var url = casper.cli.options.url || 'https://m.baidu.com';
var webpageName = casper.cli.options.name || 'baidu';
var captureDirectory = 'captureRepo/';

casper.test.begin(url + ' is navigable', 2, function suite(test) {
    casper.start(url, function () {

    });

    // homepage capture
    casper.then(function () {
        this.capture(captureDirectory + (captureIndex++) + webpageName + '-homepage.png');
    });

    // weather open & capture
    casper.thenClick('.icon-down', function() {
        this.wait(500, function() {
            this.capture(captureDirectory + (captureIndex++) + webpageName + '-weather-open.png');
        });
    });

    // weather close & capture
    casper.thenClick('.icon-weather-toggle', function () {
        this.wait(500, function() {
            this.capture(captureDirectory + (captureIndex++) + webpageName + '-weather-close.png');
        });
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

        test.done();
    });
});