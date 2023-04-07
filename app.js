'use strict';

const PORT = 3000;

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var routes = require('./routes/dex')

var publicDir = (__dirname + '/public');

app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

//server.listen(80, 'localhost);
app.listen(PORT, () => { console.log("MY API RUNNING!!")});