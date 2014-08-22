var express = require('express');
var hbs = require('hbs');

var app = express();
app.engine('html', hbs.__express);
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('hello_world', {});
});

var port = process.env.OPENSHIFT_NODEJS_PORT;
var ip = process.env.OPENSHIFT_NODEJS_IP;

app.listen(port || 8080, ip);
