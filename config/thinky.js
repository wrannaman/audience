var config = require('./db.js');
var thinky = require('thinky')(config.rethinkdb);

module.exports = thinky;
