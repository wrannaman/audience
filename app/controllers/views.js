var path         = require("path");
var fs           = require("fs");
var thinky       = require( path.join(__dirname, '../..', 'config/thinky.js') );
var type         = thinky.type;
var User         = require( path.join(__dirname, '../..', 'app/models/user.js') );
var react        = require('koa-react-view');
var viewpath     = path.join( path.join(__dirname, '../..', 'views') );
var assetspath   = path.join( path.join(__dirname, '../..', 'public') );
module.exports = {

  index: function*() {
    react(this.app, {
      views: viewpath,
      babel: {
        only: [
          viewpath,
          assetspath
        ]
      }
    });
    this.render('index', {
      title: 'List',
      list: [
        'hello koa',
        'hello react'
      ]
    });
  },
  home: function *() {
    this.body = {success: true}
  },
};
