module.exports = {
  // controller#action
  'get /':                        { to: 'views#index'},
  'get /home':                    { to: 'views#home'},
  'get /users/:id':               { to: 'users#find'   },
  'post /users/create':           { to: 'users#create' },
  'get /users':                   { to: 'users#all'   },
  'post /auth/login':             { to: 'auth#login'   },
  'post /auth/logout':            { to: 'auth#logout'  },
  'get /auth/facebook':           { to: 'auth#facebook'  },
};
