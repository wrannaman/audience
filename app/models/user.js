// file: models/user.js
var path        = require("path");
var fs          = require("fs");
var thinky      = require( path.join(__dirname, '../..', 'config/thinky.js') );
var type        = thinky.type;
var validator   = require('validator');
var r           = thinky.r;

var types = {
  user:  1,
  conductor: 2,
  admin: 3,
}

var User = thinky.createModel("User", {
    id          : type.string(),
    email       : type.string().email().required(),
    first_name  : type.string().required(),
    last_name   : type.string().required(),
    age         : type.number().min(5).max(100),
    country     : type.string(),
    city        : type.string(),
    role        : type.number().default(types.user),
    createdAt   : type.date().default(r.now()),
});

module.exports = User;
