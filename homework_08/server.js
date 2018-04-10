process.stdout.write('What are you waiting for? \n');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/rockstars', routes);
app.use('/rockstar', routes);

app.use(function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(3000, function () {
    console.log('App listening on port 3000.');
});