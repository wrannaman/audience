"use strict"
var koa          = require('koa');
var kc           = require('koa-controller');
var logger       = require('koa-logger');
var staticCache  = require('koa-static-cache');
var router       = require('koa-router');
var debug        = require('debug')('api');
var path         = require('path');
var fs           = require('fs');
var join         = path.resolve;
var readdir      = fs.readdirSync;
var app          = koa();
var react        = require('koa-react-view');
const bodyParser = require('koa-better-body');
const passport   = require('koa-passport');
var assetspath   = path.join(__dirname, 'public');
var staticCache  = require('koa-static-cache');

app.use(logger());

app.use(staticCache(assetspath));


app.use(passport.initialize());
app.use(passport.session());

app.use(kc.tools()); // optional
app.use(kc.router());

app.use(bodyParser());

app.use(function *() {
  // the parsed body will store in this.request.body
  // if nothing was parsed, body will be an empty object {}
  console.log('middle?')
  this.body = this.request.body;
});


app.listen(3000);
console.log('server start listen at 3000');
