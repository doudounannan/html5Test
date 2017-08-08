var casper = require('casper').create({
    onAlert: function (casper, message) {
        this.echo('with alert', 'ERROR')
        this.echo(message, 'WARNING');
    }
});

var url = 'http://172.24.204.75:8080';

casper.start(url);

casper.then(function () {
    this.echo('request', 'INFO');
});

casper.run(function (argument) {
    this.echo('run', 'INFO').exit(1);
});