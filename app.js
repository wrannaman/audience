"use strict"
var koa          = require('koa');
var kc           = require('koa-controller');
var logger       = require('koa-logger');
var staticCache  = require('koa-static-cache');
var router       = require('koa-route');
var debug        = require('debug')('api');
var path         = require('path');
var fs           = require('fs');
var join         = path.resolve;
var readdir      = fs.readdirSync;
var app          = koa();
var react        = require('koa-react-view');
var koaBody      = require('koa-body');
var passport     = require('koa-passport');
var assetspath   = path.join(__dirname, 'public');
var staticCache  = require('koa-static-cache');
var parse = require('co-body');
app.use(logger());
app.use(staticCache(assetspath));
app.use(passport.initialize());
app.use(passport.session());
app.use(koaBody({
    formidable: { uploadDir: __dirname },
    multipart: true,
}));
app.use(function *(next) {
  if (this.request.method == 'POST') {
    //console.log('req body',this.request.body);
    // => POST body
    this.body = JSON.stringify(this.request.body);
  }
  yield next;
});

app.use(kc.router());

app.listen(3000);
console.log('server start listen at 3000');
