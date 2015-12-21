import Request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  GET_CURRENT_USER,
  TRIGGER_RESET_PASSWORD_EMAIL,
  RESET_PASSWORD_EMAIL_ERROR,
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_CHANGE,
  RESET_PASSWORD_CHANGE_SUCCESS,
  RESET_PASSWORD_CHANGE_ERROR,
  TRIGGER_LOGIN_ALERT,
  BASE_URL
} from '../constants/AppConstants';

/* HEADERS */
// authorization: Bearer we9Jk7lJaZYK0y21JUMYQxYJiBALifnH0B+QgLAGGUlkmwML0xNpc6YfNvlgUnHN


export default {
  registerUser( user ) {
    //console.log('API sending this user', user)
    var url = BASE_URL + 'auth/local/register';
    Request.post(url)
      .send({ user: user })
      .end( function(err, res){
        if (err){
          return AppDispatcher.dispatch({
            actionType: REGISTER_USER_ERROR
          });
        }
        //console.log('USERS API: registerUser ');

        AppDispatcher.dispatch({
          actionType: REGISTER_USER_SUCCESS,
          user: res.body
        });
        AppDispatcher.dispatch({
          actionType: TRIGGER_LOGIN_ALERT,
        });
      });
  },
  loginUser( user ) {
    var url = BASE_URL + 'auth/local';

    Request.post(url)
      .send({ identifier: user.email, password: user.password })
      .end( function(err, res){
        if (err){
          return AppDispatcher.dispatch({
            actionType: LOGIN_USER_ERROR
          });
        }
        //console.log('USERS API: loginUser ');

        AppDispatcher.dispatch({
          actionType: LOGIN_USER_SUCCESS,
          user: res.body
        });
        AppDispatcher.dispatch({
          actionType: TRIGGER_LOGIN_ALERT,
        });
      });
  },
  trigger_reset_password_email( email ) {
    //console.log('USERS API: trigger_reset_password_email ', email );
    var url = BASE_URL + 'trigger_reset_password';

    Request.post(url)
      .send({ email: email })
      .end( function(err, res){
        if (err){
          return AppDispatcher.dispatch({
            actionType: RESET_PASSWORD_EMAIL_ERROR
          });
        }
        //console.log('USERS API: loginUser ');

        AppDispatcher.dispatch({
          actionType: RESET_PASSWORD_EMAIL_SUCCESS,
          user: res.body
        });
      });
  },
  reset_password_save_password( user ) {
    //console.log('USERS API: reset_password_save_password ', user );
    var url = BASE_URL + 'reset_password_save_password';

    Request.post(url)
      .send({ user: user })
      .end( function(err, res){
        if (err){
          return AppDispatcher.dispatch({
            actionType: RESET_PASSWORD_CHANGE_ERROR
          });
        }
        //console.log('USERS API: reset_password_save_password SUCCESS ');

        AppDispatcher.dispatch({
          actionType: RESET_PASSWORD_CHANGE_SUCCESS,
          user: res.body
        });
        AppDispatcher.dispatch({
          actionType: TRIGGER_LOGIN_ALERT,
        });
      });
  },
  trigger_login_alert() {
    AppDispatcher.dispatch({
      actionType: TRIGGER_LOGIN_ALERT,
    });
  },
  updateUser( user ) {
    //console.warn('user api update user', user);
    var url = BASE_URL + 'user/update/' + user.id + '?';
    for (var key in user){
      if (user[key] != null && key != 'id'){
        //console.log('key', key, ' val ', user[key])
        url += key + '=' + user[key] + '&'
      }
    }
    //console.log('url', url);
    Request.get(url)
      .end(function(err, res) {
        //console.log('err', err);
        if (err != null) {
        return AppDispatcher.dispatch({
                actionType: UPDATE_USER_ERROR,
                error: err
              });
        }
        //console.log('res', res.body);
        if (typeof(res.body.passports) != 'undefined')
        {
          res.body.token = res.body.passports.token;
          res.body.passports = null;
        }
        return AppDispatcher.dispatch({
                actionType: UPDATE_USER_SUCCESS,
                user: res.body
              });
      })
  },
  getProfile: function( user ) {
    var url = BASE_URL + 'user?username=' + user;
    var profile = {};

     Request.get(url)
    .end(function(err, res) {
      if (err)
      {
        console.log('err', err);
        return;
      }
      console.log('user', res.body[0]);
      profile.user = res.body[0];

      url = BASE_URL + 'galleryImages?owner=' + profile.user.id
      Request.get(url)
      .end(function(err, res) {
        if (err)
        {
          console.log('err', err);
          return;
        }
          console.log('images', res.body[0]);
          profile.images = res.body[0];
          url = BASE_URL + 'videoGallery?owner=' + profile.user.id
          Request.get(url)
          .end(function(err, res) {
            if (err)
            {
              console.log('err', err);
              return;
            }
              console.log('videos', res.body[0]);
              profile.videos = res.body[0];
              return profile;
          });
      });
    });

  }
};
