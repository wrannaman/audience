var path   = require("path");
var fs     = require("fs");
var thinky = require( path.join(__dirname, '../..', 'config/thinky.js') );
var type   = thinky.type;
var User   = require( path.join(__dirname, '../..', 'app/models/user.js') );

module.exports = {

  find: function*(id) {
    console.log('this params', id);
    this.body = { id: id};
  },
  all: function *() {
    console.log('all');
    var all_users = yield User.run().then(function(users){
      console.log('users', users);
      return users;
    })
    this.body = { users: all_users }
  },

  create: function *() {
    var form = JSON.parse(this.body).fields;
    console.log('form', form);

    //console.log('first_name!', first_name);
    //console.log('last_name!', last_name);

    // email       : type.string().email().required(),
    // first_name  : type.string().required(),
    // last_name   : type.string().required(),
    // age         : type.number().min(5).max(100),
    // country     : type.string(),
    // city        : type.string(),
    // role        : type.number().default(types.user),

     //this.body = { success: 'ok'};
    var user = new User({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      age: form.age,
      country: form.country,
      city: form.city,
      role: form.role,
      password: form.password
    });
    var saved = yield user.save()
    .then(function( user ){
      return {success: true, user: user}
    })
    .error(function(e){
      return {error: e}
    })

    this.body = saved;
  },

  words: function*(id, slug) {
  },
};
