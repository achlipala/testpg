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

if (process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD) {
  connection_string = "postgres://"
        + process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME + ":" +
        process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_POSTGRESQL_DB_HOST + ':' +
        process.env.OPENSHIFT_POSTGRESQL_DB_PORT + '/test2';
}

console.error("Postgres on " + connection_string);

var pg = require('pg');
var db = new pg.Client(connection_string);
db.connect(function(err) {
  if (err) {
    return console.error('Could not connect to Postgres: ', err);
  }
});

function stuff(req, res) {
    db.query('SELECT * FROM foo', function(err, result) {
        if (err)
            console.error('Postgres query error: ', err);
        else {
            res.render('stuff', {
                "stuff" : result.rows
            });
        }
    });
};

app.get('/stuff', stuff);

app.get('/new', function(req, res) {
    db.query('INSERT INTO foo(bar) VALUES ($1)',
             [req.param('name')],
             function(err, result) {
                 if (err)
                     console.error('Postgres insert error: ', err);
                 else
                     stuff(req, res);
             });
});
