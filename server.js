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

var connection_string = "postgres://localhost/openshift";

if (process.env.OPENSHIFT_POSTGRES_DB_PASSWORD) {
  connection_string = "postgres://"
        + process.env.OPENSHIFT_POSTGRES_DB_USERNAME + ":" +
        process.env.OPENSHIFT_POSTGRES_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_POSTGRES_DB_HOST + ':' +
        process.env.OPENSHIFT_POSTGRES_DB_PORT + '/openshift';
}

console.error("Postgres on " + connection_string);
