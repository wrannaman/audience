import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import UsersAPI from '../util/UsersAPI';

import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER,
  USER_CHANGE,
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
  RESET_PASSWORD_EMAIL_SUCCESS,
  RESET_PASSWORD_EMAIL_ERROR,
  RESET_PASSWORD_CHANGE,
  RESET_PASSWORD_CHANGE_SUCCESS,
  RESET_PASSWORD_CHANGE_ERROR,
  TRIGGER_LOGIN_ALERT,
} from '../constants/AppConstants';

/* THE USER OBJECT WILL CONTAIN .error PROPERTY IF ANY ERRORS */
let user = {};
var localStorageUser = localStorage.getItem('wifi-user');
if (localStorageUser)
{

  user = JSON.parse(localStorageUser);
  //console.log('localStorageUser', user);
  if (user.hasOwnProperty('user'))
  {
    user.user = user.user;
  }
  if (typeof(user.token) != 'undefined')
  {
    user.token = user.token;
  }
}
// user.login_alert = false;
//
// console.log('test',( (typeof(user.token) != 'undefined' || typeof(token) != 'undefined')
//  && typeof(user.user) != 'undefined'
//  && typeof(user.user.id) != 'undefined'));
//
//
// if ( (typeof(user.token) != 'undefined' || typeof(token) != 'undefined')
//  && typeof(user.user) != 'undefined'
//  && typeof(user.user.id) != 'undefined')
//  {
//    user.login_alert = true;
//  }

console.warn("USER STORE TRUTH", user);

class UsersStore extends BaseStore {
  emitChange() {
    //console.log("USERSSTORE: emitting change");
    this.emit(USER_CHANGE);
  }
  addChangeListener(callback) {
    this.on(USER_CHANGE, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(USER_CHANGE, callback);
  }

  registerUser(user) {
    //console.warn('USERSSTORE: registerUser ', user);
    return UsersAPI.registerUser(user.user);
  }
  registerError() {
    //console.log('USERSSTORE: registerError');
  }

  clearUpdateErrors() {
    var that = this;
    setTimeout(function() {
      user.error = '';
      //console.log('clearning update errors', user);
      that.emitChange();
    }, 5000);


  }

  updateError( obj ) {

    var errmsg = obj.error.response.body.raw.message;
    var errUsername = errmsg.search("username");
    //console.warn('update ERROR', errUsername);
    if (errUsername > 0){
      user.error = "Username taken, please choose a different username.";
    }
    else
    {
      user.error = "Something didn't save correctly, please try again.";
    }
    //console.warn('ERROR MESSAGE', user.error);
    this.emitChange();
  }

  updateSuccess( obj ){
    //console.warn('update Success', obj);
    //console.warn('current user', user);
    user.user.user = obj.user;
    user.actionType = obj.actionType;
    localStorage.setItem('wifi-user', JSON.stringify(user));
    this.emitChange();
  }

  success( newUser ){
    //console.log('USERSSTORE: registerSuccess', newUser);
    if (newUser.actionType != UPDATE_USER_SUCCESS)
    {
      user = newUser;
      this.trigger_login_alert();
    }
    else
    {
      //console.log('hitting else')
      user.token = newUser.user.token;
      user.user = newUser.user.user;
    }


    localStorage.setItem('wifi-user', JSON.stringify(user));
    //console.log('final user', user);
    this.emitChange();
  }

  trigger_reset_password_email( action ) {
    //console.log('USERSSTORE: trigger_reset_password_email', action);
    return UsersAPI.trigger_reset_password_email(action.user.email);
  }

  reset_password_save_password( action ) {
    //console.log('USERSSTORE: reset_password_save_password', action);
    return UsersAPI.reset_password_save_password( action.user );
  }

  loginUser(user) {
    //console.log('USERSSTORE: loginUser ', user);
    return UsersAPI.loginUser(user.user);
  }
  loginError() {
    //console.log('USERSSTORE: loginError');
  }
  trigger_user_update_alert(){
    //console.log('store.trigger_login_alert()')
    user.update_alert = true;
  }
  trigger_login_alert(){
    //console.log('store.trigger_login_alert()')
    user.login_alert = true;

  }
  set_login_alert(val) {
    user.login_alert = val;
    localStorage.setItem('wifi-user', JSON.stringify(user));
    this.emitChange();
  }
  log_out() {
    //console.log('logged out');
    user = {};
    user.logged_out = true;
    localStorage.setItem('wifi-user', "");
    this.emitChange();
  }
  getUser() {
    return user;
  }
  getUserState() {
    //console.log('checking user!', user);
    if ( typeof(user) != 'undefined'
    && typeof(user.user) != 'undefined'
    && typeof(user.user.token) != 'undefined'
    && typeof(user.user.user.id) != 'undefined')
    {
      return true;
    }
    return false;
  }
  updateUser(user) {
     UsersAPI.updateUser(user.user);
  }
}

let store = new UsersStore();

AppDispatcher.register((action) => {
  //console.log('USERSSTORE: ', action);
  switch(action.actionType) {

    /* REGISTER */
    case REGISTER_USER:
      store.registerUser( action );
      break;
    case REGISTER_USER_SUCCESS:
      //console.log('REGISTER_USER_SUCCESS', action)
      store.success( action );
      break;
    case REGISTER_USER_ERROR:
      store.registerError( action );

    /* Login */
    case LOGIN_USER:
      store.loginUser( action );
      break;
    case LOGIN_USER_SUCCESS:
      store.success( action );
      break;
    case LOGIN_USER_ERROR:
      store.loginError( action );
      break;

    /* Reset Password */
    case TRIGGER_RESET_PASSWORD_EMAIL:
      store.trigger_reset_password_email( action );
      break;
    case RESET_PASSWORD_EMAIL_SUCCESS:
      store.success( action );
      break;
    case RESET_PASSWORD_CHANGE:
      store.reset_password_save_password( action )
      break;
    case RESET_PASSWORD_CHANGE_SUCCESS:
      //console.log('USER STORE: RESET_PASSWORD_CHANGE_SUCCESS')
      store.success( action );
      break;
    case RESET_PASSWORD_CHANGE_ERROR:
      //console.log('USER STORE: RESET_PASSWORD_CHANGE_ERROR')
      store.success( action );
      break;

    /* Logout */
    case LOGOUT_USER:
      break;
    case LOGOUT_USER_SUCCESS:
      break;
    case LOGOUT_USER_ERROR:
      break;
    case GET_CURRENT_USER:
      store.getUser();
      break;
    case UPDATE_USER:
      store.updateUser( action );
      break;
    case UPDATE_USER_SUCCESS:
      store.updateSuccess( action );
      break;
    case UPDATE_USER_ERROR:
      store.updateError( action );
      break;
    case TRIGGER_LOGIN_ALERT:
      // wait for route change
      setTimeout(function() {
        store.trigger_login_alert();
      }, 1000);

      break;
    default:
      //console.log('USERSSTORE: users default fallthrough');
  }
});

export default store;
