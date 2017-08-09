var requestResourceNum = 0;
var receiveResourceNum = 0;
var receiveResourceSuccessNum = 0;

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

// event listen start
// costom event: loaded which client emmit self
casper.on('loaded', function(title) {
    this.echo('page title: ' + title, 'WARN_BAR');
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